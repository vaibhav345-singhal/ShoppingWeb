const login = document.querySelector('.login__btn');
const signup = document.querySelector('.signup__btn');
let users = [{"username":"mm","password":"mm"}];

login.addEventListener('click',() => {userLogin()});
signup.addEventListener('click',() =>{userSignup()});


function userLogin() {
    window.location.assign('./login/index.html');
}

function userSignup() {
    window.location.assign('./signup/index.html');
}

//navbar navigation

document.querySelector('.home').addEventListener('click',() => {
    window.location.assign('./index.html');
})

document.querySelector('.mycart').addEventListener('click',()=> {
    alert("please Login");
})

document.querySelector('.profile').addEventListener('click',()=> {
    window.location.assign('./profile/index.html');
})

document.querySelector('.signup').addEventListener('click',()=> {
    window.location.assign('./signup/index.html');
})

document.querySelector('.login').addEventListener('click',()=> {
    window.location.assign('./login/index.html');
})
