
const user = JSON.parse(localStorage.getItem("user"));

if (user) {

    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("joinBtn").style.display = "none";

    document.getElementById("userInfo").style.display = "block";

    document.getElementById("userInfo").innerHTML = `
    
   <div class="profile-menu">

    <button class="profile-btn" onclick="toggleDropdown()">
        👋 Ayush Babu ▼
    </button>

    <div class="dropdown-content" id="dropdownContent">

        <div class="user-card">
            <h4>Ayush Babu</h4>
            <p>babuayushjnv@gmail.com</p>
        </div>

        <a href="skillchoose.html">📚 My Skills</a>
        <a href="profile.html">👤 Profile</a>
        <a href="#" onclick="logout()">🚪 Logout</a>

    </div>

</div>

    `;
}
function toggleDropdown() {
    document
        .getElementById("dropdownContent")
        .classList.toggle("show");
}

window.addEventListener("click", function (e) {

    if (!e.target.closest(".profile-menu")) {

        const menu =
            document.getElementById("dropdownContent");

        if (menu) {
            menu.classList.remove("show");
        }
    }
});

function logout() {

    localStorage.removeItem("user");

    window.location.href = "login.html";
}

//for first letter of name as avatar

document.getElementById("userInfo").innerHTML = `
<div class="profile-menu">

    <button class="profile-btn" onclick="toggleDropdown()">

        <div class="avatar-circle">
            ${user.name.charAt(0).toUpperCase()}
        </div>

        <span>${user.name}</span>
        ▼

    </button>

    <div class="dropdown-content" id="dropdownContent">

        <div class="user-card">

            <div class="user-header">
                <div class="avatar-large">
                    ${user.name.charAt(0).toUpperCase()}
                </div>

                <div>
                    <h4>${user.name}</h4>
                    <p>${user.email}</p>
                </div>
            </div>

        </div>

        <a href="skillchoose.html">📚 My Skills</a>
        <a href="profile.html">👤 Profile</a>
        <a href="#" onclick="logout()">🚪 Logout</a>

    </div>

</div>
`;