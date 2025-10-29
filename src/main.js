


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import '@fortawesome/fontawesome-free/css/all.min.css'
import './style.css'
import { animate } from 'motion';




var userNameField = document.querySelector('.user-name-field')
var userName = document.getElementById('user-name');
var userEmail = document.getElementById('user-email');
var userPassword = document.getElementById('password');
var btnSignUp = document.querySelector('button#sign-up');

var themeBtn = document.querySelector('div.theme');

var h2 = document.querySelector('h2')

var btnLogin = document.querySelector('button#login');



var userNameRegex = /^[a-zA-Z][\w]{1,}$/;
var emailRegex = /^[a-zA-Z][\w\.]{1,}@[a-zA-z]+(\.[a-zA-Z]+)+$/;
var passwordRegex = /^[\w]{6,}$/;

// initial states ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// set banner div to be ready when needing it to inform user info or instruction
var banner = document.createElement('div')
  banner.classList.add(...'position-absolute top-0 p-1 banner'.split(' '));

// chech if the tap was logged in before
var loggedInUser = getLoggedUser();
// dispaly the home section if the user   logged in 
loggedInBefore()

// set default to login ++++++++++++++++++++++++++++++++++

    btnLogin.classList.remove('not-active')
    btnLogin.classList.add('btn','btn-info')

    btnSignUp.classList.add('not-active');
    btnSignUp.classList.remove('btn','btn-info');
 
   
    animate(userNameField,{height:0,opacity:0},{duration:0,ease:'linear'})

    // animating changing h2 content
    h2.textContent = 'log in'

    // -------------------------------------------------

    // set theme 
    if(localStorage.getItem('theme') != 'dark') document.body.classList.add('dark')
// --------------------------------------------------------------------------------------------------------------


// toggle between log in and sign up +++++++++++++++++++++++++++++++
btnLogin.addEventListener('click',function(event){
  
  if(event.target.classList.contains('not-active')){

    resetLogic()

    event.target.classList.remove('not-active')
    event.target.classList.add('btn','btn-info')

    btnSignUp.classList.add('not-active');
    btnSignUp.classList.remove('btn','btn-info');

    // animating delete user name field+++++++++++++++++++++++
    animate(userNameField,{x:200,opacity:0},{duration:0.3,ease:'linear'}).finished.then(()=>{
      animate(userNameField,{height:0},{duration:0.3,ease:'linear'})
    })

    // animating changing h2 content
    animate(h2,{x:100,opacity:0},{duration:0.3}).then(()=>{
      h2.textContent = 'log in'
     
        animate(h2,{x:0,opacity:1},{duration:0.3})
    })

    // userNameField.classList.add('d-none')
    // userNameField.classList.remove('d-block')



  }else{
     if(isValid(userEmail, emailRegex) & isValid(userPassword,passwordRegex)){

        console.log('valid input')

        if(checkUserNotExist(userEmail.value)){

      
          console.log('user not exist')
          addBanner("the user doesn't exist")


        }else{
          var userData = getLocal(userEmail.value)
          if(userPassword.value == userData.password ){

               localStorage.setItem('loggedInUser',JSON.stringify(userData.userName))
             
               loggedInUser = getLoggedUser();

               welcomePage()
            
          }else{
             console.log('wrong password')
          addBanner("wrong password")

          }
        }
      }else{
        addBanner('invalid inputs')

      }
  }
})


// sign up 
btnSignUp.addEventListener('click',function(event){


  if(event.target.classList.contains('not-active')){

  resetLogic()

    event.target.classList.remove('not-active')
    event.target.classList.add('btn','btn-info')

    btnLogin.classList.add('not-active');
    btnLogin.classList.remove('btn','btn-info');

    
     var sequences=[
      [userNameField,{height:100},{duration:0.3}],
      [userNameField,{x:0,opacity:1},{duration:0.3,ease:'linear'}]
     ]
      animate(sequences)
    //   .finished.then(()=>{
    //   animate(userNameField,{x:0,opacity:1},{duration:0.3,ease:'linear'})
    // })
 // animating changing h2 content
    animate(h2,{y:100,opacity:0},{duration:0.3}).then(()=>{
      h2.textContent = 'sign up'
     
        animate(h2,{y:0,opacity:1},{duration:0.3})
    })


  }else{

       // validation on the inputs
    if(isValid(userName,userNameRegex ) & isValid(userEmail , emailRegex )& isValid(userPassword,passwordRegex)){

        var newUser =  createUserObject(userName.value,userEmail.value,userPassword.value);

        if(checkUserNotExist(newUser.userEmail)){

        storeLocal(newUser);  //store the data of the new user
      
        addBanner('Adding a new user successfully')

        localStorage.setItem('loggedInUser',JSON.stringify(newUser.data.userName)) //make the user logged in
             
               loggedInUser = getLoggedUser(); //get the data  of the logged in

               welcomePage()  // redirect to home page of the logged

        }
        else{
        addBanner('the user is already exist')
        
          
          console.log('the user already exists')
        }

    }else{
        console.log('invalid inputs')
        addBanner('invalid inputs')

    }


  }
})

