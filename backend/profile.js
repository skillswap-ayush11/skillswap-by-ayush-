const saveBtn =
document.querySelector(".save-btn");

saveBtn.addEventListener("click", ()=>{

  const profileData = {

    name:
      document.getElementById("name").value,

    bio:
      document.getElementById("bio").value,

    country:
      document.getElementById("country").value,

    state:
      document.getElementById("state").value,

    city:
      document.getElementById("city").value,

    address:
      document.getElementById("address").value,

    phone:
      document.getElementById("phone").value,

    github:
      document.getElementById("github").value,

    linkedin:
      document.getElementById("linkedin").value,

    portfolio:
      document.getElementById("portfolio").value,

    teachSkills:
      document.getElementById("teachSkills").value,

    learnSkills:
      document.getElementById("learnSkills").value,

    languages:
      document.getElementById("languages").value,

    availability:
      document.getElementById("availability").value

  };

  localStorage.setItem(
    "profile",
    JSON.stringify(profileData)
  );

  alert("Profile Saved!");
});