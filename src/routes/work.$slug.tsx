import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, Github, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProject, pageHead, github } from '@/lib/portfolio';
import { ProjectVisual } from '@/components/portfolio';

export const Route = createFileRoute('/work/$slug')({
  head: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) return pageHead('Project', 'Project details');
    return pageHead(project.name, project.description);
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug);
  if (!project) throw notFound();

  const repoUrl = project.repo
    ? project.repo.includes('/')
      ? `https://github.com/${project.repo}`
      : `${github}/${project.repo}`
    : null;

  return (
    <section className="project-detail page-width">
      <Link to="/work" className="back-link">
        <ArrowLeft size={15} /> Back to projects
      </Link>

      <div className="project-detail-visual">
        <ProjectVisual visual={project.visual} large />
      </div>

      <div className="project-detail-meta">
        <p className="eyebrow muted-eyebrow">PROJECT</p>
        <h1>
          {project.name}
          <span className="heading-dot">.</span>
        </h1>
        <p className="lead">{project.description}</p>
        <p className="detail-body">{project.detail}</p>

        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="hero-actions">
          {repoUrl && (
            <Button asChild className="primary-action">
              <a href={repoUrl} target="_blank" rel="noreferrer">
                <Github size={15} /> View repository
              </a>
            </Button>
          )}
          {project.live && (
            <Button asChild variant="outline" className="secondary-action">
              <a href={project.live} target="_blank" rel="noreferrer">
                Visit live <ArrowUpRight size={15} />
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
