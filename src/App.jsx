import { profile, projects, skills, experience, hobbies } from "./data";
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

function App() {
  return (
    <main>
      <nav className="nav">
        <a href="#" className="logo">IW</a>

        <div>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero">
          <div className="hero-content">
            <div className="hero-left">
              <p className="eyebrow">Portfolio / Software / Data Engineering</p>

              <h1>
                Hi, I'm <span>{profile.name}</span>.
              </h1>

              <p className="hero-text">
                Final-year Computer Science student focused on building scalable
                software, automated data systems, and impactful digital products.
              </p>

              <div className="hero-actions">
                <a href="#projects" className="btn primary">
                  View Projects
                </a>

                <a href={profile.cv} download className="btn secondary">
                  Download CV
                </a>

                <a href={profile.github} className="btn secondary" target="_blank">
                  GitHub
                </a>
              </div>
            </div>

            <div className="hero-right">
              <img
                src={`${import.meta.env.BASE_URL}images/profile.jpeg`}
                alt="Ian Wambaire"
                className="profile-image"
              />
            </div>
          </div>

          <div className="stats">
            <div>
              <strong>ICEA LION</strong>
              <p>Data Analytics Internship</p>
            </div>

            <div>
              <strong>Python • Flutter</strong>
              <p>Software & Data Projects</p>
            </div>

            <div>
              <strong>6+</strong>
              <p>Technical Projects</p>
            </div>
          </div>
        </section>

      <section className="section about" id="about">
        <p className="section-label">About</p>

        <h2>
          Final-year Computer Science student building across software and data.
        </h2>

        <p>
          I’m a final-year Informatics and Computer Science student at
          Strathmore University with hands-on experience in data analysis,
          automation, and software development. My work combines Python, SQL,
          Flutter, Firebase, JavaScript, and data tools to build practical
          systems that solve real problems.
        </p>

        <p>
          I’m especially interested in software engineering and data engineering
          roles where I can build scalable products, automate workflows, and
          turn data into useful insights.
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

      <section className="section" id="skills">
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

      <section className="section" id="gallery">
        <p className="section-label">Beyond Engineering</p>

        <h2>
          Moments, experiences, and memories that shape who I am outside of
          tech.
        </h2>

            <div className="masonry-gallery">
              <img src={asset("images/gallery/gallery1.jpeg")} alt="" />
              <img src={asset("images/gallery/gallery2.jpeg")} alt="" />
              <img src={asset("images/gallery/gallery3.jpeg")} alt="" />
              <img src={asset("images/gallery/gallery4.jpeg")} alt="" />
              <img src={asset("images/gallery/gallery5.jpeg")} alt="" />
              <img src={asset("images/gallery/gallery6.jpeg")} alt="" />
              <img src={asset("images/gallery/gallery7.jpeg")} alt="" />
              <img src={asset("images/gallery/gallery8.jpeg")} alt="" />
              <img src={asset("images/gallery/gallery9.jpeg")} alt="" />
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
          <a href={asset("Ian-Wambaire-CV.pdf")} download className="btn primary">
            Download CV
          </a>

          <a href={profile.linkedin} className="btn secondary" target="_blank">
            LinkedIn
          </a>

          <a href={profile.github} className="btn secondary" target="_blank">
            GitHub
          </a>
        </div>

        <p className="email-note">Email: {profile.email}</p>
      </section>
    </main>
  );
}

export default App;