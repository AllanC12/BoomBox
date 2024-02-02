import { IUser } from "../../../interfaces/User";
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


class Formulary {
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
}

class Register extends Formulary {
  defineRoute(page: string) {
    location.href = location.href.replace("register", page);
  }

  protected validateRegister(): boolean {
    if (inputEmailElement.value === "") {
      this.accessDenied(inputEmailElement);
      return false;
    } else if (
      inputPasswordElement.value === "" ||
      inputConfirmPasswordElement.value === ""
    ) {
      this.accessDenied(inputConfirmPasswordElement);
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

    if (registerValidated) {
      const dataUser: IUser = {
        email: inputEmailElement.value,
        password: inputPasswordElement.value,
        confirmPassword: inputConfirmPasswordElement.value,
        urlPhoto: inputUrlPhotoElement.value !== "" ? inputUrlPhotoElement.value : null,
      };
      await this.postData(dataUser, urlServer);
    } else {
      throw new Error("Verifique os dados preenchidos!");
    }
  }
}
const register = new Register();

btnRedirectLogin.addEventListener("click", () => {
  register.defineRoute("login");
});

formRegister.addEventListener("submit", (e:SubmitEvent) => {
  e.preventDefault();
  console.log("recarregando");
  register.sendDataUser();
  setTimeout(() => {
    register.defineRoute("login")
  },2000)
});
