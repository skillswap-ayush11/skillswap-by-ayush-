


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
document.getElementById("startSwapping").addEventListener("click", (e) => {
  e.preventDefault();

  const user = localStorage.getItem("user");

  if (!user) {
    window.location.href = "signup.html";
    return;
  }

  window.location.href = "skillchoose.html";
});
const user = JSON.parse(localStorage.getItem("user"));

console.log("User:", user);

if (user) {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("joinBtn").style.display = "none";

    document.getElementById("userInfo").style.display = "block";

    document.getElementById("userInfo").innerHTML = `
        <div class="user-profile">
            <strong>${user.name}</strong><br>
            <small>${user.email}</small>
        </div>
    `;
}const user = JSON.parse(localStorage.getItem("user"));

if (user) {

    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("joinBtn").style.display = "none";

    const userInfo = document.getElementById("userInfo");

    userInfo.style.display = "block";

    userInfo.innerHTML = `
        <div class="user-profile">
            <strong>👋 ${user.name}</strong>
            <br>
            <small>${user.email}</small>
        </div>
    `;
}