document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("primaryMenu"); // keep your menu id
    const top = document.getElementById("hb-top");
    const mid = document.getElementById("hb-mid");
    const bot = document.getElementById("hb-bot");

    if (!toggle) return;

    toggle.addEventListener("click", () => {
        const isHidden = menu.classList.toggle("hidden");
        const open = !isHidden;
        toggle.setAttribute("aria-expanded", String(open));

        if (open) {
            mid.classList.add("opacity-0");
            top.classList.add("translate-y-2", "rotate-45");
            bot.classList.add("-translate-y-2", "-rotate-45");
        } else {
            mid.classList.remove("opacity-0");
            top.classList.remove("translate-y-2", "rotate-45");
            bot.classList.remove("-translate-y-2", "-rotate-45");
        }
    });
});
