export function userKey(){
  return '@user:key';
}
export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function uppercaseFirst(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

/*  Facebook Functions  */
export function saveFacebookData(user_id,fb_email,fb_name,fb_user_id,fb_token){
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
         fb_user_id: fb_user_id,
         token: fb_token
       })
     }).then((response) => response.json())
       .then((responseJson) => {
          return responseJson.email;
     });
  }

  export function blastToFacebook(user_id,token,message){
    console.log("Test");
    fetch('https://graph.facebook.com/' + user_id + "/feed", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        access_token: token,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log( JSON.stringify(responseJson) );
         //this.setUser( String(responseJson.id) );
         return "Okay";
    }).catch(function(error){
      console.log(error.message);
    });
  }
