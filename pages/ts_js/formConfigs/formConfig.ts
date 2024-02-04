

class Formulary {
    public accessDenied(target: HTMLInputElement) {
      target.style.setProperty("border", "2px solid red");
    }
  
    public accessAccepted(listInput?: HTMLInputElement[]) {
      listInput!.forEach((inputElement) => {
        inputElement.style.setProperty("border", "2px solid #287a33");
      });
    }

    public changeVisibilityPassword(input: HTMLInputElement,showIcon: HTMLElement,hideIcon: HTMLElement){
        console.log('funcionando')
        if(input.getAttribute('type') === 'password'){
            input.setAttribute('type','text')
            showIcon.style.setProperty('display','none')
            hideIcon.style.setProperty('display','block')
        }else{
            input.setAttribute('type','password')
            showIcon.style.setProperty('display','block')
            hideIcon.style.setProperty('display','none')
        }
    }
  }

const formulary = new Formulary()

export const { accessAccepted,accessDenied,changeVisibilityPassword } = formulary
