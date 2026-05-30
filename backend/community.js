

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

