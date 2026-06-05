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