document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
       ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#main-navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("is-open");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Menü schließen" : "Menü öffnen"
            );
        });

        // Menü schließen, wenn ein Link angeklickt wird
        const navigationLinks = navigation.querySelectorAll("a");

        navigationLinks.forEach(link => {
            link.addEventListener("click", () => {
                navigation.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Menü öffnen");
            });
        });

    }


    /* =========================================
   SUCHFUNKTION
   ========================================= */

const searchForm = document.querySelector(".search");
const searchInput = document.querySelector(".search input");

if (searchForm && searchInput) {

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const searchTerm = searchInput.value.trim().toLowerCase();

        // Nichts eingegeben
        if (searchTerm === "") {
            searchInput.focus();
            return;
        }

        // Alle relevanten Inhalte durchsuchen
        const elements = document.querySelectorAll(
            "main h1, main h2, main h3, main p, main li"
        );

        let found = false;

        // Alte Markierungen entfernen
        elements.forEach(element => {
            element.classList.remove("search-highlight");
        });

        // Nach Suchbegriff suchen
        for (const element of elements) {

            const text = element.textContent.toLowerCase();

            if (text.includes(searchTerm)) {

                element.classList.add("search-highlight");

                element.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                found = true;
                break;
            }
        }

        // Wenn nichts gefunden wurde
        if (!found) {
            alert("Leider wurde kein passender Inhalt gefunden.");
        }

    });

}


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