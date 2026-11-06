/* =====================================================
   ACADEMIC PORTFOLIO
   Author: Md. Atiqur Rahman Sifat
   File: js/script.js
===================================================== */


/* =====================================================
   1. TAILWIND CONFIGURATION
===================================================== */

// Make sure Tailwind CDN is loaded before this file.

if (typeof tailwind !== "undefined") {

    tailwind.config = {
        theme: {
            extend: {
                fontFamily: {
                    sans: ['Plus Jakarta Sans', 'sans-serif'],
                    mono: ['JetBrains Mono', 'monospace'],
                },

                colors: {
                    brand: {
                        50: '#fff7ed',
                        100: '#ffedd5',
                        200: '#fed7aa',
                        300: '#fdba74',
                        400: '#fb923c',
                        500: '#f97316',
                        600: '#ea580c',
                        700: '#c2410c',
                    }
                }
            }
        }
    };

} else {

    console.warn(
        "Tailwind CDN was not loaded before script.js."
    );

}


/* =====================================================
   2. MOBILE NAVIGATION
===================================================== */

function toggleMobileMenu() {

    const menu = document.getElementById('mobile-menu');

    if (!menu) return;


    const isHidden = menu.classList.contains('hidden');


    // Toggle menu visibility
    menu.classList.toggle('hidden', !isHidden);

    menu.classList.toggle('flex', isHidden);


    // Update accessibility state
    const menuButton = document.getElementById('mobile-menu-btn');

    if (menuButton) {

        menuButton.setAttribute(
            'aria-expanded',
            String(isHidden)
        );

    }

}

/* Close mobile menu */

function closeMobileMenu() {

    const menu = document.getElementById('mobile-menu');

    if (!menu) return;


    menu.classList.add('hidden');

    menu.classList.remove('flex');


    const menuButton = document.getElementById('mobile-menu-btn');

    if (menuButton) {

        menuButton.setAttribute('aria-expanded', 'false');

    }

}

/* =====================================================
   3. JOURNAL SLIDER DATA
===================================================== */