// ------------------------------------------------------


// create welcoe page

function welcomePage(){
   resetLogic()
  // remove the login 
        document.querySelector('header').classList.add('d-none')
            // animate('header',{opacity:0},{duration:0.1}).finished.then(()=>{
            //   ; })
        var section = document.createElement('section');

        
        section.classList.add("d-flex","flex-column","align-items-center","justify-content-center",'text-center')
              section.innerHTML=`
              <h3 class="text-capitalize">welcome ${loggedInUser}</h3>

             <button id="logout" class="btn btn-warning">logout</button> 
              
              `
              document.body.append(section)

                // add log out logic
              logout.addEventListener('click',function(){

                section.remove()
                deleteLoogedUser()
                document.querySelector('header').classList.replace('d-none','d-block');
                
                resetLogic()
                animate('header',{opacity:1},{duration:0.3})


              })

}

// delete logged in user when  log out

function deleteLoogedUser(){
  localStorage.removeItem('loggedInUser')
}

// reset all logic++++++++++++++++++++++++++++++
function resetLogic(){

  [userEmail,userName,userPassword].forEach(element=>{
    removeWranig(element);
    element.classList.remove('is-valid')

    element.value = null
  })
  
  banner.remove()
  
}
// --------------------------------------------------------------


// add new user successfylly banner ++++++++++++++++++++++++++++
function addBanner(note){
  
  banner.innerHTML = `
      <p class="">${note}</p>
  `
 
  document.body.prepend(banner)
 
  animate(banner,{opacity:[0,1]},{duration:0.3,type:'spring',stiffness:300})

}
// --------------------------------------------------------------------------



// check the user  logged in before ++++++++++
function loggedInBefore(){
  if(loggedInUser){
    welcomePage()
  }
}
// -------------------------------------------------

// get logged in user++++++++++++++++++++++++++++++++++

function getLoggedUser(){
  return (JSON.parse((localStorage.getItem('loggedInUser'))) || null)
}

// ------------------------------------------------------


// create new user+++++++++++++++++++++++++++++++++

function createUserObject(userName , email , password){

  return{
   userEmail:email,
    data:{
       userName:userName,
    password:password
    }
    
  }
}
// --------------------------------------------------------


// checking if the user already exists ++++++++++++++++++++++++++
function checkUserNotExist(userEmail){
  if (localStorage.getItem(userEmail) == undefined ) return true
   
  return false;
}
// --------------------------------------------------------------


// store new user to localStorage+++++++++++++++++++++++++++++++++++++++
function storeLocal(user){
  localStorage.setItem(user.userEmail,JSON.stringify(user.data))
}
// ----------------------------------------------------------------




// get data from localStorage
function getLocal(userEmail){
  return JSON.parse( localStorage.getItem(userEmail))
}
// validation on the user name++++++++++++++++++++++
userName.addEventListener('blur',function(event){
   

  isValid(event.target, userNameRegex)
})

// -------------------------------------------------------


// validation on the email ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
userEmail.addEventListener('blur',function(event){
   

 isValid(event.target, emailRegex)
})

// -----------------------------------------------------------------------------




// validation on the password ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
userPassword.addEventListener('blur',function(event){
   

  isValid(event.target, passwordRegex)
})

// -----------------------------------------------------------------------------



// validation
function isValid(target,regex){

 if(regex.test(target.value)) {
       removeWranig(target)
  return true

 }else{
     addWranig(target)

  return false
 }

  
}

function removeWranig(target){
   target.nextElementSibling.classList.add('opacity-0')
  target.nextElementSibling.classList.remove('opacity-100')

  target.classList.add('is-valid')
  target.classList.remove('is-invalid')
}

function addWranig(target){
   target.nextElementSibling.classList.add('opacity-100')
  target.nextElementSibling.classList.remove('opacity-0')

  target.classList.remove('is-valid')
  target.classList.add('is-invalid')
}


// animation +++++++++++++++++++++++++++++++++++++++++++++

// animate('header div button')





// dark mode 

themeBtn.addEventListener('click',(event)=>{
  document.body.classList.toggle('dark')

  if(document.body.classList.contains('dark' )){

    localStorage.setItem('theme','light');
    animate('div.theme i.fa-sun',{x:0 ,opacity:1},{duration:0.3})
    animate('div.theme i.fa-moon',{x:-20 , opacity:0},{duration:0.3
    })

    
   
  }else{

    animate('div.theme i.fa-sun',{x:20 , opacity:0},{duration:0.3})
    animate('div.theme i.fa-moon',{x:0 , opacity:1},{duration:0.3})
    localStorage.setItem('theme','dark') 

  }

  // animate theme icons



})

