import axios from "axios";

const api_url = 'http://localhost:8080/';

class AuthService {
    login(user){
        return axios.post(api_url + 'login',{
            username : user.name,
            password : user.password
        })
        .then(response => {
            if(response.data.accessToken){
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        })
    }

    logout(){
        localStorage.removeItem('user');
    }

    register(){
        return axios.post(API_URL + 'register', {
            username: user.name,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService;