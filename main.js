const $random_button = document.getElementById("random_button");
//const $imgRandom = document.getElementsByClassName("img_random");

const $Youtube_link = document.getElementById("Youtube_link");

$random_button.addEventListener("click", () => {
    for(let i=0;i<3;i++){
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      const strSource = res.meals[0].strMealThumb;
      const newTitle = res.meals[0].strMeal;
      document.getElementsByClassName("new_title")[i].innerText = newTitle;
      document.getElementsByClassName("img_random")[i].src = strSource;
      
    });
    }
});
