import { IUser } from "../../../interfaces/User.js";
import { insertBoxMsg,accessAccepted,accessDenied,changeVisibilityPassword,handleLoader } from "../formConfigs/formConfig.js";

const titlePagelogin:string = document.title
const formELement = document.getElementById('form-login') as HTMLFormElement;
const emailElement = document.getElementById("email") as HTMLInputElement;
const passwordElement = document.getElementById("password") as HTMLInputElement;
const inputListElement = [emailElement,passwordElement] as Array<HTMLInputElement>;
const btnRedirectRegister = document.querySelector(".link-register") as HTMLElement;
const visibilityPassword = document.getElementById('visibility-password') as HTMLElement;
const showPassword = document.getElementById('show-password') as HTMLElement
const hidePassword = document.getElementById('hide-password') as HTMLElement
const boxMessage = document.getElementById('msg-user-login') as HTMLElement
const loader = document.getElementById('loader') as HTMLElement
let dataUserLogin: Array<IUser>;

class Login{
  
  public defineRoute(page:string) {
    location.href = location.href.replace(titlePagelogin.toLowerCase(),page)
  }

  private validateLoginUser(dataUser: Array<IUser>){
    if(dataUser.length === 0){
      insertBoxMsg('Email não cadastrado',boxMessage)
      accessDenied(emailElement)
      return false
    }else if(dataUser[0].password !== passwordElement.value){
      insertBoxMsg('Senha incorreta',boxMessage)
      accessDenied(passwordElement)
      return false
    }else{
      insertBoxMsg('Bem vindo!',boxMessage)
      accessAccepted(inputListElement)
      return true
    }
  }
  
 public async getLoginUser(){
    const urlServer: string = `http://boomboxapi.glitch.me/users`
    try {
      dataUserLogin = await fetch(`${urlServer}?email=${emailElement.value}`).then(resp => resp.json())
      const dataLoginValidated: boolean = this.validateLoginUser(dataUserLogin)
      if(dataLoginValidated){
        this.defineRoute("home");
      }
    } catch (error:any) {
      throw new Error(error)
    }
  }
} 
const login = new Login();

formELement.addEventListener('submit',(e:SubmitEvent):void => {
  e.preventDefault()
  handleLoader(loader,'show')
  login.getLoginUser()
})

visibilityPassword.addEventListener('click',() => {
  changeVisibilityPassword(passwordElement,showPassword,hidePassword)
})

btnRedirectRegister!.addEventListener('click', () => {
    login.defineRoute('register');
})


