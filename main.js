const contactList = document.querySelector('.contact-list');
const searchBar = document.querySelector('.search-bar');
let contactArray = [];

searchBar.addEventListener('keyup', (e) => {
    const searchInput = e.target.value.toLowerCase();
    const filteredContact = contactArray.filter(user => {
      return user.first_name.toLowerCase().includes(searchInput)

    });
    displayContact(filteredContact);
});

fetch("https://reqres.in/api/users/")
  .then(response => response.json())
  .then(json => {
    contactArray = json.data;
    console.log(contactArray);
    displayContact(contactArray);
  });

  const displayContact = (contacts) => {
    const html = contacts.map(user => {
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
  contactList.innerHTML = html.join('');
};

