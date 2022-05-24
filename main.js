fetch("https://reqres.in/api/users/")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
  });
