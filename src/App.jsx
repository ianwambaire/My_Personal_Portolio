import { profile, projects, skills, experience, hobbies } from "./data";

function App() {
  return (
    <main>
      <nav className="nav">
        <a href="#" className="logo">IW</a>
        <div>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#hobbies">Beyond Code</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <p className="eyebrow">Portfolio / Software / Data Engineering</p>
        <h1>
          Hi, I’m <span>{profile.name}</span>. I build useful digital products
          with clean code and practical problem-solving.
        </h1>
        <p className="hero-text">{profile.headline}</p>

        <div className="hero-actions">
          <a href="#projects" className="btn primary">
            View Projects
          </a>
          <a href={profile.cv} download className="btn secondary">
            Download CV
          </a>
          <a href={profile.github} className="btn secondary" target="_blank">
            GitHub Profile
          </a>
        </div>

        <div className="stats">
          <div>
            <strong>6+</strong>
            <p>Projects</p>
          </div>
          <div>
            <strong>Mobile</strong>
            <p>Flutter, Swift, iOS</p>
          </div>
          <div>
            <strong>Data</strong>
            <p>Python, ML, Analytics</p>
          </div>
        </div>
      </section>

      <section className="section about">
        <p className="section-label">About</p>
        <h2>Developer with a product mindset.</h2>
        <p>
          I’m a Computer Science student focused on building software that is
          useful, understandable, and scalable. My work combines mobile
          development, full-stack systems, data analysis, automation, and
          machine learning fundamentals.
        </p>
      </section>

      <section className="section" id="projects">
        <p className="section-label">Selected Work</p>
        <h2>Projects built around real problems.</h2>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-top">
                <p>{project.type}</p>
                <span>{project.demo ? "Live + GitHub" : "GitHub"}</span>
              </div>

              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="impact">
                <strong>Why it matters:</strong> {project.impact}
              </div>

              <div className="tags">
                {project.tech.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="project-links">
                <a href={project.repo} target="_blank" className="repo-link">
                  View Repository →
                </a>

                {project.demo && (
                  <a href={project.demo} target="_blank" className="repo-link">
                    Live Demo →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="experience">
        <div>
          <p className="section-label">Experience</p>
          <h2>Practical exposure to data, automation, and reporting.</h2>
        </div>

        <div className="timeline">
          {experience.map((item) => (
            <div className="timeline-card" key={item.company}>
              <p className="period">{item.period}</p>
              <h3>{item.role}</h3>
              <h4>{item.company}</h4>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-label">Skills</p>
        <h2>Tools I use to build.</h2>

        <div className="skills">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="section" id="hobbies">
        <p className="section-label">Beyond Code</p>
        <h2>The person behind the projects.</h2>

        <div className="hobbies-grid">
          {hobbies.map((hobby) => (
            <article className="hobby-card" key={hobby.title}>
              <h3>{hobby.title}</h3>
              <p>{hobby.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="section-label">Contact</p>
        <h2>
          Interested in software, data engineering, and impactful product teams.
        </h2>
        <p>
          I’m open to internships, graduate opportunities, collaborations, and
          technical projects.
        </p>

        <div className="hero-actions">
          <a href={`mailto:${profile.email}`} className="btn primary">
            Email Me
          </a>
          <a href={profile.cv} download className="btn secondary">
            Download CV
          </a>
          <a href={profile.linkedin} className="btn secondary" target="_blank">
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}

export default App;