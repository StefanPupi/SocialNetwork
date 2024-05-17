let session = new Session();
session_id = session.getSession();

if(session_id != ""){
    fillUserData();
}else{
    window.location.href = "/";
}

async function fillUserData(){
    let user = new User();
    user = await user.getUser(session_id);
    document.querySelector("#username").innerHTML = user['username']
    document.querySelector('#email').innerHTML = user['email']
    document.querySelector('#usernameEdit').value = user['username']
    document.querySelector('#emailEdit').value = user['email']
}

document.querySelector("#logout").addEventListener('click', e => {
    e.preventDefault();

    session.destroySession();
    window.location.href = '/'
})

document.getElementById("manageprofile").addEventListener('click',()=>{
    document.querySelector(".registerform").style.display = 'block';
})

document.getElementById("cancelbutton").addEventListener('click', ()=>{
    document.querySelector(".registerform").style.display = 'none';
})

document.querySelector("#formEdit").addEventListener('submit', e => {
    e.preventDefault();

    let user = new User()
    user.username = document.querySelector("#usernameEdit").value
    user.email = document.querySelector('#emailEdit').value
    if(document.querySelector("#passwordEdit").value === document.querySelector("#passwordEditConfirm").value){
        user.password = document.querySelector("#passwordEdit").value
        user.editUser()
    }
    else{
        alert("Passwords doesn't match!")
    }
})

document.querySelector('#deleteprofile').addEventListener('click', e => {
    e.preventDefault()

    let message = "You want to delete your profile? (THIS CAN'T BE UNDONE)";

    if(confirm(message) === true){
        let user = new User();
        user.deleteUser();
    }
})