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
}

document.querySelector("#logout").addEventListener('click', e => {
    e.preventDefault();

    session.destroySession();
    window.location.href = '/'
})