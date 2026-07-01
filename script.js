// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Link GSAP and Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);

// Loader
window.addEventListener('load', () => {
  gsap.to('#loader', {
    yPercent: -100,
    duration: 0.8,
    ease: "power3.inOut",
    delay: 0.2
  });

  initHeroAnimations();
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
});

// Animations
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" }});
  
  tl.fromTo('.hero__image img', 
    { scale: 1.15 }, 
    { scale: 1, duration: 2 }
  )
  .fromTo('.hero__title .chars', 
    { yPercent: 100 }, 
    { yPercent: 0, duration: 1.2, stagger: 0.05 },
    "-=1.5"
  )
  .fromTo('.hero__text-top', 
    { opacity: 0, x: -20 }, 
    { opacity: 1, x: 0, duration: 1 },
    "-=1"
  )
  .fromTo('.hero__text-date, .hero__text-year', 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
    "-=1"
  );
}

// Parallax Images
gsap.utils.toArray('.parallax-img').forEach(img => {
  gsap.to(img, {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: img.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});
gsap.utils.toArray('.parallax-img-fast').forEach(img => {
  gsap.to(img, {
    yPercent: 40,
    ease: "none",
    scrollTrigger: {
      trigger: img.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});
gsap.utils.toArray('.parallax-img-slow').forEach(img => {
  gsap.to(img, {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: img.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

// Scroll Reveals
gsap.utils.toArray('.gs-fade').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%"
      }
    }
  );
});

gsap.utils.toArray('.gs-fade-up').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%"
      }
    }
  );
});

// Lines animation
gsap.utils.toArray('.gs-line').forEach(el => {
  const line = el.querySelector('.agenda__line');
  const lineBot = el.querySelector('.agenda__line-bottom');
  if(line) {
    gsap.to(line, {
      scaleX: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%"
      }
    });
  }
  if(lineBot) {
    gsap.to(lineBot, {
      scaleX: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%"
      }
    });
  }
});

// Form submission
const form = document.getElementById('reg');
const btn = document.getElementById('sbtn');
const fok = document.getElementById('fok');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    btn.disabled = true;
    btn.innerHTML = '<span>Invio in corso...</span>';

    setTimeout(() => {
      form.classList.add('gone');
      fok.style.display = 'block';
      gsap.fromTo(fok, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5});
    }, 1500);
  });
}

// The Way SVG Animation
const wayPaths = document.querySelectorAll('.way-svg path, .way-svg circle');
if (wayPaths.length) {
  wayPaths.forEach(el => {
    const l = el.getTotalLength() + 10;
    gsap.set(el, { strokeDasharray: l, strokeDashoffset: l + 5 });
  });
  
  const tlWay = gsap.timeline({
    scrollTrigger: {
      trigger: ".way-svg-wrapper",
      start: "top 75%"
    }
  });

  tlWay.to(wayPaths, {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: "power2.out"
  })
  .from('.way-svg text', {
    opacity: 0,
    y: 15,
    duration: 0.8,
    stagger: 0.1
  }, "-=0.5");
}

// Blur Scroll Text Effect
const blurTexts = document.querySelectorAll('.gs-blur-scroll');
if (blurTexts.length) {
  blurTexts.forEach(el => {
    const text = el.innerText;
    const words = text.split(' ');
    el.innerHTML = '';
    words.forEach(w => {
      const span = document.createElement('span');
      span.innerHTML = w + '&nbsp;';
      span.style.display = 'inline-block';
      span.style.willChange = 'filter, opacity, transform';
      el.appendChild(span);
    });
    
    gsap.fromTo(el.querySelectorAll('span'), 
      { filter: 'blur(12px)', opacity: 0, y: 30 },
      {
        filter: 'blur(0px)', opacity: 1, y: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1
        }
      }
    );
  });
}
