import { useEffect, useRef, useState, Fragment } from "react";
import { profile, projects, skills, experience, hobbies } from "./data";

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const tickerItems = [
  "Python", "React", "Flutter", "PostgreSQL", "MLflow", "Pandas",
  "Firebase", "Git", "Power BI", "MySQL", "JavaScript", "Dart",
];

function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function SpotlightCard({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      className={`spotlight ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function CountUp({ target, suffix = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 900;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.round(progress * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <strong ref={ref}>
      {value}
      {suffix}
    </strong>
  );
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { progress, scrolled };
}

function App() {
  const { progress, scrolled } = useScrollProgress();
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const year = new Date().getFullYear();

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <a href="#top" className="logo">
          IW<span>.</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <a href={asset(profile.cv)} download className="btn primary nav-cta">
          Résumé
        </a>
      </nav>

      <main id="top">
        <section className="hero" id="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Software · Data Engineering</p>

              <h1>
                Hi, I'm <span className="gradient-text">{profile.name}</span>.
              </h1>

              <p className="hero-text">{profile.headline}</p>

              <div className="hero-actions">
                <a href="#projects" className="btn primary">
                  View Projects <span className="btn-arrow">→</span>
                </a>

                <a href={asset(profile.cv)} download className="btn secondary">
                  Download CV
                </a>

                <a href={profile.github} className="btn secondary" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-badge">
                <span className="pulse-dot" />
                Open to work
              </div>

              <div className="hero-photo">
                <img
                  src={asset("images/profile.jpeg")}
                  alt="Ian Wambaire"
                  className="profile-image"
                />
              </div>

              <dl className="hero-meta">
                <div>
                  <dt>Role</dt>
                  <dd>{profile.role}</dd>
                </div>
                <div>
                  <dt>Base</dt>
                  <dd>{profile.location}</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Software + Data</dd>
                </div>
                <div>
                  <dt>Reach</dt>
                  <dd>{profile.email}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <span className="stat-tag">Experience</span>
              <strong>ICEA LION</strong>
              <p>Data Analytics Internship</p>
            </div>

            <div className="stat">
              <span className="stat-tag">Stack</span>
              <strong>Python · Flutter</strong>
              <p>Software & Data Projects</p>
            </div>

            <div className="stat">
              <span className="stat-tag">Shipped</span>
              <CountUp target={6} suffix="+" />
              <p>Technical Projects</p>
            </div>
          </div>
        </section>

        <div className="ticker" role="presentation">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={`${item}-${i}`}>
                {item}
                <span className="ticker-dot">•</span>
              </span>
            ))}
          </div>
        </div>

        <Reveal as="section" className="section" id="about">
          <p className="section-label">About</p>

          <h2>
            Final-year Computer Science student building across software and data.
          </h2>

          <p>
            I'm a final-year Informatics and Computer Science student at
            Strathmore University with hands-on experience in data analysis,
            automation, and software development. My work combines Python, SQL,
            Flutter, Firebase, JavaScript, and data tools to build practical
            systems that solve real problems.
          </p>

          <p>
            I'm especially interested in software engineering and data engineering
            roles where I can build scalable products, automate workflows, and
            turn data into useful insights.
          </p>
        </Reveal>

        <Reveal as="section" className="section" id="projects">
          <p className="section-label">Selected Work</p>
          <h2>Projects built around real problems.</h2>

          {featured && (
            <div className="featured-project">
              <div className="featured-card">
                <div className="featured-meta">
                  <span className="featured-flag">Featured Build</span>
                  <h3>{featured.title}</h3>
                  <p className="featured-type">{featured.type}</p>

                  <div className="tags">
                    {featured.tech.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a href={featured.repo} target="_blank" rel="noreferrer" className="repo-link">
                      View Repository →
                    </a>
                  </div>
                </div>

                <div className="featured-body">
                  <p>{featured.description}</p>

                  <div className="impact">
                    <strong>Why it matters:</strong> {featured.impact}
                  </div>

                  {featured.architecture && (
                    <div className="arch">
                      {featured.architecture.map((step, i) => (
                        <Fragment key={step}>
                          <span className="arch-step">{step}</span>
                          {i < featured.architecture.length - 1 && (
                            <span className="arch-arrow">→</span>
                          )}
                        </Fragment>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="project-grid">
            {others.map((project) => (
              <SpotlightCard as="article" className="project-card" key={project.title}>
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
                  <a href={project.repo} target="_blank" rel="noreferrer" className="repo-link">
                    View Repository →
                  </a>

                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="repo-link">
                      Live Demo →
                    </a>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="section split" id="experience">
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
        </Reveal>

        <Reveal as="section" className="section" id="skills">
          <p className="section-label">Skills</p>
          <h2>Tools I use to build.</h2>

          <div className="skills-grid">
            {skills.map((group) => (
              <div className="skill-group" key={group.category}>
                <p className="skill-category">{group.category}</p>
                <div className="skills">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="section" id="hobbies">
          <p className="section-label">Beyond Code</p>
          <h2>The person behind the projects.</h2>

          <div className="hobbies-grid">
            {hobbies.map((hobby) => (
              <SpotlightCard as="article" className="hobby-card" key={hobby.title}>
                <h3>{hobby.title}</h3>
                <p>{hobby.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="section" id="gallery">
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
        </Reveal>

        <Reveal as="section" className="contact" id="contact">
          <p className="section-label">Let's Connect</p>

          <h2>
            Interested in software, data engineering, and impactful product teams.
          </h2>

          <p>
            I'm open to internships, graduate opportunities, collaborations, and
            technical projects.
          </p>

          <div className="hero-actions">
            <a href={asset(profile.cv)} download className="btn primary">
              Download CV
            </a>

            <a href={profile.linkedin} className="btn secondary" target="_blank" rel="noreferrer">
              LinkedIn
            </a>

            <a href={profile.github} className="btn secondary" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>

          <p className="email-note">Email: {profile.email}</p>
        </Reveal>
      </main>

      <footer className="footer">
        <p>© {year} {profile.name}. Built with React + Vite · Deployed on GitHub Pages.</p>
      </footer>
    </>
  );
}

export default App;