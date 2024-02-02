import { accessAccepted,accessDenied } from "../register/register.js";

const btnRedirectRegister = document.querySelector(".link-register") as HTMLElement;
const titlePagelogin:string = document.title
const emailElement = document.getElementById("emal") as HTMLInputElement;
const passwordELement = document.getElementById("password") as HTMLInputElement;

class Login{
  
  defineRoute(page:string) {
    location.href = location.href.replace(titlePagelogin.toLowerCase(),page)
  }
  
  getLogin(){
    const urlServer: string = `http://boomboxapi.glitch.me/users`
    
  }
} 
const login = new Login();

console.log(accessAccepted)

btnRedirectRegister!.addEventListener('click', () => {
    login.defineRoute('register');
})


