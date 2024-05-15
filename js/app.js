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
    console.log(userName+email+password+passwordConfirm);
    e.preventDefault();
    if(Validate(userName,email,password,passwordConfirm)){
        alert("Uspesno ste se registrovali!");
    }
    else{
        alert("Proverite podatke!");
    }
})

function Validate(userName,email,password,passwordConfirm){
    let numOfErrors = 0;
    if(userName.length<5){
        numOfErrors++;
    }
    if(email.length<10){
        numOfErrors++;
    }
    if(password.length<8){
        numOfErrors++;
    }
    if(password!=passwordConfirm){
        numOfErrors++;
    }
    if(numOfErrors>0){
        return false;
    }
    return true;
}