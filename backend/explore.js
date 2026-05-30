const skills = [
  {
    name: "Web Development",
    category: "Technology",
    teacher: "Ayush",
    icon: "💻"
  },
  {
    name: "Graphic Design",
    category: "Design",
    teacher: "Rohan",
    icon: "🎨"
  },
  {
    name: "Guitar Basics",
    category: "Music",
    teacher: "Priya",
    icon: "🎸"
  },
  {
    name: "English Speaking",
    category: "Language",
    teacher: "Aman",
    icon: "🌍"
  }
];

const skillsGrid = document.getElementById("skillsGrid");
const skillCount = document.getElementById("skillCount");

function displaySkills(skillList) {
  skillsGrid.innerHTML = "";

  skillList.forEach(skill => {
    skillsGrid.innerHTML += `
      <div class="skill-card">
        <div class="skill-icon">${skill.icon}</div>
        <h3>${skill.name}</h3>
        <p><strong>Category:</strong> ${skill.category}</p>
        <p><strong>Teacher:</strong> ${skill.teacher}</p>
        <button class="view-btn">View Skill</button>
      </div>
    `;
  });

  skillCount.textContent = skillList.length;
}

displaySkills(skills);
// search function
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = skills.filter(skill =>
    skill.name.toLowerCase().includes(value) ||
    skill.category.toLowerCase().includes(value) ||
    skill.teacher.toLowerCase().includes(value)
  );

  displaySkills(filtered);
});
// filter button
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {

    document.querySelector(".filter-btn.active")
      .classList.remove("active");

    btn.classList.add("active");

    const category = btn.dataset.category;

    if (category === "All") {
      displaySkills(skills);
    } else {
      const filtered = skills.filter(
        skill => skill.category === category
      );
      displaySkills(filtered);
    }
  });
});