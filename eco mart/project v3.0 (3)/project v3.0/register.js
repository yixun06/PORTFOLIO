
function checkUserInput(){  
  const registration_form = document.querySelector("#registration-form");
  const password = document.querySelector("#password").value;
  const regex = /\d+/;
  const specialCharactersRegex = /[!@#$%^&*()_+=[{}|;':\",./<>?~`\\]/g;

  if(password.length < 8){
    alert("The password must at least 8 characters.");
    
    registration_form.addEventListener("submit", function(event){
      event.preventDefault();
    }, {once:true});
  }

  if(password.length > 20){
    alert("The password must at most 20 characters.");
    
    registration_form.addEventListener("submit", function(event){
      event.preventDefault();
    }, {once:true});
  }

  if(!(regex.test(password))){
    alert("The password must include at least one number.");
    
    registration_form.addEventListener("submit", function(event){
      event.preventDefault();
    }, {once:true});
  }

  if(!(specialCharactersRegex.test(password))){
    alert("The password must include at least one special character.");

    registration_form.addEventListener("submit", function(event){
      event.preventDefault();
    }, {once:true});
  }
}