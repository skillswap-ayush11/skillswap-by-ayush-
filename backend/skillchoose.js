// <!-- ═══════════════════════════════════════════════════════ -->
// <!--  JAVASCRIPT                                           -->
// <!-- ═══════════════════════════════════════════════════════ -->

// const user = JSON.parse(localStorage.getItem("user"));

// if (!user) {
//   window.location.href = "signup.html";
// }
  /* ── DATA ──────────────────────────────────────────────── */
  const ALL_SKILLS = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#',
    'React', 'Vue.js', 'Angular', 'Node.js', 'PHP', 'Ruby', 'Swift', 'Kotlin',
    'SQL', 'MongoDB', 'PostgreSQL', 'Firebase', 'GraphQL', 'REST APIs',
    'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Graphic Design',
    'Video Editing', 'After Effects', 'Premiere Pro', '3D Modeling', 'Blender',
    'Public Speaking', 'Photography', 'Marketing', 'SEO', 'Copywriting',
    'Content Writing', 'Social Media', 'Data Science', 'Machine Learning',
    'Excel', 'Project Management', 'Music Production', 'Guitar', 'Piano',
    'Cooking', 'Drawing', 'Blockchain', 'DevOps', 'Cybersecurity', 'Docker'
  ];
 
  let teachSelected = new Set();
  let learnSelected  = new Set();
  let currentLevel   = 'Intermediate';
 
  /* ── RENDER SKILL BUTTONS ──────────────────────────────── */
  function renderSkills(type) {
    const query     = document.getElementById(`search-${type}`).value.toLowerCase();
    const filtered  = ALL_SKILLS.filter(s => s.toLowerCase().includes(query));
    const container = document.getElementById(`skills-${type}`);
    container.innerHTML = '';
 
    filtered.forEach(skill => {
      const btn = document.createElement('button');
      btn.className = 'skill-btn';
 
      const isSelected = type === 'teach'
        ? teachSelected.has(skill)
        : learnSelected.has(skill);
 
      if (isSelected) btn.classList.add(`selected-${type}`);
 
      btn.textContent = skill;
      btn.addEventListener('click', () => toggleSkill(type, skill, btn));
      container.appendChild(btn);
    });
  }
 
  /* ── TOGGLE SKILL ───────────────────────────────────────── */
  function toggleSkill(type, skill, btn) {
    const set = type === 'teach' ? teachSelected : learnSelected;
 
    if (set.has(skill)) {
      set.delete(skill);
      btn.classList.remove(`selected-${type}`);
    } else {
      set.add(skill);
      btn.classList.add(`selected-${type}`);
    }
 
    renderTags(type);
  }
 
  /* ── RENDER TAGS ────────────────────────────────────────── */
  function renderTags(type) {
    const container = document.getElementById(`tags-${type}`);
    const set       = type === 'teach' ? teachSelected : learnSelected;
 
    if (set.size === 0) {
      container.innerHTML = '';
      container.classList.add('empty');
      return;
    }
 
    container.classList.remove('empty');
    container.innerHTML = '';
 
    set.forEach(skill => {
      const tag = document.createElement('div');
      tag.className = `tag tag-${type}`;
      tag.innerHTML = `
        ${skill}
        <span class="remove" onclick="removeTag('${type}','${skill}')">✕</span>
      `;
      container.appendChild(tag);
    });
  }
 
  /* ── REMOVE TAG ─────────────────────────────────────────── */
  function removeTag(type, skill) {
    if (type === 'teach') teachSelected.delete(skill);
    else learnSelected.delete(skill);
    renderTags(type);
    renderSkills(type);
  }
 
  /* ── FILTER SKILLS ───────────────────────────────────────── */
  function filterSkills(type) {
    renderSkills(type);
  }
 
  /* ── SET EXPERIENCE LEVEL ───────────────────────────────── */
  function setLevel(level, el) {
    currentLevel = level;
    document.querySelectorAll('.level-opt').forEach(o => o.classList.remove('active'));
    el.classList.add('active');
  }
 
  /* ── NAVIGATE BETWEEN PAGES ─────────────────────────────── */
  function goToPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'summary') buildSummary();
  }
 
  /* ── BUILD SUMMARY ───────────────────────────────────────── */
  function buildSummary() {
    const stEl = document.getElementById('sum-teach');
    const slEl = document.getElementById('sum-learn');
 
    stEl.innerHTML = teachSelected.size
      ? [...teachSelected].map(s => `<div class="tag tag-teach">${s}</div>`).join('')
      : '<span style="color:#5a5a7a;font-size:13px;">No skills added</span>';
 
    slEl.innerHTML = learnSelected.size
      ? [...learnSelected].map(s => `<div class="tag tag-learn">${s}</div>`).join('')
      : '<span style="color:#5a5a7a;font-size:13px;">No skills added</span>';
 
    const icons = { Beginner: '🌱', Intermediate: '⚡', Advanced: '🔥' };
    document.getElementById('sum-level').innerHTML = `${icons[currentLevel]} ${currentLevel}`;
  }
 
  /* ── FINISH ─────────────────────────────────────────────── */
  async function finishProfile() {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    return;
  }

  try {

    const res = await fetch(
      `http://localhost:5000/api/users/teach/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          skillsTeach: [...teachSelected]
        })
      }
    );

    const data = await res.json();

    console.log(data);

    alert("Skills saved successfully! 🎉");

  } catch (err) {
    console.error(err);
    alert("Failed to save skills");
  }
}
  /* ── INIT ───────────────────────────────────────────────── */
  renderSkills('teach');
  renderSkills('learn');

 