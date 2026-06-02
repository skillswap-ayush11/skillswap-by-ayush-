// Check if user is logged in
const token = localStorage.getItem("token");
const user  = JSON.parse(localStorage.getItem("user"));

const navBtns = document.querySelector(".nav-btns");

if (token && user) {
  // User is logged in — show Hi, Name + Logout
  navBtns.innerHTML = `
    <span class="greeting">👋 Hi, ${user.firstName}</span>
    <button class="logout-btn" onclick="logout()">Logout</button>
  `;
} 

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

window.addEventListener("load", function () {

    setTimeout(() => {

        document.getElementById("skeleton-loader").style.display = "none";
        document.getElementById("main-content").style.display = "block";

    }, 2000); // Show skeleton for 2 seconds

});
