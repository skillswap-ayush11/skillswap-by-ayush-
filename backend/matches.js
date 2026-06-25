const user =
JSON.parse(localStorage.getItem("user"));

fetch(
`http://localhost:5000/api/matches/${user._id}`
)
.then(res => res.json())
.then(data => {

  console.log(data);

});