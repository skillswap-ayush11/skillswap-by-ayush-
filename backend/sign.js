document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    firstName: document.getElementById("fname").value,
    lastName:  document.getElementById("lname").value,
    email:     document.getElementById("email").value,
    password:  document.getElementById("password").value,
    confirm:   document.getElementById("confirm").value,
  };

  if (data.password !== data.confirm) {
    alert("Passwords do not match!");
    return;
  }

  if (!document.getElementById("terms").checked) {
    alert("Please agree to the Terms and Privacy Policy.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Account created successfully! 🎉");
      window.location.href = "login.html";
    } else {
      alert(result.message);
    }

  } catch (err) {
    alert("Cannot connect to server. Make sure backend is running.");
    console.error(err);
  }
});
// in navbar show user info

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