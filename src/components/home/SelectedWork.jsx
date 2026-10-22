import CTA from "@/components/CTA";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function SelectedWork() {
  return (
    <section className="section bg-navy">
      <div className="shell">
        <SectionHeading
          tone="dark"
          eyebrow="Selected work"
          title="Selected concept work"
          description="Concept projects created to demonstrate our design and development approach."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.07} className="h-full">
              <ProjectCard project={project} tone="dark" />
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <CTA to="/work" variant="outlineDark">
            View all work
          </CTA>
        </div>
      </div>
    </section>
  );
}
