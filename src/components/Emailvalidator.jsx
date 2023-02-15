    //  this function for validating email
 export const validateEmail = (email) => {
        const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return pattern.test(email);
      };

      //  this function is for validating password 
export const validatePassword = (password) => {
   
    if(password.length < 8){
        return "password Should Contain  8 Characters"
     }
    if(/[A-Z]/.test(password)===false){
       return "Password Should Contain  Capital Letter"
    }
     if(/\d/.test(password)===false){
        return "Password Should Contain Number"
     }

     if(/_/.test(password)===false){
        return "Password Should Contain Underscore"
     }
    
}