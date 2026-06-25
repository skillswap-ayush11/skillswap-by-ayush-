// log out function
function logout() {

    localStorage.removeItem("user");

    window.location.href = "login.html";
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



function checkAuthStatus() {
  // Change this to match how your app stores login state:
  return !!localStorage.getItem('authToken');
  // Firebase example: return !!firebase.auth().currentUser;
}

function closeModal() {
  document.getElementById('authModal').classList.remove('open');
}

// Close when clicking the dark backdrop
document.getElementById('authModal').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// Close with Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});



// document.getElementById("startSwapping")
// .addEventListener("click", function(e){

//     e.preventDefault();

//     const user =
//     JSON.parse(localStorage.getItem("user"));

//     if(user){

//         window.location.href =
//         "skillchoose.html";

//     }else{

//         document
//         .getElementById("loginModal")
//         .classList.add("show");

//     }

// });


// //or

// // Paste into your JS file

// document.getElementById('startSwapping').addEventListener('click', function (e) {
//   e.preventDefault(); // stop the anchor from navigating immediately

//   if (checkAuthStatus()) {
//     // logged in → go to skillchoose.html as normal
//     window.location.href = 'skillchoose.html';
//   } else {
//     // not logged in → show the modal instead
//     document.getElementById('authModal').classList.add('open');
//   }
// });

document.getElementById("startSwapping").addEventListener("click", (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");

    // If user is logged in
    if (user) {
        window.location.href = "skillchoose.html";
    }
    // If user is not logged in
    else {
        document.getElementById("authModal").style.display = "flex";
    }
});

// Close modal
function closeModal() {
    document.getElementById("authModal").style.display = "none";
}