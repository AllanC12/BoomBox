import { User } from "../../../interfaces/User";

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
const btnRedirectLogin = document.querySelector(".link-login") as HTMLElement;
const btnRegister = document.getElementById("btnRegister") as HTMLInputElement;
const titlePageRegister: string = document.title;

class Register {
   defineRoute(page: string) {
    location.href = location.href.replace("register", page);
  }

  protected accessDenied(target: HTMLInputElement) {
    target.style.setProperty("border", "2px solid red");
  }

  protected accessAccepted() {
    const listInput: HTMLInputElement[] = [
      inputEmailElement,
      inputPasswordElement,
      inputConfirmPasswordElement,
      inputUrlPhotoElement,
    ];
    listInput.forEach((inputElement) => {
      inputElement.style.setProperty("border", "2px solid #287a33");
    });
  }

   protected validateRegister(): boolean {
    if (inputEmailElement.value === "") {
      this.accessDenied(inputEmailElement);
      return false;
    } else if (
      inputPasswordElement.value !== inputConfirmPasswordElement.value
    ) {
      this.accessDenied(inputConfirmPasswordElement);
      return false;
    } else {
      this.accessAccepted();
      return true;
    }
  }

  protected async postData(data: object,url: string) {  
    await fetch(url,{
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  async sendDataUser() {
    const registerValidated = this.validateRegister();
    let message: string;

    if(registerValidated){
      const urlServer = `http://localhost:3004/users`

      const dataUser: User = {
        email: inputEmailElement.value,
        password: inputPasswordElement.value,
        confirmPassword: inputConfirmPasswordElement.value,
        urlPhoto: inputUrlPhotoElement.value !== '' ? inputUrlPhotoElement.value : null
      }


      this.postData(dataUser,urlServer)
     
    }else{
      message = `Verifique os dados registrados`
    }
  }
}
const register = new Register();

btnRedirectLogin!.addEventListener("click", () => {
  register.defineRoute("login");
});

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();
  register.sendDataUser()
});
