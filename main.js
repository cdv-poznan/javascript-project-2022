fetch('https://reqres.in/api/users')
.then(response => response.json())
.then(json => {
    console.log(json.data);
    const markup = json.data.map( el =>{
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

    document.querySelector('.team-container').innerHTML = markup;
})