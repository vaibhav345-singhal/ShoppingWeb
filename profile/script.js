//const { func } = require("prop-types");

// Write your script here
function SaveProfile() {
    const users = JSON.parse(window.localStorage.getItem('user'));
    const curUser = JSON.parse(window.localStorage.getItem('currentUser'))
    
    if(curUser == null || Object.keys(curUser).length == 0) {
        alert("Login Please");
        return;
    }

    let updatedUser = [];
    users.forEach((u) => {
        if(u.Email === curUser.username) {
            const firstName = document.querySelector('.first').value;
            const lastName = document.querySelector('.last').value;
            
            const newUser = {
                "FirstName" : firstName,
                "LastName": lastName,
                "Email":u.Email,
                "Password":u.Password
            }
            updatedUser.push(newUser);
        }
        else {
            updatedUser.push(u);
        }
    })
    window.localStorage.setItem('user',JSON.stringify(updatedUser));
    document.querySelector('.first').value = "";
    document.querySelector('.last').value = "";
}

function editProfile() {
    const users = JSON.parse(window.localStorage.getItem('user'));
    const curUser = JSON.parse(window.localStorage.getItem('currentUser'))
    
    if(curUser == null || Object.keys(curUser).length == 0) {
        alert("Login Please");
        return;
    }

    let updatedUser = [];
    users.forEach((u) => {
        if(u.Email === curUser.username) {

            const oldPassword = document.querySelector('.oldpass').value;
            const newPassword = document.querySelector('.newpass').value;
            const confirmPassword = document.querySelector('.confirmNewpass').value;
            console.log(oldPassword,newPassword,confirmPassword);
            let check1 = true;
            let check2 = true;

            if(oldPassword != u.Password) {
                alert("wrong passowrd");
                check1 = false;
            }

            if(newPassword != confirmPassword) {
                alert("reenter new password");
                check2 = false;
            }

            const newUser = {
                "FirstName" : u.FirstName,
                "LastName": u.LastName,
                "Email":u.Email,
                "Password":newPassword
            }
            const newCurUser = {
                "username":u.Email,
                "password":newPassword
            }
            if(check1 && check2){
                window.localStorage.setItem('currentUser',JSON.stringify(newCurUser));
            }
            check1 && check2 ? updatedUser.push(newUser) : updatedUser.push(u);
        }
        else {
            updatedUser.push(u);
        }
    })
    window.localStorage.setItem('user',JSON.stringify(updatedUser));
    document.querySelector('.oldpass').value = "";
    document.querySelector('.newpass').value = "";
    document.querySelector('.confirmNewpass').value = "";

}

function logoutUser() {
    window.localStorage.setItem('currentUser',JSON.stringify(null));
    alert("logged out");
}

document.querySelector('.saving').addEventListener('click',() => SaveProfile());
document.querySelector('.edit__btn').addEventListener('click',() => editProfile());
document.querySelector('.logout__btn').addEventListener('click',() => logoutUser());