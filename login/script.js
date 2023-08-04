const login = document.querySelector('.login__btn');
let users = JSON.parse(localStorage.getItem('user'));
console.log(users);

login.addEventListener('click',() => {userLogin()})

function userLogin() {
    const user = {
        "username" : document.querySelector('.mail').value,
        "password" : document.querySelector('.pass').value
    }
    let flag = false;

    users.forEach((u) =>{
        if(u.Email === user.username && u.Password === user.password) {
            flag = true;
            window.localStorage.setItem('currentUser',JSON.stringify(user));
        } 
    })
    flag ? window.location.assign('../shop/index.html'): alert("Invalid details")
}

document.querySelector('.home').addEventListener('click',() => {
    window.location.assign('../index.html');
})

document.querySelector('.mycart').addEventListener('click',()=> {
    alert("please Login");
})

document.querySelector('.profile').addEventListener('click',()=> {
    window.location.assign('../profile/index.html');
})

document.querySelector('.signup').addEventListener('click',()=> {
    window.location.assign('../signup/index.html');
})

document.querySelector('.login').addEventListener('click',()=> {
    window.location.assign('./index.html');
})