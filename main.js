const $generateButton = document.getElementById("generate_opinion");
const $BMIButton = document.getElementById("bmi_button")


//bmi button 


$BMIButton.addEventListener("click", () =>{
    location.replace('https://bmi-online.pl/');
});


// reqres api 

fetch('https://reqres.in/api/users')
.then(response => response.json())
.then(json => {
    console.log(json.data);
    const teamContainer= json.data.map( el =>{
        return `
        <div>
        <div class="card bg-light text-success">
        <div class="card-body text-center">
        <div class="image-container">
        <img class="rounded-circle mb-4" src="${el.avatar}">
        </div>
        <div class"name-container">
        <span class="firstName">${el.first_name}
        </span>
        <span class="lastName">${el.last_name} 
        </span>
        <p class-"email">${el.email}</p>
        <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. In magni recusandae aspernatur sunt incidunt, quia molestiae enim deserunt repellendus ut repellat totam, suscipit eaque distinctio eius. Eius explicabo voluptatem architecto.</p>
        </div>
        </div>
        </div>
        </div>
    `})

    document.querySelector('.team-container').innerHTML = teamContainer;
})


// map 

var map = L.map('map').setView([40.712, -74.227],5);

L.tileLayer('https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=IfxVdhkwsAqYS8TOgkw8', {
    attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map); 


//event listener

$generateButton.addEventListener("click", () =>{
    fetch('https://randomuser.me/api/')
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        const NewName = res.results[0].name.first + '  ' + res.results[0].name.last;
        const email = res.results[0].email;
        const avatar =res.results[0].picture.medium;
    document.getElementById("new_email").innerText = email;
    document.getElementById("new_name").innerText = NewName;
    document.getElementById("new_picture").src = avatar;
    document.getElementById("text_opinion").classList.remove("not_visible")
});
});



