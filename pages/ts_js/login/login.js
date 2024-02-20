var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { insertBoxMsg, accessAccepted, accessDenied, changeVisibilityPassword, showLoader } from "../formConfigs/formConfig.js";
const titlePagelogin = document.title;
const formELement = document.getElementById('form-login');
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const inputListElement = [emailElement, passwordElement];
const btnRedirectRegister = document.querySelector(".link-register");
const visibilityPassword = document.getElementById('visibility-password');
const showPassword = document.getElementById('show-password');
const hidePassword = document.getElementById('hide-password');
const boxMessage = document.getElementById('msg-user-login');
const loader = document.getElementById('loader');
let dataUserLogin;
class Login {
    defineRoute(page) {
        location.href = location.href.replace(titlePagelogin.toLowerCase(), page);
    }
    validateLoginUser(dataUser) {
        if (dataUser.length === 0) {
            insertBoxMsg('Email não cadastrado', boxMessage);
            accessDenied(emailElement);
            return false;
        }
        else if (dataUser[0].password !== passwordElement.value) {
            insertBoxMsg('Senha incorreta', boxMessage);
            accessDenied(passwordElement);
            return false;
        }
        else {
            insertBoxMsg('Bem vindo!', boxMessage);
            accessAccepted(inputListElement);
            return true;
        }
    }
    getLoginUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const urlServer = `http://boomboxapi.glitch.me/users`;
            try {
                dataUserLogin = yield fetch(`${urlServer}?email=${emailElement.value}`).then(resp => resp.json());
                const dataLoginValidated = this.validateLoginUser(dataUserLogin);
                if (dataLoginValidated) {
                    this.defineRoute("home");
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
const login = new Login();
formELement.addEventListener('submit', (e) => {
    e.preventDefault();
    showLoader(loader);
    login.getLoginUser();
});
visibilityPassword.addEventListener('click', () => {
    changeVisibilityPassword(passwordElement, showPassword, hidePassword);
});
btnRedirectRegister.addEventListener('click', () => {
    login.defineRoute('register');
});
