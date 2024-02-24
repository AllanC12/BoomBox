var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getProfilePhoto, accessAccepted, accessDenied, insertBoxMsg, handleLoader, changeVisibilityPassword } from "../formConfigs/formConfig.js";
const formRegister = document.querySelector('.form-register');
const inputEmailElement = document.getElementById("inputEmail");
const inputPasswordElement = document.getElementById("inputPassword");
const inputConfirmPasswordElement = document.getElementById("inputConfirmPassword");
const inputUrlPhotoElement = document.getElementById("inputUrlPhoto");
const btnRedirectLogin = document.querySelector(".link-login");
const visibilityPassword = document.getElementById('visibility-password');
const showPassword = document.getElementById('show-password');
const hidePassword = document.getElementById('hide-password');
const boxMessage = document.getElementById('msg-user-register');
const profilePhotoElement = document.getElementById("profile-photo");
const profilePhotoChildren = profilePhotoElement.children;
const loader = document.getElementById('loader');
const listInput = [
    inputEmailElement,
    inputPasswordElement,
    inputConfirmPasswordElement,
    inputUrlPhotoElement,
];
class Register {
    defineRoute(page) {
        location.href = location.href.replace("register", page);
    }
    validateRegister() {
        if (inputEmailElement.value === "") {
            accessDenied(inputEmailElement);
            insertBoxMsg('Insira um email', boxMessage);
            return false;
        }
        else if (inputPasswordElement.value === "" ||
            inputConfirmPasswordElement.value === "") {
            accessDenied(inputConfirmPasswordElement);
            insertBoxMsg('Crie uma senha', boxMessage);
            return false;
        }
        else if (inputPasswordElement.value !== inputConfirmPasswordElement.value) {
            accessDenied(inputConfirmPasswordElement);
            insertBoxMsg('As senhas precisam ser iguais', boxMessage);
            return false;
        }
        else {
            accessAccepted(listInput);
            insertBoxMsg('usuário cadastrado com sucesso!', boxMessage);
            return true;
        }
    }
    postData(data, url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fetch(url, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    sendDataUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const registerValidated = this.validateRegister();
            const urlServer = `http://boomboxapi.glitch.me/users`;
            const dataUser = {
                email: inputEmailElement.value,
                password: inputPasswordElement.value,
                confirmPassword: inputConfirmPasswordElement.value,
                urlPhoto: inputUrlPhotoElement.value === null ? '' : inputUrlPhotoElement.value,
            };
            if (registerValidated) {
                try {
                    yield this.postData(dataUser, urlServer);
                    getProfilePhoto(dataUser.urlPhoto, profilePhotoElement, profilePhotoChildren);
                    setTimeout(() => {
                        this.defineRoute("login");
                    }, 2000);
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                return;
            }
        });
    }
}
const register = new Register();
visibilityPassword.addEventListener('click', () => {
    changeVisibilityPassword(inputPasswordElement, showPassword, hidePassword);
});
btnRedirectLogin.addEventListener("click", () => {
    register.defineRoute("login");
});
formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    handleLoader(loader, 'show');
    register.sendDataUser();
});
