
const $logout = document.getElementById("logout");
const $countryButton = document.getElementById("country_button");
const $countryInput = document.getElementById("country_input");
const $generateButton = document.getElementById("generate_id");
const $toggleButton = document.getElementById("toggle_screen");

const $toggleScreens = document.getElementById("toggle_screens");
const $addTask = document.getElementById("add_task");
const $taskList = document.getElementById("task_list");
const $newTaskInput = document.getElementById("new_task_input");
const $loadTasks = document.getElementById("load_tasks");


$toggleButton.addEventListener('click', () => {
    document.getElementById("general_screen").classList.toggle("hidden");
    document.getElementById("notes_screen").classList.toggle("hidden");
})

var map = L.map('map').setView([0, 0], 5);
L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=LI4L28yACgdpBon0bgPY', {
    attributtion: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);




const logout = () => {
    localStorage.setItem("isLoggedIn", "no");
    window.location.href = "/";
};

const isLoggedIn =localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "yes"){
    logout();
};


const searchCountry = () => {
    const country = $countryInput.value;
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((res) => res.json())
    .then((res) => {
        const country = res[0];
        if (country){

            const capital = country.capital.join(",");
            const fullName = country.name.official;
            const population = country.population;

            document.getElementById("country_fullname").innerText = fullName;
            document.getElementById("country_population").innerText = population;
            document.getElementById("country_capital").innerText = capital;

            map.panTo(country.latlng, {animate: true, duration: 2.0});
           
        }
        
        console.log(res);
    });
    
};

$generateButton.addEventListener("click", () => {
    fetch('https://randomuser.me/api/')
    .then((res) => res.json())
    .then((res) => {
        const id = res.results[0];
        if (id) {

            const newName = id.name.first + " " + id.name.last;
            const email = id.email;
            const avatar = id.picture.medium;
           


            document.getElementById("new_name").innerText = newName;
            document.getElementById("new_eamil").innerText = email;
            document.getElementById("new_picture").src = avatar;

        }
        console.log(res);
    });
});



  $addTask.addEventListener("click", () => {
    const newTask = $newTaskInput.value;
    $newTaskInput.value = "";
    const listElement = document.createElement("li");
    listElement.classList.add("task");
    listElement.innerText = newTask;
    $taskList.append(listElement);
    const tasksFromLS = localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
    console.log(tasksFromLS);
    tasksFromLS.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasksFromLS));
  });
  
  $taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("task")) {
      const taskToDelete = e.target.innerText;
      e.target.remove();
      const tasksFromLS = localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
      const tasksAfterDelete = tasksFromLS.filter(
        (task) => task !== taskToDelete
      );
      localStorage.setItem("tasks", JSON.stringify(tasksAfterDelete));
    }
  });
  
  $loadTasks.addEventListener("click", () => {
    if ($taskList.childNodes.length === 0) {
      const tasksFromLS = localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
  
      tasksFromLS.forEach((taskText) => {
        const listElement = document.createElement("li");
        listElement.classList.add("task");
        listElement.innerText = taskText;
        $taskList.append(listElement);
      });
    }
  });

$logout.addEventListener("click", logout);
$countryButton.addEventListener("click", searchCountry);

