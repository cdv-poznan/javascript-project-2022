const $loginButton = document.getElementById('menu_login');
const $loginPopup = document.getElementById('login_popup');
const $loginLogin = document.getElementById('login_login')
const $loginCancel = document.getElementById('login_cancel');

const $viewCommentsButton = document.getElementById('view_comments');
const $hiddenComments = document.getElementById('hidden_section');

const $submitCommentButton = document.getElementById('new_comment_submit');
const $commentAvatarA = document.getElementById('avatar_a');
const $commentAuthorA = document.getElementById('comment_author_a');
const $commentAuthorAgeA = document.getElementById('author_age_a');

const $commentAvatarB = document.getElementById('avatar_b');
const $commentAuthorB = document.getElementById('comment_author_b');
const $commentAuthorAgeB = document.getElementById('author_age_b');

const $commentAvatarC = document.getElementById('avatar_c');
const $commentAuthorC = document.getElementById('comment_author_c');
const $commentAuthorAgeC = document.getElementById('author_age_c');

const $commentAvatarD = document.getElementById('avatar_d');
const $commentAuthorD = document.getElementById('comment_author_d');
const $commentAuthorAgeD = document.getElementById('author_age_d');



$loginButton.addEventListener('click', () => {
    $loginPopup.style.display = 'block';
});

$loginCancel.addEventListener('click', () => {
    $loginPopup.style.display = 'none';
});

// nie jest to piękne ale działa ¯\_(ツ)_/¯

$viewCommentsButton.addEventListener('click', () => {
    $hiddenComments.style.display = 'block';
    $viewCommentsButton.style.display = 'none';

    fetch('https://randomuser.me/api/?results=4')
    .then((res) => res.json())
    .then((res) => {
        const identityA = res.results[0];
        const identityB = res.results[1];
        const identityC = res.results[2];
        const identityD = res.results[3];

        if (identityA) {
       
            $commentAuthorA.innerText = identityA.name.first;
            $commentAuthorAgeA.innerText = identityA.dob.age;
            $commentAvatarA.src = identityA.picture.large;  
        };
        
        if (identityB) {
       
            $commentAuthorB.innerText = identityB.name.first;
            $commentAuthorAgeB.innerText = identityB.dob.age;
            $commentAvatarB.src = identityB.picture.large;  
        };

        if (identityC) {
       
            $commentAuthorC.innerText = identityC.name.first;
            $commentAuthorAgeC.innerText = identityC.dob.age;
            $commentAvatarC.src = identityC.picture.large;  
        };

        if (identityD) {
       
            $commentAuthorD.innerText = identityD.name.first;
            $commentAuthorAgeD.innerText = identityD.dob.age;
            $commentAvatarD.src = identityD.picture.large;  
        };


        console.log(res);
    });
});

$submitCommentButton.addEventListener('click', (e) => {
    alert('Ale by było jakby działało');
});

$loginLogin.addEventListener('click', (e) => {
    alert('Powiedzmy, że jesteś zalogowany');
});
