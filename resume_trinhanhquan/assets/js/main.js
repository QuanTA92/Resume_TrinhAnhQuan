(function () {
  "use strict";

  const body = document.body;
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const scrollTop = document.querySelector('.scroll-top');

  function toggleMobileNav() {
    body.classList.toggle('mobile-nav-active');
    mobileNavToggle.classList.toggle('bi-list');
    mobileNavToggle.classList.toggle('bi-x');
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', toggleMobileNav);
  }

  document.querySelectorAll('#navmenu a').forEach((link) => {
    link.addEventListener('click', () => {
      if (body.classList.contains('mobile-nav-active')) {
        toggleMobileNav();
      }
    });
  });

  function updateScrollState() {
    body.classList.toggle('scrolled', window.scrollY > 100);
    if (scrollTop) {
      scrollTop.classList.toggle('active', window.scrollY > 100);
    }
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  window.addEventListener('load', updateScrollState);

  if (scrollTop) {
    scrollTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', () => {
    if (window.AOS) {
      AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    }

    const typedElement = document.querySelector('.typed');
    if (typedElement && window.Typed) {
      const phrases = typedElement.getAttribute('data-typed-items').split(',');
      new Typed(typedElement, {
        strings: phrases,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }

    document.querySelectorAll('.navmenu a').forEach((link) => {
      const section = document.querySelector(link.hash);
      if (section && window.location.hash === link.hash) {
        document.querySelectorAll('.navmenu a.active').forEach((activeLink) => activeLink.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  function updateActiveSection() {
    const scrollPosition = window.scrollY + 200;
    document.querySelectorAll('.navmenu a').forEach((link) => {
      const section = document.querySelector(link.hash);
      if (!section) return;

      const isActive = scrollPosition >= section.offsetTop && scrollPosition <= section.offsetTop + section.offsetHeight;
      link.classList.toggle('active', isActive);
    });
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  window.addEventListener('load', updateActiveSection);
})();
