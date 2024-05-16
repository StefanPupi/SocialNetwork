let session = new Session();
session = session.getSession();

if(session != ""){
    window.location.href = "mirror.html";
}

document.getElementById("registerbutton").addEventListener('click',()=>{
    document.querySelector(".registerform").style.display = 'block';
})

document.getElementById("cancelbutton").addEventListener('click', ()=>{
    document.querySelector(".registerform").style.display = 'none';
})

document.getElementById("register").addEventListener('click',e=>{
    let userName = document.querySelector('#username').value;
    let email = document.querySelector("#emailReg").value;
    let password = document.querySelector('#passwordReg').value;
    let passwordConfirm = document.querySelector('#passwordconfirm').value;
    e.preventDefault();
    alert(Validate(userName,email,password,passwordConfirm));
    if(Validate(userName,email,password,passwordConfirm)=="Registration successful!"){
        let user = new User();
        user.username = userName;
        user.email = email;
        user.password = password;
        user.create();
    }
})

document.querySelector("#loginForm").addEventListener('submit', e => {
    e.preventDefault();
    let email = document.querySelector("#email").value
    let password = document.querySelector("#password").value

    let user = new User();
    user.email = email;
    user.password = password;
    user.loginUser();
})

function Validate(userName,email,password,passwordConfirm){
    let numOfErrors = 0;
    let errors = "";
    if(userName.length<5){
        errors+="Check username! "
        numOfErrors++;
    }
    if(email.length<10){
        errors+="Check e-mail! "
        numOfErrors++;
    }
    if(password.length<8){
        errors+="Check password! "
        numOfErrors++;
    }
    if(password!=passwordConfirm){
        errors+="Passwords do not match! "
        numOfErrors++;
    }
    if(numOfErrors==0){
        return "Registration successful!";
    }
    return errors;
}