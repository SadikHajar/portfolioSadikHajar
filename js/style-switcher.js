/* ========== LOAD SAVED THEME ON PAGE LOAD ========== */
window.addEventListener('DOMContentLoaded', () => {
    // Load saved color theme
    const savedColor = localStorage.getItem('portfolioThemeColor');
    if (savedColor) {
        setActiveStyle(savedColor);
    }

    // Load saved dark mode preference
    const savedDarkMode = localStorage.getItem('portfolioDarkMode');
    const dayNightIcon = document.querySelector(".day-night i");

    if (savedDarkMode === 'true') {
        document.body.classList.add('dark');
        if (dayNightIcon) dayNightIcon.classList.add('fa-sun');
    } else if (savedDarkMode === 'false') {
        document.body.classList.remove('dark');
        if (dayNightIcon) dayNightIcon.classList.add('fa-moon');
    } else {
        // Check system preference if no saved preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
            if (dayNightIcon) dayNightIcon.classList.add('fa-sun');
        } else {
            if (dayNightIcon) dayNightIcon.classList.add('fa-moon');
        }
    }
});

/* ========== LISTEN FOR SYSTEM THEME CHANGES ========== */
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const savedDarkMode = localStorage.getItem('portfolioDarkMode');
        const dayNightIcon = document.querySelector(".day-night i");

        // Only auto-switch if user hasn't manually set preference
        if (!savedDarkMode) {
            if (e.matches) {
                document.body.classList.add('dark');
                if (dayNightIcon) {
                    dayNightIcon.classList.remove('fa-moon');
                    dayNightIcon.classList.add('fa-sun');
                }
            } else {
                document.body.classList.remove('dark');
                if (dayNightIcon) {
                    dayNightIcon.classList.remove('fa-sun');
                    dayNightIcon.classList.add('fa-moon');
                }
            }
        }
    });
}

/* ========== STYLE SWITCHER TOGGLER ========== */
const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");

if (styleSwitcherToggler) {
    styleSwitcherToggler.addEventListener("click", () => {
        document.querySelector(".style-switcher").classList.toggle("open");
    });
}

window.addEventListener("scroll", () => {
    const styleSwitcher = document.querySelector(".style-switcher");
    if (styleSwitcher && styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open");
    }
});

/* ========== THEME COLORS ========== */
const alternateStyle = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    alternateStyle.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });

    // Save to localStorage
    localStorage.setItem('portfolioThemeColor', color);
}

/* ========== DARK MODE TOGGLE ========== */
const dayNight = document.querySelector(".day-night");

if (dayNight) {
    dayNight.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        const icon = dayNight.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-sun");
            icon.classList.toggle("fa-moon");
        }

        // Save to localStorage
        localStorage.setItem('portfolioDarkMode', isDark.toString());
    });
}