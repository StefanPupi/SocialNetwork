class User{
    user_id = '';
    username = '';
    email = '';
    password = '';
    api_url = 'https://6645e2c3b8925626f8939a61.mockapi.io';

    create(){
        let data = {
            username: this.username,
            email: this.email,
            password: this.password
        }

        data= JSON.stringify(data);

        fetch(this.api_url + '/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:data
        })
        .then(response => response.json())
        .then(data => {
            let session = new Session()
            session.user_id = data.id;
            session.createSession();
            window.location.href = 'mirror.html'
        })
    }

    
}