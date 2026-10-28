import { useCallback, useEffect, useRef, useState } from "react";
import { AudioLines, Mic, MicOff, Minimize2, Send, Sparkles, X, PhoneOff } from "lucide-react";
import { avatarUrl } from "@/lib/images";

type Status = "idle" | "connecting" | "listening" | "speaking" | "reconnecting" | "error";
type Line = { role: "you" | "kid"; text: string; id: number };
const MODEL = "gemini-3.8-live";
const SOCKET = "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContentConstrained";
function toBase64(bytes: Uint8Array) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}
function fromBase64(value: string) {
  const binary = atob(value), result = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) result[i] = binary.charCodeAt(i);
  return result;
}
function decodePcm(bytes: Uint8Array) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const samples = new Float32Array(Math.floor(bytes.byteLength / 2));
  for (let i = 0; i < samples.length; i++) samples[i] = view.getInt16(i * 2, true) / 32768;
  return samples;
}

export function KidAssistant() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [lines, setLines] = useState<Line[]>([]);
  const [draft, setDraft] = useState("");
  const [sendingText, setSendingText] = useState(false);
  const [error, setError] = useState("");
  const [networkNotice, setNetworkNotice] = useState<"low" | "checking" | "">("");
  const socketRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const inputCtxRef = useRef<AudioContext | null>(null);
  const outputCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nodesRef = useRef(new Set<AudioBufferSourceNode>());
  const nextTimeRef = useRef(0);
  const idRef = useRef(1);
  const statusRef = useRef(status);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  statusRef.current = status;

  const addLine = useCallback((role: Line["role"], text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setLines(old => [...old, { role, text: clean, id: idRef.current++ }].slice(-40));
  }, []);

  const stopPlayback = useCallback(() => {
    nodesRef.current.forEach(node => { try { node.stop(); } catch {} try { node.disconnect(); } catch {} });
    nodesRef.current.clear();
    if (outputCtxRef.current) nextTimeRef.current = outputCtxRef.current.currentTime;
  }, []);

  const cleanup = useCallback(() => {
    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    processorRef.current = null;
    sourceRef.current = null;
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
    inputCtxRef.current?.close().catch(() => undefined);
    outputCtxRef.current?.close().catch(() => undefined);
    inputCtxRef.current = null;
    outputCtxRef.current = null;
    stopPlayback();
    const socket = socketRef.current;
    socketRef.current = null;
    if (socket && socket.readyState < WebSocket.CLOSING) socket.close(1000, "Session ended");
    setStatus("idle");
    setNetworkNotice("");
  }, [stopPlayback]);

  useEffect(() => () => cleanup(), [cleanup]);
  useEffect(() => { const low = () => { if (socketRef.current && navigator.onLine === false && ["listening","speaking","connecting","reconnecting"].includes(statusRef.current)) { setNetworkNotice("low"); setStatus("reconnecting"); window.setTimeout(() => { if (!navigator.onLine) setNetworkNotice("checking"); }, 1800); } }; const online = () => { if (socketRef.current && networkNotice) { setNetworkNotice("checking"); window.setTimeout(() => { if (navigator.onLine && socketRef.current?.readyState === WebSocket.OPEN) { setNetworkNotice(""); setStatus("listening"); } }, 1200); } }; window.addEventListener("offline", low); window.addEventListener("online", online); return () => { window.removeEventListener("offline", low); window.removeEventListener("online", online); }; }, [networkNotice]);
  useEffect(() => { if (transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight; }, [lines]);
  // Warm the server and Gemini route in the background on first visit. No microphone is
  // requested and no conversation content is sent; the endpoint performs a tiny warm-up.
  useEffect(() => {
    let alreadyWarmed = false;
    try { alreadyWarmed = sessionStorage.getItem("kid-warmed-v1") === "1"; } catch {}
    const warm = () => {
      if (alreadyWarmed) return;
      try { sessionStorage.setItem("kid-warmed-v1", "1"); } catch {}
      void fetch("/api/kid/warmup", { method: "POST", headers: { "content-type": "application/json" }, body: "{}", keepalive: true }).catch(() => undefined);
    };
    const idleWindow = window as Window & { requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number };
    if (idleWindow.requestIdleCallback) idleWindow.requestIdleCallback(warm, { timeout: 1800 });
    else window.setTimeout(warm, 900);
    const links = ["https://generativelanguage.googleapis.com", "wss://generativelanguage.googleapis.com"];
    for (const href of links) {
      const link = document.createElement("link"); link.rel = "preconnect"; link.href = href; link.crossOrigin = "anonymous"; document.head.appendChild(link);
    }
  }, []);

  const start = useCallback(async () => {
    if (["connecting", "listening", "speaking"].includes(statusRef.current)) return;
    setError("");
    setStatus("connecting");
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("This browser does not support microphone access. Try the latest Chrome or Edge.");
      const response = await fetch("/api/kid/token", { method: "POST", headers: { "content-type": "application/json" } });
      const payload = await response.json().catch(() => ({})) as { token?: string; error?: string };
      if (!response.ok || !payload.token) throw new Error(payload.error || "Kid is not configured. Add GEMINI_API_KEY to Vercel's server environment.");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      streamRef.current = stream;
      const inputCtx = new AudioContext(), outputCtx = new AudioContext();
      inputCtxRef.current = inputCtx; outputCtxRef.current = outputCtx;
      await Promise.all([inputCtx.resume(), outputCtx.resume()]);
      const socket = new WebSocket(SOCKET + "?access_token=" + encodeURIComponent(payload.token));
      socketRef.current = socket;
      await new Promise<void>((resolve, reject) => {
        const timer = window.setTimeout(() => reject(new Error("Gemini connection timed out. Try again.")), 15000);
        socket.addEventListener("open", () => { window.clearTimeout(timer); resolve(); }, { once: true });
        socket.addEventListener("error", () => { window.clearTimeout(timer); reject(new Error("Could not connect to Gemini Live. Check API key access and network.")); }, { once: true });
      });
      // Register the setup listener BEFORE sending the first frame so a fast setupComplete
      // response cannot race past the listener. Gemini may also send a Blob in some browsers.
      await new Promise<void>((resolve, reject) => {
        let settled = false;
        const finish = (cause?: Error) => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timer);
          socket.removeEventListener("message", onSetup);
          socket.removeEventListener("close", onClose);
          socket.removeEventListener("error", onSocketError);
          if (cause) reject(cause); else resolve();
        };
        const timer = window.setTimeout(() => finish(new Error("Gemini did not finish setting up the session. Please try again; if it repeats, check the newest Vercel runtime log.")), 20000);
        const onClose = (event: CloseEvent) => finish(new Error("Gemini closed the connection before setup completed (code " + event.code + ")."));
        const onSocketError = () => finish(new Error("The connection to Gemini failed before setup completed. Check network and Gemini API access."));
        const onSetup = async (event: MessageEvent) => {
          try {
            const raw = typeof event.data === "string" ? event.data : event.data instanceof Blob ? await event.data.text() : "";
            if (!raw) return;
            const data = JSON.parse(raw) as { setupComplete?: unknown; error?: { message?: string; code?: number; status?: string } };
            if (data.setupComplete !== undefined) finish();
            else if (data.error) finish(new Error(data.error.message || data.error.status || "Gemini rejected the session setup."));
          } catch {
            // Ignore non-JSON frames; a later setupComplete or timeout will decide the outcome.
          }
        };
        socket.addEventListener("message", onSetup);
        socket.addEventListener("close", onClose, { once: true });
        socket.addEventListener("error", onSocketError, { once: true });
        try {
          socket.send(JSON.stringify({ setup: {
            model: "models/" + MODEL,
            generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } } } },
            inputAudioTranscription: {}, outputAudioTranscription: {},
            realtimeInputConfig: { automaticActivityDetection: { disabled: false, silenceDurationMs: 650, prefixPaddingMs: 250 } }
          }}));
        } catch (cause) {
          finish(cause instanceof Error ? cause : new Error("Could not send the Gemini session setup."));
        }
      });
      socket.addEventListener("message", async event => {
        try {
          const raw = typeof event.data === "string" ? event.data : event.data instanceof Blob ? await event.data.text() : "";
          if (!raw) return;
          const packet = JSON.parse(raw) as { error?: { message?: string; status?: string }; serverContent?: {
            modelTurn?: { parts?: Array<{ inlineData?: { data?: string; mimeType?: string } }> };
            inputTranscription?: { text?: string }; interimInputTranscription?: { text?: string };
            outputTranscription?: { text?: string }; interrupted?: boolean; turnComplete?: boolean;
          }};
          if (packet.error) { setError(packet.error.message || packet.error.status || "The voice session encountered an error."); setStatus("error"); return; }
          const data = packet.serverContent;
          if (!data) return;
          if (data.inputTranscription?.text) addLine("you", data.inputTranscription.text);
          if (data.outputTranscription?.text) addLine("kid", data.outputTranscription.text);
          if (data.interrupted) stopPlayback();
          for (const part of data.modelTurn?.parts || []) {
            if (!part.inlineData?.data) continue;
            const samples = decodePcm(fromBase64(part.inlineData.data)), ctx = outputCtxRef.current;
            if (!ctx || !samples.length) continue;
            const sampleRate = Number(part.inlineData.mimeType?.split("rate=")[1]) || 24000;
            const buffer = ctx.createBuffer(1, samples.length, sampleRate);
            buffer.copyToChannel(samples, 0);
            const source = ctx.createBufferSource(); source.buffer = buffer; source.connect(ctx.destination);
            const startAt = Math.max(ctx.currentTime + 0.025, nextTimeRef.current);
            source.start(startAt); nextTimeRef.current = startAt + buffer.duration; nodesRef.current.add(source);
            source.addEventListener("ended", () => { nodesRef.current.delete(source); if (statusRef.current !== "idle") setStatus("listening"); });
            setStatus("speaking");
          }
          if (data.turnComplete && statusRef.current !== "idle") setStatus("listening");
        } catch {}
      });
      socket.addEventListener("close", event => {
        if (socketRef.current === socket) {
          socketRef.current = null; setStatus("idle");
          if (event.code !== 1000) setError("The voice connection closed. Start a new session to continue.");
        }
      });
      const micSource = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      sourceRef.current = micSource; processorRef.current = processor;
      processor.onaudioprocess = event => {
        const active = socketRef.current;
        if (!active || active.readyState !== WebSocket.OPEN || statusRef.current === "idle") return;
        const input = event.inputBuffer.getChannelData(0), ratio = inputCtx.sampleRate / 16000;
        const length = Math.floor(input.length / ratio), pcm = new Uint8Array(length * 2), view = new DataView(pcm.buffer);
        for (let i = 0; i < length; i++) {
          const value = Math.max(-1, Math.min(1, input[Math.min(Math.floor(i * ratio), input.length - 1)]));
          view.setInt16(i * 2, value < 0 ? value * 32768 : value * 32767, true);
        }
        active.send(JSON.stringify({ realtimeInput: { audio: { data: toBase64(pcm), mimeType: "audio/pcm;rate=16000" } } }));
      };
      micSource.connect(processor); processor.connect(inputCtx.destination);
      setStatus("listening");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not start Kid.");
      cleanup(); setStatus("error");
    }
  }, [addLine, cleanup, stopPlayback]);

  const endSession = useCallback(() => { cleanup(); setError(""); }, [cleanup]);
  const sendText = useCallback(async () => {
    const text = draft.trim();
    if (!text || sendingText) return;
    setError("");
    setDraft("");
    addLine("you", text);
    const socket = socketRef.current;
    if (socket && socket.readyState === WebSocket.OPEN && ["listening", "speaking"].includes(statusRef.current)) {
      try {
        socket.send(JSON.stringify({ realtimeInput: { text } }));
      } catch {
        setError("Could not send that message into the live session. Please try again.");
      }
      return;
    }

    // Text chat works independently; visitors do not need to grant microphone access first.
    setSendingText(true);
    try {
      const history = lines.slice(-12).map(line => ({
        role: line.role === "you" ? "user" : "model",
        text: line.text
      }));
      const response = await fetch("/api/kid/message", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: text, history })
      });
      const payload = await response.json().catch(() => ({})) as { answer?: string; error?: string };
      if (!response.ok || !payload.answer) throw new Error(payload.error || "Kid could not answer. Please try again.");
      addLine("kid", payload.answer);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not send your message to Kid.");
    } finally {
      setSendingText(false);
    }
  }, [addLine, draft, lines, sendingText]);

  return <div className="kid-assistant-root">
    {open && <section className="kid-panel" aria-label="Talk to Kid assistant">
      {networkNotice && <div className={"kid-network-notice " + (networkNotice === "checking" ? "is-checking" : "")} role="status"><span className="kid-network-symbol">{networkNotice === "checking" ? "↻" : "!"}</span><span><strong>{networkNotice === "checking" ? "Checking network…" : "Low network connection"}</strong><small>{networkNotice === "checking" ? "Waiting for the voice connection to recover" : "Kid may take longer to respond"}</small></span></div>}
      <header className="kid-panel-head">
        <div className="kid-head-identity"><span className="kid-avatar-wrap"><img src={avatarUrl} alt="" /></span><div><strong>Kid</strong><span>{status === "speaking" ? "Speaking with you" : status === "listening" ? "Listening to you" : status === "connecting" ? "Connecting securely…" : "Your friendly portfolio guide"}</span></div></div>
        <div className="kid-head-actions">
          <button className="kid-icon-button" onClick={() => setOpen(false)} aria-label="Minimize Kid"><Minimize2 size={17}/></button>
          <button className="kid-icon-button" onClick={() => { endSession(); setOpen(false); }} aria-label="Close Kid and end call"><X size={18}/></button>
        </div>
      </header>
      <div className="kid-conversation" ref={transcriptRef} aria-live="polite">
        {lines.length === 0 ? <div className="kid-welcome-copy"><Sparkles size={16}/><p>Ask me about Amani, his projects, or what he is building next.</p><span>Try: “Tell me about Stoke Yange.”</span></div> : lines.map(line => <div className={"kid-message kid-message-" + line.role} key={line.id}><span>{line.role === "you" ? "You" : "Kid"}</span><p>{line.text}</p></div>)}
        {sendingText && <div className="kid-typing" aria-label="Kid is thinking"><i/><i/><i/></div>}
      </div>
      {error && <p className="kid-error" role="alert">{error}</p>}
      <form className="kid-text-form" onSubmit={event => { event.preventDefault(); sendText(); }}>
        <input value={draft} onChange={event => setDraft(event.target.value)} placeholder="Message Kid…" aria-label="Message Kid"/>
        {draft.trim() ? <button type="submit" aria-label="Send message" disabled={sendingText}><Send size={17}/></button> : <button type="button" className="kid-voice-composer" onClick={start} disabled={status === "connecting"} aria-label={status === "listening" || status === "speaking" ? "Voice mode active" : "Start voice mode"}><Mic size={17}/><span>{status === "connecting" ? "Connecting…" : status === "listening" || status === "speaking" ? "Voice on" : "Voice mode"}</span></button>}
      </form>
      <div className="kid-panel-footer">
        {status === "listening" || status === "speaking" ? <button className="kid-call-pill is-active" onClick={endSession} aria-label="End voice call"><span className="kid-call-avatar"><img src="/favicon.ico" alt=""/></span><span>{status === "speaking" ? "Kid is speaking" : "Listening"}</span><span className="kid-call-end"><PhoneOff size={15}/></span></button> : <button className="kid-call-pill" onClick={start} disabled={status === "connecting"}><span className="kid-call-avatar"><img src={avatarUrl} alt=""/></span><span>{status === "connecting" ? "Connecting to Kid…" : status === "error" ? "Try voice again" : "Start a voice call"}</span><Mic size={15}/></button>}
        <span className="kid-secure-note"><AudioLines size={12}/> Private voice session</span>
      </div>
    </section>}
    <button className={"kid-launcher " + (open ? "kid-launcher-open" : "") + (status === "listening" ? " is-listening" : status === "speaking" ? " is-speaking" : "")} onClick={() => setOpen(value => !value)} aria-expanded={open} aria-label={open ? "Minimize Kid assistant" : "Talk to Kid"}>
      <span className="kid-launcher-avatar"><img src={avatarUrl} alt=""/></span><span className="kid-launcher-label">{status === "listening" ? "Listening" : status === "speaking" ? "Kid is speaking" : open ? "Kid" : "Talk to Kid"}</span>
      {status === "listening" && <span className="kid-launcher-ring"/>}
    </button>
  </div>;
}