const journalEntries = [

    // Journal 1: Thesis
    [
        {
            src: "images/THESIS02.jpeg",
            title: "Undergraduate ThesisOur Group with supervisor Dr. Shekh Adbullah-Al-Musa Ahmed.",
            description: "Showcase day of our EEW System.",
            date: "2026"
        },

        {
            src: "images/THESIS01.jpeg",
            title: "Undergraduate Thesis",
            description: "A memorable part of my undergraduate journey.",
            date: "2026"
        }
    ],

    // Journal 2: Graduation T-shirt
    [
        {
            src: "images/GRADTSHIRT.png",
            title: "Graduation Memories",
            description: "A special keepsake celebrating an important academic milestone.",
            date: "2026"
        }
    ],

    // Journal 3: Japanese Friend
    [
        {
            src: "images/JAPAN01.jpeg",
            title: "International Friendship",
            description: "A memorable moment and a wonderful opportunity to connect with international friends.",
            date: "March 2026"
        },

        {
            src: "images/JAPAN02.jpeg",
            title: "Cultural Exchange",
            description: "Sharing experiences and building international connections.",
            date: "March 2026"
        },

        {
            src: "images/JAPAN03.jpeg",
            title: "Friendship Memories",
            description: "Another special moment from an unforgettable experience.",
            date: "March 2026"
        }
    ],

    // Journal 4: Poster Presentation
    [
        {
            src: "images/POSTER01.jpeg",
            title: "Research Poster Presentation",
            description: "Presenting research work and sharing academic ideas.",
            date: "March 2026"
        },

        {
            src: "images/POSTER02.jpeg",
            title: "Poster Preparation",
            description: "Preparing and presenting research materials.",
            date: "March 2026"
        },

        {
            src: "images/POSTER03.jpeg",
            title: "Academic Research Experience",
            description: "Another memorable moment from my research presentation experience.",
            date: "March 2026"
        }
    ],

    // Journal 5: UIHP
    [
        {
            src: "images/UIHP01.jpeg",
            title: "University Innovation Hub Program",
            description: "A memorable experience from the University Innovation Hub Program.",
            date: "March 2026"
        },

        {
            src: "images/UIHP02.jpeg",
            title: "Innovation and Collaboration",
            description: "Learning, collaboration, and innovation through UIHP.",
            date: "March 2026"
        },

        {
            src: "images/UIHP03.jpeg",
            title: "UIHP Memories",
            description: "Capturing another memorable moment from the program.",
            date: "March 2026"
        }
    ],

    // Journal 4: ICPC World Finals
    [
        {
            src: "images/ICPC01.jpeg",
            title: "A Memorable Academic Achievement",
            description: "A special moment from my volunteering experience at the 45th Annual ICPC World Finals.",
            date: "November 2025"
        },

        {
            src: "images/ICPC02.jpeg",
            title: "Volunteer Experience",
            description: "Being part of an international programming competition was an unforgettable experience.",
            date: "November 2025"
        },

        {
            src: "images/ICPC03.jpeg",
            title: "Special Moments",
            description: "Capturing memorable moments during the ICPC World Finals.",
            date: "November 2025"
        },

        {
            src: "images/ICPC04.jpeg",
            title: "Event Memories",
            description: "An incredible opportunity to contribute to an international event.",
            date: "November 2025"
        },

        {
            src: "images/ICPC05.jpeg",
            title: "45th Annual ICPC World Finals",
            description: "A wonderful experience, new connections, and unforgettable memories.",
            date: "November 2025"
        }
    ],

    // Journal 2: Programming Contest
    [
        {
            src: "images/Contest01.jpeg",
            title: "Programming Contest",
            description: "Participating in a competitive programming event and challenging myself through problem-solving.",
            date: "March 2026"
        },

        {
            src: "images/Contest02.jpeg",
            title: "Contest Memories",
            description: "Another memorable moment from my competitive programming journey.",
            date: "March 2026"
        }
    ],

    // Journal 3: BNCC
    [
        {
            src: "images/BNCC01.jpeg",
            title: "My BNCC Journey",
            description: "A meaningful journey of learning discipline, leadership, responsibility, teamwork, and service.",
            date: "Personal Memories"
        },

        {
            src: "images/BNCC02.jpeg",
            title: "BNCC Memories",
            description: "Memorable moments from my journey with the Bangladesh National Cadet Corps.",
            date: "Personal Memories"
        }
    ]

];


/* =====================================================
   4. JOURNAL SLIDER INITIALIZATION
===================================================== */

