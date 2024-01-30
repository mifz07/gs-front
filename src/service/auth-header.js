export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      return { 
        // ContentType : 'Application/json',
        Accept: 'Application/json',
        Authorization: 'Bearer ' + user.accessToken 
      };
    } else {
      return {};
    }
}