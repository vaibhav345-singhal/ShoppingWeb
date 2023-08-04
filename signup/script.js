const signUp = document.querySelector('#signup');

let users = [];

if(window.localStorage.getItem('user')) users = JSON.parse(window.localStorage.getItem('user'));

const addUser = () => {
    const firstName = document.querySelector('.firstname').value;
    const lastName = document.querySelector('.lastname').value;
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    const confirmPassword = document.querySelector('.confirm__password').value;

    if(password != confirmPassword) {
        alert('Incorrect password');
        return;
    }

    users.push({"FirstName":firstName,"LastName":lastName,"Email":email,"Password":password});
    window.localStorage.setItem("user",JSON.stringify(users));

    document.querySelector('.firstname').value = "";
    document.querySelector('.lastname').value = "";
    document.querySelector('.email').value = "";
    document.querySelector('.password').value = "";
    document.querySelector('.confirm__password').value = "";
}

signUp.addEventListener("click",addUser);

document.querySelector('.home').addEventListener('click',() => {
    window.location.assign('../index.html');
})

document.querySelector('.mycart').addEventListener('click',()=> {
    alert('please login')
})

document.querySelector('.profile').addEventListener('click',()=> {
    window.location.assign('../profile/index.html');
})

document.querySelector('.signup').addEventListener('click',()=> {
    window.location.assign('../signup/index.html');
})

document.querySelector('.login').addEventListener('click',()=> {
    window.location.assign('../login/index.html');
})

