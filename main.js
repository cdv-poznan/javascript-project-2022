fetch("https://reqres.in/api/users/")
  .then(response => response.json())
  .then(json => {
    console.log(json.data);
    const html = json.data.map(user => {
      return `
        <div class="contact">
                <img class="image" src="${user.avatar}">
            <div class="first-last-container">
                <span class="material-symbols-outlined icons-color">account_circle</span>
                <span class="first-name">${user.first_name}</span>
                <span class="last-name">${user.last_name}</span>
            </div> 
            <p class="email-container">
                <span class="material-symbols-outlined icons-color">mail</span> 
                <span class="email">${user.email}</span>
            </p>
         </div>
        `;
    });
    document.querySelector('.contact-list').innerHTML = html.join('');
  });
