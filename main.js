fetch("https://reqres.in/api/users/")
  .then((response) => response.json())
  .then((json) => {
    console.log(json.data);
    const html = json.data.map((user) => {
      return `
        <div class="contact">
                <img class="image" src="${user.avatar}">
            <div class="name">
                <span class="id">${user.id}</span>
                <span class="firstName">${user.first_name}</span>
                <span class="lastName">${user.last_name}</span>
            </div>
            <p class="email">${user.email}</p>
         </div>
        `;
    });
    document.querySelector('.contact-list').innerHTML = html.join('');
  });