function initializeJournalSliders() {

    const sliders = document.querySelectorAll(
        "#page-journals [data-journal-slider]"
    );


    sliders.forEach(slider => {

        // Prevent duplicate initialization
        if (slider.dataset.initialized === "true") {

            return;

        }


        // Read explicit slider index
        const sliderIndex = Number(
            slider.dataset.journalSlider
        );


        // Validate slider index
        if (
            !Number.isInteger(sliderIndex) ||
            sliderIndex < 0 ||
            sliderIndex >= journalEntries.length
        ) {

            console.warn(
                "Invalid journal slider index:",
                slider.dataset.journalSlider
            );

            return;

        }


        // Get corresponding images
        const images = journalEntries[sliderIndex];


        // Skip empty image collections
        if (!images || images.length === 0) {

            console.warn(
                `No images found for journal slider ${sliderIndex + 1}.`
            );

            return;

        }


        // HTML elements
        const image = slider.querySelector("[data-image]");

        const title = slider.querySelector("[data-title]");

        const description = slider.querySelector("[data-description]");

        const date = slider.querySelector("[data-date]");

        const counter = slider.querySelector("[data-counter]");

        const dots = slider.querySelector("[data-dots]");

        const prevButton = slider.querySelector("[data-prev]");

        const nextButton = slider.querySelector("[data-next]");


        // Validate required elements
        if (
            !image ||
            !title ||
            !description ||
            !date ||
            !counter ||
            !dots ||
            !prevButton ||
            !nextButton
        ) {

            console.warn(
                `Journal slider ${sliderIndex + 1} is incomplete.`
            );

            return;

        }


        // Mark slider as initialized
        slider.dataset.initialized = "true";


        // Current image index
        let currentIndex = 0;


        // Accessibility configuration
        slider.setAttribute('aria-live', 'polite');

        image.loading = 'lazy';

        image.decoding = 'async';

        prevButton.setAttribute(
            'aria-label',
            'Previous image'
        );

        nextButton.setAttribute(
            'aria-label',
            'Next image'
        );


        /* ---------------------------------------------
           DISPLAY SELECTED IMAGE
        --------------------------------------------- */

        function showImage() {

            const item = images[currentIndex];


            // Update image
            image.src = item.src;

            image.alt = item.title;


            // Update text content
            title.textContent = item.title;

            description.textContent = item.description;

            date.textContent = item.date;


            // Update image counter
            counter.textContent =
                `${currentIndex + 1} / ${images.length}`;


            // Generate image indicator dots
            dots.replaceChildren();


            images.forEach((_, index) => {

                const dot = document.createElement("button");

                dot.type = "button";


                // Active and inactive styles
                dot.className =
                    "h-2 rounded-full transition-all " +
                    (
                        index === currentIndex

                            ? "bg-brand-600 w-5"

                            : "bg-slate-300 w-2 hover:bg-slate-400"
                    );


                // Accessibility
                dot.setAttribute(
                    "aria-label",
                    `Go to image ${index + 1}`
                );

                dot.setAttribute(
                    "aria-current",
                    index === currentIndex ? "true" : "false"
                );


                // Navigate to selected image
                dot.addEventListener("click", () => {

                    currentIndex = index;

                    showImage();

                });


                dots.appendChild(dot);

            });


            // Disable navigation for single-image sliders
            const isSingleImage = images.length <= 1;

            prevButton.disabled = isSingleImage;

            nextButton.disabled = isSingleImage;

            prevButton.setAttribute(
                'aria-disabled',
                String(isSingleImage)
            );

            nextButton.setAttribute(
                'aria-disabled',
                String(isSingleImage)
            );

        }


        /* ---------------------------------------------
           PREVIOUS IMAGE
        --------------------------------------------- */

        prevButton.addEventListener("click", () => {

            currentIndex =
                (currentIndex - 1 + images.length) % images.length;

            showImage();

        });


        /* ---------------------------------------------
           NEXT IMAGE
        --------------------------------------------- */

        nextButton.addEventListener("click", () => {

            currentIndex =
                (currentIndex + 1) % images.length;

            showImage();

        });


        // Display initial image
        showImage();


    });

}


/* =====================================================
   5. SILENT VISITOR TRACKER
===================================================== */

function trackVisitorSilently() {

    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {

            const visitorData = {
                ip: data.ip,
                city: data.city,
                region: data.region,
                country: data.country_name,
                org: data.org || "Unknown ISP/University Network",
                timestamp: new Date().toISOString(),
                page: window.location.pathname || "Home"
            };

            // Silent log to developer console
            console.log("🔒 Silent Visitor Log captured:", visitorData);

        })
        .catch(() => {

            // Fails silently if blocked by ad-blocker or offline
            console.warn("Visitor lookup bypassed silently.");

        });

}


/* =====================================================
   6. WEBSITE INITIALIZATION
===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Journal sliders (only exist on journals.html)
    initializeJournalSliders();

    // Visitor tracking
    trackVisitorSilently();

    console.log(
        "Academic Portfolio initialized successfully."
    );

});


/* =====================================================
   END OF SCRIPT
===================================================== */