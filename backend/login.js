document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(
      "http://localhost:5000/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const result = await res.json();

    if (res.ok) {
      alert("Login successful! 🎉");

      localStorage.setItem(
        "user",
        JSON.stringify(result.user)
      );

      window.location.href = "home.html";
    } else {
      alert(result.message);
    }

  } catch (err) {
    alert("Cannot connect to server");
  }
});
// in navbar show user info
const user = JSON.parse(localStorage.getItem("user"));


if (user) {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("joinBtn").style.display = "none";

    const userInfo = document.getElementById("userInfo");

    userInfo.style.display = "block";

    userInfo.innerHTML = `
        <div class="profile-menu">
            <button class="profile-btn" onclick="toggleMenu()">
                👋 ${user.name} ▼
            </button>

            <div class="dropdown-menu" id="dropdownMenu">
                <div class="user-details">
                    <strong>${user.name}</strong>
                    <small>${user.email}</small>
                </div>

                <a href="skillchoose.html">📚 My Skills</a>
                <a href="#">👤 Profile</a>
                <a href="#" onclick="logout()">🚪 Logout</a>
            </div>
        </div>
    `;
}
function toggleMenu() {
    document
        .getElementById("dropdownMenu")
        .classList.toggle("show");
}

function logout() {
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    window.location.href = "login.html";
}
window.addEventListener("click", function(e){

    if(
        !e.target.closest(".profile-menu")
    ){
        const menu =
            document.getElementById("dropdownMenu");

        if(menu){
            menu.classList.remove("show");
        }
    }
});