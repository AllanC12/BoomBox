const btnLogin = document.querySelector(".link-login") as HTMLElement;
const titlePageRegister:string = document.title

class Register{
    defineRoute(page:string) {
      location.href = location.href.replace('register',page)
      console.log(location.href )
    }
} 
const register = new Register();

btnLogin!.addEventListener('click', () => {
    register.defineRoute('login');
});


