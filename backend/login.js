document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    email:    document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Login successful! 🎉");
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      window.location.href = "home.html"; // redirect after login
    } else {
      alert(result.message);
    }

  } catch (err) {
    alert("Cannot connect to server. Make sure backend is running.");
    console.error(err);
  }
});


window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("login-skeleton").style.display="none";

document.getElementById("main-content").style.display="block";

},2000);

});