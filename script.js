fetch("data.json")
    .then(res => res.json())
    .then(programs => init(programs));

function init(programs) {
    const list = document.getElementById("programList");
    const buttons = document.querySelectorAll(".filter-btn");

    function render(level) {
        list.innerHTML = "";

        const filtered =
            level === "All"
                ? programs
                : programs.filter(p => p.level === level);

        filtered.forEach((p, i) => {
            const card = document.createElement("div");
            card.className = "card";
            card.style.animationDelay = `${i * 0.15}s`;
            card.innerHTML = `
                <span>${p.level}</span>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
            `;
            list.appendChild(card);
        });
    }

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            render(btn.dataset.level);
        });
    });

    document.getElementById("exploreBtn")
        .addEventListener("click", () => {
            document.querySelector(".programs")
                .scrollIntoView({ behavior: "smooth" });
        });

    render("All");
}
