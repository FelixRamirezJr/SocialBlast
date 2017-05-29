export function isLoggedIn(user_id,json){


}

export function saveUser(){

}

export function simple(){
  return "Simple";
}

export function userKey(){
  return '@user:key';
}
export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function saveFacebookData(user_id,fb_email,fb_name,fb_token){
     fetch('https://social-blast-api.herokuapp.com/users/set_facebook_basic_info', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         id: user_id,
         fb_email: fb_email,
         fb_name: fb_name,
         token: fb_token
       })
     }).then((response) => response.json())
       .then((responseJson) => {
          return responseJson.email;
     });
  }
