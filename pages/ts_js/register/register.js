var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const inputEmailElement = document.getElementById("inputEmail");
const inputPasswordElement = document.getElementById("inputPassword");
const inputConfirmPasswordElement = document.getElementById("inputConfirmPassword");
const inputUrlPhotoElement = document.getElementById("inputUrlPhoto");
const btnRedirectLogin = document.querySelector(".link-login");
const btnRegister = document.getElementById("btnRegister");
const titlePageRegister = document.title;
class Register {
    defineRoute(page) {
        location.href = location.href.replace("register", page);
    }
    accessDenied(target) {
        target.style.setProperty("border", "2px solid red");
    }
    accessAccepted() {
        const listInput = [
            inputEmailElement,
            inputPasswordElement,
            inputConfirmPasswordElement,
            inputUrlPhotoElement,
        ];
        listInput.forEach((inputElement) => {
            inputElement.style.setProperty("border", "2px solid #287a33");
        });
    }
    validateRegister() {
        if (inputEmailElement.value === "") {
            this.accessDenied(inputEmailElement);
            return false;
        }
        else if (inputPasswordElement.value !== inputConfirmPasswordElement.value) {
            this.accessDenied(inputConfirmPasswordElement);
            return false;
        }
        else {
            this.accessAccepted();
            return true;
        }
    }
    postData(data, url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(url, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        });
    }
    sendDataUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const registerValidated = this.validateRegister();
            let message;
            if (registerValidated) {
                const urlServer = `http://localhost:3004/users`;
                const dataUser = {
                    email: inputEmailElement.value,
                    password: inputPasswordElement.value,
                    confirmPassword: inputConfirmPasswordElement.value,
                    urlPhoto: inputUrlPhotoElement.value !== '' ? inputUrlPhotoElement.value : null
                };
                this.postData(dataUser, urlServer);
            }
            else {
                message = `Verifique os dados registrados`;
            }
        });
    }
}
const register = new Register();
btnRedirectLogin.addEventListener("click", () => {
    register.defineRoute("login");
});
btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    register.sendDataUser();
});
export {};
