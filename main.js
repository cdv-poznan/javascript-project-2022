const $loginButton = document.getElementById('menu_login');
const $loginPopup = document.getElementById('login_popup');
const $loginCancel = document.getElementById('login_cancel');

$loginButton.addEventListener('click', () => {
    $loginPopup.style.display = 'block';
})

$loginCancel.addEventListener('click', () => {
    $loginPopup.style.display = 'none';
})