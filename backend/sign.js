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