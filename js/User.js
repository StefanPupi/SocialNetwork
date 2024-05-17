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

    loginUser(){
        fetch(this.api_url+'/users')
        .then(response => response.json())
        .then(data => {
            data.forEach(db_user => {
                if(db_user.email === this.email && db_user.password === this.password){
                    let session = new Session();
                    session.user_id = db_user.id
                    session.createSession();
                    window.location.href = 'mirror.html'
                    return;
                }
            })
        })
    }

    async getUser(user_id){
        let api_url = this.api_url + '/users/' + user_id;

        let response = await fetch(api_url);
        let data = await response.json();
        return data;
        }

    editUser(){
        let data = {
            username: this.username,
            email: this.email,
            password: this.password
        };

        data = JSON.stringify(data);

        let session = new Session();
        session_id = session.getSession();

        fetch(this.api_url + '/users/' + session_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'mirror.html'
        })
    }

    deleteUser(){
        let session = new Session();
        session_id = session.getSession();

        fetch(this.api_url + '/users/' + session_id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            let session = new Session();
            session.destroySession();

            window.location.href = '/' 
        })
    }
}
