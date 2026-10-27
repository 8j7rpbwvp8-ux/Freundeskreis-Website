document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION test
       ========================================= */
(() => {
  const button = document.getElementById('menu-toggle');
  const menu = document.getElementById('main-navigation');
  if (!button || !menu) return;
  const close = () => {
    menu.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Menü öffnen');
    button.querySelector('span').textContent = '☰';
  };
  button.addEventListener('click', () => {
    const opening = !menu.classList.contains('open');
    menu.classList.toggle('open', opening);
    button.setAttribute('aria-expanded', String(opening));
    button.setAttribute('aria-label', opening ? 'Menü schließen' : 'Menü öffnen');
    button.querySelector('span').textContent = opening ? '✕' : '☰';
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  document.addEventListener('click', event => { if (!menu.contains(event.target) && !button.contains(event.target)) close(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 1000) close(); });
})();

    /* =========================================
       SCROLL-REVEAL
       ========================================= */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && revealElements.length > 0) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        // Falls der Browser IntersectionObserver nicht unterstützt
        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =========================================
       SMOOTH SCROLL FÜR ANKER-LINKS
       ========================================= */

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       HEADER BEIM SCROLLEN
       ========================================= */

    const header = document.querySelector(".site-header");

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 20) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        });

    }
    

    /* =========================================
       ESC-TASTE
       ========================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (navigation && menuToggle) {

                navigation.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Menü öffnen");

            }

        }

    });

});