const btnRegister = document.querySelector(".link-register") as HTMLElement;
const titlePagelogin:string = document.title

class Login{
    defineRoute(page:string) {
      location.href = location.href.replace(titlePagelogin.toLowerCase(),page)
    }
} 
const login = new Login();

btnRegister!.addEventListener('click', () => {
    login.defineRoute('register');
});


