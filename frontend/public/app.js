const LOCAL_API_URL = "http://127.0.0.1:3001/api/site-data";
const STATIC_DATA_URL = "./site-data.json";

const refs = {
  brandName: document.querySelector("#brand-name"),
  heroStatus: document.querySelector("#hero-status"),
  heroTitle: document.querySelector("#hero-title"),
  heroDescription: document.querySelector("#hero-description"),
  heroMeta: document.querySelector("#hero-meta"),
  focusTitle: document.querySelector("#focus-title"),
  focusDescription: document.querySelector("#focus-description"),
  stageRibbonText: document.querySelector("#stage-ribbon-text"),
  introHeading: document.querySelector("#intro-heading"),
  aboutText: document.querySelector("#about-text"),
  signatureLine: document.querySelector("#signature-line"),
  metricGrid: document.querySelector("#metric-grid"),
  projectGrid: document.querySelector("#project-grid"),
  experienceGrid: document.querySelector("#experience-grid"),
  timeline: document.querySelector("#timeline"),
  contactHeading: document.querySelector("#contact-heading"),
  contactActions: document.querySelector("#contact-actions"),
  primaryAction: document.querySelector("#primary-action"),
  secondaryAction: document.querySelector("#secondary-action"),
  scrollProgressBar: document.querySelector("#scroll-progress-bar"),
  topbar: document.querySelector(".topbar"),
};

function cloneTemplate(id) {
  const template = document.querySelector(id);
  return template.content.firstElementChild.cloneNode(true);
}

function renderMetrics(metrics) {
  refs.metricGrid.innerHTML = "";
  metrics.forEach((metric) => {
    const card = cloneTemplate("#metric-template");
    card.querySelector(".metric-value").textContent = metric.value;
    card.querySelector(".metric-label").textContent = metric.label;
    refs.metricGrid.appendChild(card);
  });
}

function renderHeroMeta(metrics) {
  refs.heroMeta.innerHTML = "";
  metrics.slice(0, 3).forEach((metric) => {
    const card = cloneTemplate("#hero-meta-template");
    card.querySelector(".meta-chip-label").textContent = metric.label;
    card.querySelector(".meta-chip-value").textContent = metric.value;
    refs.heroMeta.appendChild(card);
  });
}

function renderProjects(projects) {
  refs.projectGrid.innerHTML = "";
  projects.forEach((project) => {
    const card = cloneTemplate("#project-template");
    card.querySelector(".project-tag").textContent = project.category;
    card.querySelector(".project-year").textContent = project.year;
    card.querySelector(".project-title").textContent = project.title;
    card.querySelector(".project-summary").textContent = project.summary;
    card.querySelector(".project-impact").textContent = project.impact;

    const link = card.querySelector(".project-link");
    link.href = project.link;
    link.textContent = project.linkLabel;
    if (project.link.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noreferrer";
    } else {
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }

    refs.projectGrid.appendChild(card);
  });
}

function renderExperience(items) {
  refs.experienceGrid.innerHTML = "";
  items.forEach((item) => {
    const card = cloneTemplate("#experience-template");
    card.querySelector(".experience-title").textContent = item.role;
    card.querySelector(".experience-period").textContent = item.period;
    card.querySelector(".experience-company").textContent = item.company;
    card.querySelector(".experience-summary").textContent = item.summary;
    refs.experienceGrid.appendChild(card);
  });
}

function renderTimeline(items) {
  refs.timeline.innerHTML = "";
  items.forEach((item) => {
    const entry = cloneTemplate("#timeline-template");
    entry.querySelector(".timeline-date").textContent = item.date;
    entry.querySelector(".timeline-title").textContent = item.title;
    entry.querySelector(".timeline-summary").textContent = item.summary;
    refs.timeline.appendChild(entry);
  });
}

function renderContacts(contacts) {
  refs.contactActions.innerHTML = "";
  contacts.forEach((contact) => {
    const link = cloneTemplate("#contact-template");
    link.href = contact.url;
    link.textContent = contact.label;
    if (contact.url.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noreferrer";
    } else {
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }
    refs.contactActions.appendChild(link);
  });
}

function applyData(data) {
  document.title = `${data.profile.name} | 个人网站`;
  refs.brandName.textContent = data.profile.name;
  refs.heroStatus.textContent = data.profile.availability;
  refs.heroTitle.textContent = data.profile.heroTitle;
  refs.heroDescription.textContent = data.profile.heroDescription;
  refs.focusTitle.textContent = data.profile.focusTitle;
  refs.focusDescription.textContent = data.profile.focusDescription;
  refs.stageRibbonText.textContent = data.profile.focusDescription;
  refs.introHeading.textContent = data.profile.introHeading;
  refs.aboutText.textContent = data.profile.about;
  refs.signatureLine.textContent = data.profile.signature;
  refs.contactHeading.textContent = data.profile.contactHeading;
  refs.primaryAction.href = data.profile.primaryAction.href;
  refs.primaryAction.textContent = data.profile.primaryAction.label;
  refs.secondaryAction.href = data.profile.secondaryAction.href;
  refs.secondaryAction.textContent = data.profile.secondaryAction.label;

  renderHeroMeta(data.metrics);
  renderMetrics(data.metrics);
  renderProjects(data.projects);
  renderExperience(data.experience);
  renderTimeline(data.timeline);
  renderContacts(data.contacts);
}

function setupReveal() {
  document.querySelectorAll(".reveal").forEach((node, index) => {
    node.style.setProperty("--delay", `${index * 80}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
}

function addStageMotion() {
  const stage = document.querySelector(".glass-stage");
  const device = document.querySelector(".device-frame");
  let frame = null;
  let pointerX = 0;
  let pointerY = 0;

  function commitMotion() {
    const x = (pointerX / window.innerWidth - 0.5) * 12;
    const y = (pointerY / window.innerHeight - 0.5) * 12;
    stage.style.transform = `perspective(1400px) rotateX(${-y * 0.28}deg) rotateY(${x * 0.32}deg) translateY(-4px)`;
    device.style.transform = `translate3d(${x * 0.45}px, ${y * 0.35}px, 0)`;
    frame = null;
  }

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!frame) {
      frame = window.requestAnimationFrame(commitMotion);
    }
  });

  window.addEventListener("pointerleave", () => {
    stage.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0)";
    device.style.transform = "translate3d(0, 0, 0)";
  });
}

function setupScrollEffects() {
  function updateScrollState() {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
    refs.scrollProgressBar.style.transform = `scaleX(${progress})`;
    refs.topbar.classList.toggle("compact", scrollTop > 24);
  }

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });
}

function setupInteractiveCards() {
  const cards = document.querySelectorAll(".metric-card, .project-card, .experience-card, .panel, .contact-banner");
  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
    });
  });
}

async function loadSiteData() {
  try {
    const candidateUrls = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
      ? [STATIC_DATA_URL, LOCAL_API_URL]
      : [STATIC_DATA_URL];

    let lastError = null;

    for (const url of candidateUrls) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        applyData(data);
        return;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("No data source available");
  } catch (error) {
    refs.heroDescription.textContent =
      "内容服务暂时不可用。启动后端服务后，这里会自动加载个人信息、项目与经历。";
    refs.aboutText.textContent =
      "前端界面已经准备好；等后端启动后，项目卡片、时间线和联系信息会在这里完整显示。";
    console.error(error);
  }
}

setupReveal();
addStageMotion();
setupScrollEffects();
setupInteractiveCards();
loadSiteData();
