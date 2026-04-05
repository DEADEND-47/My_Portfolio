(() => {
  "use strict";

  const EMAILJS_PUBLIC_KEY = "YbKiepWLziWL_f8Oa";
  const EMAILJS_SERVICE_ID = "service_m0ho61r";
  const EMAILJS_TEMPLATE_ID = "template_xfldtnq";

  const typingRoles = [
    "B.Tech CSE (AI) Student",
    "C++ and Python Developer",
    "DSA Problem Solver",
    "Aspiring Software Engineer",
    "AI and ML Enthusiast"
  ];

  const chatFallbacks = [
    {
      test: /(skill|tech|stack|language)/i,
      reply:
        "Kunal works with C++, Python, HTML, CSS, JavaScript, DSA, SQL, and ML fundamentals."
    },
    {
      test: /(project|portfolio|build)/i,
      reply:
        "Key projects include an AI Recommendation System, a Student Management System, and this portfolio website."
    },
    {
      test: /(contact|email|reach|linkedin|github)/i,
      reply:
        "You can connect at kunallamba47@gmail.com, GitHub (kunal4116452224), and LinkedIn (kunal-lamba-635216388)."
    },
    {
      test: /(education|college|degree|university)/i,
      reply:
        "Kunal is a second-year B.Tech CSE (AI) student at USICT, GGSIPU (2024-2028)."
    },
    {
      test: /(intern|hire|job|opportunity)/i,
      reply:
        "Kunal is actively seeking software engineering internships and project opportunities."
    },
    {
      test: /(resume|cv)/i,
      reply:
        "You can view or download the resume directly from the hero section buttons."
    }
  ];

  const state = {
    cleanupFns: [],
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
  };

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const registerCleanup = (fn) => {
    if (typeof fn === "function") {
      state.cleanupFns.push(fn);
    }
  };

  const runCleanup = () => {
    while (state.cleanupFns.length) {
      const fn = state.cleanupFns.pop();
      try {
        fn();
      } catch (error) {
        console.error("Cleanup error:", error);
      }
    }
  };

  const rafThrottle = (callback) => {
    let rafId = null;
    return (...args) => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        callback(...args);
      });
    };
  };

  const safeInit = (name, initializer) => {
    try {
      initializer();
    } catch (error) {
      console.error(`${name} failed to initialize:`, error);
    }
  };

  function initLoader() {
    const loader = qs("#loader");
    if (!loader) {
      return;
    }

    let hidden = false;
    let fallbackTimer = null;

    const hideLoader = () => {
      if (hidden) {
        return;
      }
      hidden = true;
      loader.classList.add("hidden");
      loader.setAttribute("aria-hidden", "true");
    };

    const onLoad = () => {
      window.setTimeout(hideLoader, 280);
    };

    window.addEventListener("load", onLoad, { once: true });

    if (document.readyState === "complete") {
      onLoad();
    } else {
      fallbackTimer = window.setTimeout(hideLoader, 2400);
    }

    registerCleanup(() => {
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
      window.removeEventListener("load", onLoad);
    });
  }

  function initThemeToggle() {
    const toggleBtn = qs("#theme-toggle");
    const icon = qs("#theme-icon");
    if (!toggleBtn) {
      return;
    }

    const setTheme = (theme) => {
      const isLight = theme === "light";
      document.body.classList.toggle("light", isLight);
      toggleBtn.setAttribute("aria-pressed", String(isLight));
      if (icon) {
        icon.textContent = isLight ? "Sun" : "Moon";
      }
      document.dispatchEvent(new CustomEvent("theme-changed"));
    };

    const storedTheme = window.localStorage.getItem("theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(storedTheme || (prefersLight ? "light" : "dark"));

    const onToggle = () => {
      const nextTheme = document.body.classList.contains("light") ? "dark" : "light";
      window.localStorage.setItem("theme", nextTheme);
      setTheme(nextTheme);
    };

    toggleBtn.addEventListener("click", onToggle);
    registerCleanup(() => toggleBtn.removeEventListener("click", onToggle));
  }

  function initMobileMenu() {
    const menuBtn = qs("#mobile-menu-btn");
    const nav = qs("#navbar");
    const overlay = qs("#nav-overlay");
    if (!menuBtn || !nav) {
      return;
    }

    const navLinks = qsa(".nav-link", nav);

    const setOpen = (open) => {
      menuBtn.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);

      if (overlay) {
        overlay.classList.toggle("is-visible", open);
        overlay.setAttribute("aria-hidden", String(!open));
      }
    };

    const onToggle = () => setOpen(!nav.classList.contains("is-open"));
    const onOverlayClick = () => setOpen(false);
    const onEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    const onNavLinkClick = () => setOpen(false);

    menuBtn.addEventListener("click", onToggle);
    document.addEventListener("keydown", onEscape);

    if (overlay) {
      overlay.addEventListener("click", onOverlayClick);
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", onNavLinkClick);
    });

    registerCleanup(() => {
      menuBtn.removeEventListener("click", onToggle);
      document.removeEventListener("keydown", onEscape);
      if (overlay) {
        overlay.removeEventListener("click", onOverlayClick);
      }
      navLinks.forEach((link) => {
        link.removeEventListener("click", onNavLinkClick);
      });
    });
  }

  function initSmoothAnchorScroll() {
    const links = qsa('a[href^="#"]');
    if (!links.length) {
      return;
    }

    const clickHandlers = [];

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") {
        return;
      }
      const target = qs(href);
      if (!target) {
        return;
      }

      const handler = (event) => {
        event.preventDefault();
        const headerOffset = qs(".site-header")?.offsetHeight || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset + 1;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth"
        });
      };

      link.addEventListener("click", handler);
      clickHandlers.push(() => link.removeEventListener("click", handler));
    });

    registerCleanup(() => {
      clickHandlers.forEach((cleanup) => cleanup());
    });
  }

  function initSectionReveal() {
    const revealItems = qsa(".reveal");
    const staggerGroups = qsa(".stagger-children");

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((node) => node.classList.add("visible"));
      staggerGroups.forEach((node) => node.classList.add("visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
    staggerGroups.forEach((group) => revealObserver.observe(group));

    registerCleanup(() => revealObserver.disconnect());
  }

  function initTypingText() {
    const textEl = qs("#typing-text");
    if (!textEl) {
      return;
    }

    if (state.prefersReducedMotion) {
      textEl.textContent = typingRoles[0];
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timerId = null;

    const tick = () => {
      const currentRole = typingRoles[roleIndex];

      if (deleting) {
        charIndex -= 1;
      } else {
        charIndex += 1;
      }

      charIndex = clamp(charIndex, 0, currentRole.length);
      textEl.innerHTML = `${currentRole.slice(0, charIndex)}<span class="typing-cursor" aria-hidden="true"></span>`;

      if (!deleting && charIndex === currentRole.length) {
        deleting = true;
        timerId = window.setTimeout(tick, 1300);
        return;
      }

      if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % typingRoles.length;
      }

      timerId = window.setTimeout(tick, deleting ? 45 : 85);
    };

    tick();
    registerCleanup(() => {
      if (timerId) {
        window.clearTimeout(timerId);
      }
    });
  }

  function initSkillBars() {
    const bars = qsa(".bar-fill");
    if (!bars.length) {
      return;
    }

    bars.forEach((bar) => {
      bar.style.width = "0%";
    });

    if (!("IntersectionObserver" in window)) {
      bars.forEach((bar) => {
        const level = Number.parseInt(bar.dataset.level || "0", 10);
        bar.style.width = `${clamp(level, 0, 100)}%`;
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, io) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          const target = entry.target;
          const level = Number.parseInt(target.dataset.level || "0", 10);
          target.style.width = `${clamp(level, 0, 100)}%`;
          io.unobserve(target);
        });
      },
      { threshold: 0.45 }
    );

    bars.forEach((bar) => observer.observe(bar));
    registerCleanup(() => observer.disconnect());
  }

  function initResumeCounter() {
    const button = qs("#resumeBtn");
    const countEl = qs("#resumeCount");
    if (!button || !countEl) {
      return;
    }

    const key = "resume_download_count";
    let downloads = Number.parseInt(window.sessionStorage.getItem(key) || "0", 10);
    if (Number.isNaN(downloads)) {
      downloads = 0;
    }
    countEl.textContent = String(downloads);

    const onClick = () => {
      downloads += 1;
      window.sessionStorage.setItem(key, String(downloads));
      countEl.textContent = String(downloads);
    };

    button.addEventListener("click", onClick);
    registerCleanup(() => button.removeEventListener("click", onClick));
  }

  function initScrollUI() {
    const progressBar = qs("#progress-bar");
    const header = qs(".site-header");
    const sections = qsa("main section[id]");
    const navLinks = qsa(".nav-link");
    const scrollTopBtn = qs("#scrollTopBtn");
    const floatingContact = qs("#floating-contact");

    if (!sections.length) {
      return;
    }

    const update = () => {
      const scrollTop = window.scrollY;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const progressPercent = clamp((scrollTop / maxScroll) * 100, 0, 100);

      if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
      }

      if (header) {
        header.classList.toggle("scrolled", scrollTop > 8);
      }

      const headerHeight = header?.offsetHeight || 72;
      const activeCheckpoint = scrollTop + headerHeight + 28;

      let activeId = sections[0].id;
      sections.forEach((section) => {
        if (activeCheckpoint >= section.offsetTop) {
          activeId = section.id;
        }
      });

      navLinks.forEach((link) => {
        const hash = link.getAttribute("href") || "";
        const isActive = hash === `#${activeId}`;
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      const showFloating = scrollTop > 420;
      if (scrollTopBtn) {
        scrollTopBtn.classList.toggle("is-visible", showFloating);
      }
      if (floatingContact) {
        floatingContact.classList.toggle("is-visible", showFloating);
      }
    };

    const throttledUpdate = rafThrottle(update);
    const onTopClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", throttledUpdate, { passive: true });
    window.addEventListener("resize", throttledUpdate);
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener("click", onTopClick);
    }

    update();

    registerCleanup(() => {
      window.removeEventListener("scroll", throttledUpdate);
      window.removeEventListener("resize", throttledUpdate);
      if (scrollTopBtn) {
        scrollTopBtn.removeEventListener("click", onTopClick);
      }
    });
  }

  function initBackgroundDots() {
    const container = qs(".bg-floating-dots");
    if (!container || container.childElementCount > 0) {
      return;
    }

    const dotCount = state.prefersReducedMotion ? 0 : 12;
    for (let i = 0; i < dotCount; i += 1) {
      const dot = document.createElement("span");
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.animationDuration = `${4 + Math.random() * 5}s`;
      dot.style.animationDelay = `${Math.random() * 3}s`;
      dot.style.opacity = String(0.2 + Math.random() * 0.5);
      container.appendChild(dot);
    }
  }

  function initBackgroundCanvas() {
    const canvas = qs("#bg-canvas");
    if (!canvas || state.prefersReducedMotion || window.innerWidth < 640) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let rafId = null;
    let running = true;
    let lastFrame = 0;
    const pointer = { x: -9999, y: -9999 };

    const makeParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: 0.8 + Math.random() * 1.6
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const count = clamp(Math.floor(area / 26000), 24, 62);
      particles = Array.from({ length: count }, makeParticle);
    };

    const updateParticle = (particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;

      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance > 0 && distance < 120) {
        const push = (120 - distance) / 120;
        particle.x += (dx / distance) * push * 1.2;
        particle.y += (dy / distance) * push * 1.2;
      }
    };

    const drawConnections = () => {
      const maxDistance = 130;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance > maxDistance) {
            continue;
          }
          const alpha = (1 - distance / maxDistance) * 0.18;
          const isLightTheme = document.body.classList.contains("light");
          context.strokeStyle = isLightTheme
            ? `rgba(14, 165, 233, ${alpha})`
            : `rgba(34, 211, 238, ${alpha})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
    };

    const draw = (timestamp) => {
      if (!running) {
        return;
      }

      rafId = window.requestAnimationFrame(draw);
      if (timestamp - lastFrame < 1000 / 30) {
        return;
      }
      lastFrame = timestamp;

      context.clearRect(0, 0, width, height);

      const isLightTheme = document.body.classList.contains("light");
      context.fillStyle = isLightTheme ? "rgba(14, 165, 233, 0.45)" : "rgba(34, 211, 238, 0.5)";

      particles.forEach((particle) => {
        updateParticle(particle);
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      drawConnections();
    };

    const onPointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onVisibilityChange = () => {
      running = !document.hidden;
      if (running) {
        lastFrame = 0;
        rafId = window.requestAnimationFrame(draw);
      } else if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    resize();
    rafId = window.requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    registerCleanup(() => {
      running = false;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    });
  }

  function initSkillGalaxy() {
    const canvas = qs("#skill-galaxy-canvas");
    const container = qs(".feature-skill-galaxy");
    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const skillNodes = [
      { label: "C++", color: "#22d3ee" },
      { label: "Python", color: "#818cf8" },
      { label: "JavaScript", color: "#f59e0b" },
      { label: "HTML/CSS", color: "#fb7185" },
      { label: "DSA", color: "#34d399" },
      { label: "SQL", color: "#60a5fa" },
      { label: "Git", color: "#f97316" },
      { label: "AI/ML", color: "#f472b6" }
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let angle = 0;
    let rafId = null;
    let active = false;
    let pointer = { x: -9999, y: -9999, inside: false };

    const tooltip = document.createElement("div");
    tooltip.className = "skill-tooltip";
    tooltip.setAttribute("aria-hidden", "true");
    document.body.appendChild(tooltip);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const getNodes = () => {
      const centerX = width / 2;
      const centerY = height / 2;
      const orbit = Math.min(width, height) * 0.28;

      return skillNodes.map((skill, index) => {
        const offset = (index / skillNodes.length) * Math.PI * 2 + angle;
        const pulse = 1 + Math.sin(angle * 2 + index) * 0.05;
        const x = centerX + Math.cos(offset) * orbit * pulse;
        const y = centerY + Math.sin(offset) * orbit * pulse;
        return { ...skill, x, y };
      });
    };

    const drawFrame = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = document.body.classList.contains("light")
        ? "rgba(235, 245, 255, 0.9)"
        : "rgba(7, 13, 26, 0.45)";
      context.fillRect(0, 0, width, height);

      const nodes = getNodes();

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.hypot(dx, dy);
          if (distance > 190) continue;
          const alpha = (1 - distance / 190) * 0.22;
          context.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          context.beginPath();
          context.moveTo(nodes[i].x, nodes[i].y);
          context.lineTo(nodes[j].x, nodes[j].y);
          context.stroke();
        }
      }

      let hovered = null;
      if (pointer.inside) {
        hovered = nodes.find((node) => Math.hypot(pointer.x - node.x, pointer.y - node.y) <= 16) || null;
      }

      nodes.forEach((node) => {
        const isHovered = hovered && hovered.label === node.label;
        const radius = isHovered ? 13 : 10;

        if (isHovered) {
          const glow = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, 30);
          glow.addColorStop(0, `${node.color}66`);
          glow.addColorStop(1, `${node.color}00`);
          context.fillStyle = glow;
          context.beginPath();
          context.arc(node.x, node.y, 30, 0, Math.PI * 2);
          context.fill();
        }

        context.fillStyle = node.color;
        context.beginPath();
        context.arc(node.x, node.y, radius, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = "#f8fafc";
        context.font = `${isHovered ? "700" : "500"} 11px \"JetBrains Mono\"`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(node.label, node.x, node.y);
      });

      if (hovered) {
        tooltip.textContent = hovered.label;
        tooltip.style.left = `${pointer.x + canvas.getBoundingClientRect().left}px`;
        tooltip.style.top = `${pointer.y + canvas.getBoundingClientRect().top}px`;
        tooltip.classList.add("is-visible");
      } else {
        tooltip.classList.remove("is-visible");
      }
    };

    const animate = () => {
      if (!active) {
        return;
      }
      drawFrame();
      if (!state.prefersReducedMotion && window.innerWidth > 640) {
        angle += 0.004;
      }
      rafId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (active) {
        return;
      }
      active = true;
      rafId = window.requestAnimationFrame(animate);
    };

    const stop = () => {
      active = false;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      tooltip.classList.remove("is-visible");
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.inside = true;
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onLeave = () => {
      pointer.inside = false;
      pointer.x = -9999;
      pointer.y = -9999;
      tooltip.classList.remove("is-visible");
    };

    resize();
    drawFrame();

    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              start();
            } else {
              stop();
            }
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(container);
      registerCleanup(() => observer.disconnect());
    } else {
      start();
    }

    registerCleanup(() => {
      stop();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
      tooltip.remove();
    });
  }

  function initProjectCarousel() {
    const root = qs(".feature-carousel");
    if (!root) {
      return;
    }

    const track = qs(".feature-carousel__track", root);
    const slides = qsa(".feature-carousel__slide", root);
    const prevBtn = qs("[data-carousel-prev]", root);
    const nextBtn = qs("[data-carousel-next]", root);
    const indicators = qsa("[data-carousel-dot]", root);

    if (!track || slides.length <= 1) {
      return;
    }

    let currentIndex = 0;
    let autoplayId = null;

    const update = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      slides.forEach((slide, index) => {
        slide.setAttribute("aria-hidden", String(index !== currentIndex));
      });
      indicators.forEach((dot, index) => {
        const isActive = index === currentIndex;
        dot.classList.toggle("is-active", isActive);
        if (isActive) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    };

    const goTo = (index) => {
      const max = slides.length - 1;
      currentIndex = index < 0 ? max : index > max ? 0 : index;
      update();
    };

    const onPrev = () => goTo(currentIndex - 1);
    const onNext = () => goTo(currentIndex + 1);
    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }
    };

    const stopAutoplay = () => {
      if (autoplayId) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }
    };

    const startAutoplay = () => {
      if (state.prefersReducedMotion || autoplayId) {
        return;
      }
      autoplayId = window.setInterval(() => {
        if (!document.hidden) {
          onNext();
        }
      }, 6000);
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", onPrev);
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", onNext);
    }

    indicators.forEach((dot, index) => {
      const handler = () => goTo(index);
      dot.addEventListener("click", handler);
      registerCleanup(() => dot.removeEventListener("click", handler));
    });

    root.setAttribute("tabindex", "0");
    root.addEventListener("keydown", onKeyDown);
    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);
    root.addEventListener("focusin", stopAutoplay);
    root.addEventListener("focusout", startAutoplay);

    update();
    startAutoplay();

    registerCleanup(() => {
      stopAutoplay();
      if (prevBtn) {
        prevBtn.removeEventListener("click", onPrev);
      }
      if (nextBtn) {
        nextBtn.removeEventListener("click", onNext);
      }
      root.removeEventListener("keydown", onKeyDown);
      root.removeEventListener("mouseenter", stopAutoplay);
      root.removeEventListener("mouseleave", startAutoplay);
      root.removeEventListener("focusin", stopAutoplay);
      root.removeEventListener("focusout", startAutoplay);
    });
  }

  function initAchievementCounter() {
    const counters = qsa(".feature-stat-card__number");
    if (!counters.length) {
      return;
    }

    const animateCounter = (element, target, suffix) => {
      if (state.prefersReducedMotion) {
        element.textContent = `${target}${suffix}`;
        return;
      }

      const duration = 1400;
      const start = performance.now();

      const step = (timestamp) => {
        const progress = clamp((timestamp - start) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * eased);
        element.textContent = `${current}${suffix}`;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach((counter) => {
        const value = Number.parseInt(counter.dataset.value || "0", 10);
        const suffix = counter.dataset.suffix || "";
        animateCounter(counter, Math.max(0, value), suffix);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, io) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          const element = entry.target;
          const value = Number.parseInt(element.dataset.value || "0", 10);
          const suffix = element.dataset.suffix || "";
          animateCounter(element, Math.max(0, value), suffix);
          io.unobserve(element);
        });
      },
      { threshold: 0.45 }
    );

    counters.forEach((counter) => observer.observe(counter));
    registerCleanup(() => observer.disconnect());
  }

  function initGitHubImageFade() {
    const images = qsa("#github-stats img");
    if (!images.length) {
      return;
    }

    const handlers = [];

    images.forEach((image) => {
      const onLoad = () => image.classList.add("is-loaded");
      if (image.complete) {
        onLoad();
      } else {
        image.addEventListener("load", onLoad, { once: true });
        handlers.push(() => image.removeEventListener("load", onLoad));
      }
    });

    registerCleanup(() => handlers.forEach((cleanup) => cleanup()));
  }

  function initContactForm() {
    const form = qs("#contact-form");
    const feedback = qs("#form-feedback");
    if (!form || !feedback) {
      return;
    }

    let feedbackTimer = null;

    const showFeedback = (type, message) => {
      feedback.className = `form-feedback ${type}`;
      feedback.textContent = message;
      if (feedbackTimer) {
        window.clearTimeout(feedbackTimer);
      }
      feedbackTimer = window.setTimeout(() => {
        feedback.className = "form-feedback";
        feedback.textContent = "";
      }, 5000);
    };

    const submitButton = qs('button[type="submit"]', form);
    const setLoading = (loading) => {
      if (!submitButton) {
        return;
      }
      submitButton.disabled = loading;
      submitButton.textContent = loading ? "Sending..." : "Send Message";
    };

    let canUseEmailJS = false;
    if (typeof window.emailjs !== "undefined") {
      try {
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
        canUseEmailJS = true;
      } catch (error) {
        console.error("EmailJS init failed:", error);
      }
    }

    const onSubmit = async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        showFeedback("error", "Please fill all required fields correctly.");
        return;
      }

      setLoading(true);

      try {
        if (!canUseEmailJS) {
          throw new Error("EmailJS unavailable");
        }

        await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
        showFeedback("success", "Message sent successfully. Thank you for reaching out.");
        form.reset();
      } catch (error) {
        console.error("Contact form submission failed:", error);
        showFeedback(
          "error",
          "Unable to send right now. Please email kunallamba47@gmail.com directly."
        );
      } finally {
        setLoading(false);
      }
    };

    form.addEventListener("submit", onSubmit);
    registerCleanup(() => {
      form.removeEventListener("submit", onSubmit);
      if (feedbackTimer) {
        window.clearTimeout(feedbackTimer);
      }
    });
  }

  function initChatbot() {
    const openBtn = qs("#chatbot-btn");
    const box = qs("#chatbot-box");
    const closeBtn = qs("#chatbot-close");
    const messages = qs("#chatbot-messages");
    const input = qs("#chatbot-text");
    const sendBtn = qs("#chatbot-send");

    if (!openBtn || !box || !closeBtn || !messages || !input || !sendBtn) {
      return;
    }

    let isOpen = false;
    let isTyping = false;
    let typingTimer = null;

    const appendMessage = (text, role) => {
      const bubble = document.createElement("div");
      bubble.className = `msg ${role}`;
      bubble.textContent = text;
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
      return bubble;
    };

    const showTyping = () => {
      const wrapper = document.createElement("div");
      wrapper.className = "msg bot typing";
      wrapper.innerHTML =
        '<div class="typing-dots" aria-hidden="true"><span></span><span></span><span></span></div>';
      messages.appendChild(wrapper);
      messages.scrollTop = messages.scrollHeight;
      return wrapper;
    };

    const getReply = (text) => {
      const match = chatFallbacks.find((item) => item.test.test(text));
      if (match) {
        return match.reply;
      }
      return "I can help with Kunal's skills, projects, education, resume, and contact details.";
    };

    const setOpen = (open) => {
      isOpen = open;
      box.classList.toggle("is-visible", open);
      box.setAttribute("aria-hidden", String(!open));
      openBtn.setAttribute("aria-expanded", String(open));
      if (open) {
        input.focus();
      }
    };

    const sendMessage = () => {
      const value = input.value.trim();
      if (!value || isTyping) {
        return;
      }

      appendMessage(value, "user");
      input.value = "";
      isTyping = true;
      sendBtn.disabled = true;
      const typingNode = showTyping();

      typingTimer = window.setTimeout(() => {
        typingNode.remove();
        appendMessage(getReply(value), "bot");
        isTyping = false;
        sendBtn.disabled = false;
      }, 420);
    };

    const onToggle = () => setOpen(!isOpen);
    const onClose = () => setOpen(false);
    const onKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        setOpen(false);
      }
    };
    const onInputKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    };

    openBtn.addEventListener("click", onToggle);
    closeBtn.addEventListener("click", onClose);
    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keydown", onInputKeyDown);
    document.addEventListener("keydown", onKeyDown);

    appendMessage("Hi, I am Kunal's assistant. Ask me about skills, projects, education, or contact details.", "bot");

    registerCleanup(() => {
      if (typingTimer) {
        window.clearTimeout(typingTimer);
      }
      openBtn.removeEventListener("click", onToggle);
      closeBtn.removeEventListener("click", onClose);
      sendBtn.removeEventListener("click", sendMessage);
      input.removeEventListener("keydown", onInputKeyDown);
      document.removeEventListener("keydown", onKeyDown);
    });
  }

  function start() {
    safeInit("Loader", initLoader);
    safeInit("Theme Toggle", initThemeToggle);
    safeInit("Mobile Menu", initMobileMenu);
    safeInit("Smooth Scroll", initSmoothAnchorScroll);
    safeInit("Reveal Effects", initSectionReveal);
    safeInit("Typing Text", initTypingText);
    safeInit("Skill Bars", initSkillBars);
    safeInit("Resume Counter", initResumeCounter);
    safeInit("Scroll UI", initScrollUI);
    safeInit("Background Dots", initBackgroundDots);
    safeInit("Background Canvas", initBackgroundCanvas);
    safeInit("Skill Galaxy", initSkillGalaxy);
    safeInit("Project Carousel", initProjectCarousel);
    safeInit("Achievement Counter", initAchievementCounter);
    safeInit("GitHub Stats Fade", initGitHubImageFade);
    safeInit("Contact Form", initContactForm);
    safeInit("Chatbot", initChatbot);

    window.addEventListener("beforeunload", runCleanup, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
