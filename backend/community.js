

function createPost(){

    let input = document.getElementById("postInput");
    let text = input.value.trim();

    if(text === ""){
        alert("Write something first!");
        return;
    }

    let feed = document.getElementById("feed");

    let post = document.createElement("div");

    post.classList.add("post");

    post.innerHTML = `
        <div class="post-header">
            <div class="avatar"></div>

            <div>
                <div class="username">You</div>
                <div style="font-size:12px;color:gray;">
                    Just now
                </div>
            </div>
        </div>

        <div class="post-content">
            ${text}
        </div>

        <div class="actions">
            <div>❤️ Like</div>
            <div>💬 Comment</div>
            <div>🔁 Share</div>
        </div>
    `;

    feed.prepend(post);

    input.value = "";
}

//home page userinfo 
const user = JSON.parse(localStorage.getItem("user"));

if (user) {

    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("joinBtn").style.display = "none";

    document.getElementById("userInfo").style.display = "block";

    document.getElementById("userInfo").innerHTML = `
    <div class="profile-menu">

        <button class="profile-btn" onclick="toggleDropdown()">

            <div class="avatar-circle">
                ${user.name.charAt(0).toUpperCase()}
            </div>

            ${user.name} ▼

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
}

function toggleDropdown() {
    document
        .getElementById("dropdownContent")
        .classList.toggle("show");
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "login.html";
}