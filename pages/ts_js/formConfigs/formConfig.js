class Formulary {
    accessDenied(target) {
        target.style.setProperty("border", "2px solid red");
    }
    accessAccepted(listInput) {
        listInput.forEach((inputElement) => {
            inputElement.style.setProperty("border", "2px solid #287a33");
        });
    }
    changeVisibilityPassword(input, showIcon, hideIcon) {
        console.log('funcionando');
        if (input.getAttribute('type') === 'password') {
            input.setAttribute('type', 'text');
            showIcon.style.setProperty('display', 'none');
            hideIcon.style.setProperty('display', 'block');
        }
        else {
            input.setAttribute('type', 'password');
            showIcon.style.setProperty('display', 'block');
            hideIcon.style.setProperty('display', 'none');
        }
    }
}
const formulary = new Formulary();
export const { accessAccepted, accessDenied, changeVisibilityPassword } = formulary;
