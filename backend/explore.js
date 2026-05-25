// to this
const API = "http://localhost:5000";let allSkills = []; // store all skills globally

// Fetch and render skills
async function loadSkills() {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = `<p class="loading-msg">Loading skills...</p>`;

  try {
    const res = await fetch(`${API}/api/skills`);
    allSkills = await res.json();

    // update count
    const countEl = document.getElementById("skillCount");
    if (countEl) countEl.textContent = allSkills.length;

    renderSkills(allSkills);

  } catch (err) {
    grid.innerHTML = `<p class="loading-msg" style="color:#f472b6;">Failed to load skills. Is the server running?</p>`;
    console.error(err);
  }
}

// Render skills to grid
function renderSkills(skills) {
  const grid = document.getElementById("skillsGrid");

  if (skills.length === 0) {
    grid.innerHTML = `
      <div class="empty-msg">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>No skills found.</p>
      </div>`;
    return;
  }

  const iconColors = [
    "icon-purple", "icon-cyan", "icon-pink",
    "icon-green", "icon-amber", "icon-blue",
    "icon-red", "icon-teal"
  ];

  grid.innerHTML = skills.map((skill, i) => `
    <div class="skill-card">
      <div class="card-top">
        <div class="card-icon ${iconColors[i % iconColors.length]}">
          <i class="ti ${skill.icon || 'ti-star'}"></i>
        </div>
        <div class="card-info">
          <h3>${skill.title}</h3>
          <span>${skill.category}</span>
        </div>
      </div>
      <p class="card-desc">${skill.description}</p>
      <div class="card-tags">
        ${skill.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <div class="card-footer">
        <span class="members"><span>${skill.members}</span> members</span>
        <button class="swap-btn">Swap</button>
      </div>
    </div>
  `).join("");
}

// Filter buttons — strip emoji from button text
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // strip emoji and spaces to get clean category name
    const category = btn.getAttribute("data-category");

    if (category === "All") {
      renderSkills(allSkills);
    } else {
      const filtered = allSkills.filter(s => s.category === category);
      renderSkills(filtered);
    }
  });
});

// Search — filter from allSkills array
document.getElementById("searchInput").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();

  if (query === "") {
    renderSkills(allSkills);
    return;
  }

  const filtered = allSkills.filter(skill =>
    skill.title.toLowerCase().includes(query) ||
    skill.category.toLowerCase().includes(query) ||
    skill.tags.some(tag => tag.toLowerCase().includes(query))
  );

  renderSkills(filtered);
});

// Load on page open
loadSkills();