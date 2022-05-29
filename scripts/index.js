const $login = document.getElementById("login_input");
const $Password = document.getElementById("password_input");
const $loginButton = document.getElementById("login_button");
const $loginError= document.getElementById("login_error");
//https://login-service-wsb-wj.netlify.app/.netlify/functions/login

/*
const loginHandler = async () => {
    const password = $Password.value;
    const login = $login.value;

   const response = await fetch('https://login-service-wsb-wj.netlify.app/.netlify/functions/login', {
        method: "POST",
        body: JSON.stringify({

            login,
            password,

        }),
    });

    const responseParsed = await response.json();

    if (response.isLogged) {
        window.location.href = "./mainScreen.html";
    } else {
        $loginError.classList.remove("not_visible");
    }

};
*/

const loginHandler = () => {
    const password = $Password.value;
    const login = $login.value;

    fetch('https://login-service-wsb-wj.netlify.app/.netlify/functions/login', {
        method: "POST",
        body: JSON.stringify({

            login,
            password,

        }),
    })

    .then((Response)=>Response.json())
    .then((Response)=>{
        console.log(Response);
        if (Response.isLogged) {
            localStorage.setItem("isLoggedIn", "yes");
            window.location.href = "./mainScreen.html";
        } else {
            $loginError.classList.remove("not_visible");
        }
});
};


$loginButton.addEventListener("click", loginHandler);