class Session{
    user_id = '';

    createSession(){
        const date = new Date();
        date.setTime(date.getTime() + (2*24*60*60*1000));
        let expires = "expires" + date.toUTCString();
        document.cookie = "user_id=" + this.user_id + ";" + expires;
    }

    getSession(){
        let name = 'user_id=';
        let ca = document.cookie.split(';');

        for(let i=0;i<ca.length;i++){
            let c = ca[i];
            while(c.charAt(0) == ' '){
                c= c.substring(1);
            }
            if(c.indexOf(name)==0){
                return c.substring(name.length,c.length);
            }
        }
        return "";
    }

    destroySession(){
        let cookies = document.cookie.split(';');
        for(let i=0;i<cookies.length;i++){
            let cookie = cookies[i]
            let equalPosition = cookie.indexOf('=')
            let name = equalPosition > -1 ? cookie.substr(0,equalPosition) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}