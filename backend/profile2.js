// ===============================
// Current logged-in user
// ===============================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// ===============================
// HTML Elements
// ===============================

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const bioInput = document.getElementById("bio");

const saveBtn = document.getElementById("saveProfile");

const profileImage = document.getElementById("profileImage");
const imageUpload = document.getElementById("imageUpload");

// ===============================
// Load data
// ===============================

loadProfile();

async function loadProfile(){

    try{

        const res = await fetch(
            `http://localhost:5000/api/users/profile/${user._id}`
        );

        const data = await res.json();

        nameInput.value = data.name || "";

        emailInput.value = data.email || "";

        phoneInput.value = data.phone || "";

        addressInput.value = data.address || "";

        bioInput.value = data.bio || "";

        if(data.profileImage){

            profileImage.src = data.profileImage;

        }

    }
    catch(err){

        console.log(err);

    }

}
saveBtn.addEventListener("click", saveProfile);

async function saveProfile(){

    const profile = {

        name:nameInput.value,

        phone:phoneInput.value,

        address:addressInput.value,

        bio:bioInput.value

    };

    try{

        const res = await fetch(

            `http://localhost:5000/api/users/profile/${user._id}`,

            {

                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(profile)

            }

        );

        const data = await res.json();

        alert("Profile Updated Successfully!");

        localStorage.setItem("user",JSON.stringify(data));

    }

    catch(err){

        console.log(err);

    }

}
imageUpload.addEventListener("change", function(){

    const file = this.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload=function(e){

        profileImage.src=e.target.result;

    }

    reader.readAsDataURL(file);

});