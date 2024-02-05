import { IUser } from "../../../interfaces/User";
import {getProfilePhoto, accessAccepted,accessDenied,changeVisibilityPassword } from "../formConfigs/formConfig.js";

const formRegister = document.querySelector('.form-register') as HTMLFormElement;
const inputEmailElement = document.getElementById(
  "inputEmail"
) as HTMLInputElement;
const inputPasswordElement = document.getElementById(
  "inputPassword"
) as HTMLInputElement;
const inputConfirmPasswordElement = document.getElementById(
  "inputConfirmPassword"
) as HTMLInputElement;
const inputUrlPhotoElement = document.getElementById(
  "inputUrlPhoto"
) as HTMLInputElement;
const btnRedirectLogin = document.querySelector(".link-login") as HTMLElement
const visibilityPassword = document.getElementById('visibility-password') as HTMLElement;
const showPassword = document.getElementById('show-password') as HTMLElement
const hidePassword = document.getElementById('hide-password') as HTMLElement
const profilePhotoElement = document.getElementById(
  "profile-photo"
) as HTMLElement;
const profilePhotoChildren = profilePhotoElement.children as HTMLCollection

const listInput: HTMLInputElement[] = [
  inputEmailElement,
  inputPasswordElement,
  inputConfirmPasswordElement,
  inputUrlPhotoElement,
];


class Register{
  defineRoute(page: string) {
    location.href = location.href.replace("register", page);
  }

  protected validateRegister(): boolean {
    if (inputEmailElement.value === "") {
      accessDenied(inputEmailElement);
      return false;
    } else if (
      inputPasswordElement.value === "" ||
      inputConfirmPasswordElement.value === ""
    ) {
      accessDenied(inputConfirmPasswordElement);
      return false;
    } else if (
      inputPasswordElement.value !== inputConfirmPasswordElement.value
    ) {
      accessDenied(inputConfirmPasswordElement);
      return false;
    } else {
      accessAccepted(listInput);
      return true;
    }
  }

  private async postData(data: object, url: string) {
    try { 
      await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error:any) {
      throw new Error(error)
    }

  }

  public async sendDataUser() {
    const registerValidated: boolean = this.validateRegister();
    const urlServer: string = `http://boomboxapi.glitch.me/users`;

    const dataUser: IUser = {
      email: inputEmailElement.value,
      password: inputPasswordElement.value,
      confirmPassword: inputConfirmPasswordElement.value,
      urlPhoto: inputUrlPhotoElement.value === null ?  '' : inputUrlPhotoElement.value,
    };
    

    if (registerValidated) {
      try {
        await this.postData(dataUser, urlServer);
        getProfilePhoto(dataUser.urlPhoto,profilePhotoElement,profilePhotoChildren)
      } catch (error) {
        console.log(error)
      }
    } else {
      throw new Error("Verifique os dados preenchidos!");
    }
  }
}
const register = new Register();

visibilityPassword.addEventListener('click',() => {
    changeVisibilityPassword(inputPasswordElement,showPassword,hidePassword)
})

btnRedirectLogin!.addEventListener("click", ():void => {
  register.defineRoute("login");
});

formRegister!.addEventListener("submit", (e:SubmitEvent):void => {
  e.preventDefault();
  register.sendDataUser();
  setTimeout(() => {
    register.defineRoute("login")
  },2000)
});



 
