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

document.querySelector("#postForm").addEventListener('submit', e => {
    e.preventDefault();

    async function createPost(){
        let content = document.querySelector("#postContent").value
        document.querySelector("#postContent").value = ""
        let post = new Post();
        post.post_content = content
        post = await post.create();
        
        let currentUser = new User();
        currentUser = await currentUser.getUser(session_id)

        let delPostHTML = '';

        if(session_id === post.user_id){
            delPostHTML = `<button class="deletePostButton" onclick="removeMyPost(this)">Remove</button>`
        }

        let html = document.querySelector("#allposts").innerHTML

        document.querySelector("#allposts").innerHTML = 
        `<div class="post" id="${post.id}">
            <div class="postcontent">
                ${post.content}
            </div>
            <div class="interactions">
                <p>Author: ${currentUser.username}</p>
                <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> Likes</button>
                ${delPostHTML}
            </div>
            <div class="comments">
                <form>
                    <input placeholder="Type comment" type="text">
                    <button onclick="commentPostSubmit(event)" id="buttonComment">Comment</button>
                </form>
            </div>
        </div>` + html;
    }

    createPost();
})

async function getAllPosts(){
    let allPosts = new Post()
    allPosts = await allPosts.getAllPosts();
    
    allPosts.forEach(post => {
        async function getPostuser(){
        let user = new User();
        user = await user.getUser(post.user_id);

        let html = document.querySelector("#allposts").innerHTML;

        let delPostHTML = '';

        if(session_id === post.user_id){
            delPostHTML = `<button class="deletePostButton" onclick="removeMyPost(this)">Remove</button>`
        }

        document.querySelector("#allposts").innerHTML = 
        `<div class="post" id="${post.id}">
        <div class="postcontent">
            ${post.content}
        </div>
        <div class="interactions">
            <p>Author: ${user.username}</p>
            <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span> Likes</button>
            ${delPostHTML}
        </div>
        <div class="comments">
            <form>
                <input placeholder="Type comment" type="text">
                <button onclick="commentPostSubmit(event)" id="buttonComment">Comment</button>
            </form>
        </div>
    </div>` + html;
}
getPostuser();
});
}
getAllPosts();

const removeMyPost = btn => {
    let post_id = btn.closest('.post').getAttribute('id')

    btn.closest('.post').remove()

    let post = new Post()
    post.delete(post_id)
}

const likePost = btn => {
    let post = btn.closest('.post')
    let post_id = post.getAttribute('id')
    let numOfLikes = parseInt(btn.querySelector('span').innerText)

    btn.querySelector('span').innerText = numOfLikes + 1
    btn.setAttribute('disabled', true)

    let likedPost = new Post()
    likedPost.like(post_id, numOfLikes + 1)
}