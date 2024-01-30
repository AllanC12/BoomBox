const btnRedirectRegister = document.querySelector(".link-register") as HTMLElement;
const titlePagelogin:string = document.title

class Login{
    defineRoute(page:string) {
      location.href = location.href.replace(titlePagelogin.toLowerCase(),page)
    }
} 
const login = new Login();

btnRedirectRegister!.addEventListener('click', () => {
    login.defineRoute('register');
});


