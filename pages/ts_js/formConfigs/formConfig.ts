class Formulary {
  public getProfilePhoto(
    url: string | null,
    profilePhotoElement: HTMLElement,
    childrenProfilePhoto: HTMLCollection
  ) {
    if (url) {
      if (url.includes("https://")) {
        const photoUser = document.createElement("img");
        photoUser.classList.add("photo-user");
        photoUser.setAttribute("src", url);
        profilePhotoElement.removeChild(childrenProfilePhoto[0]);
        profilePhotoElement.appendChild(photoUser);
      } else {
        return
      }
    }
  }

  public insertBoxMsg(msgText: string, elementMessage: HTMLElement): void {
    elementMessage.innerHTML = `<div class='msg-user'><p class='msg'>${msgText}</p></div>`;
  }

  public accessDenied(target: HTMLInputElement) {
    target.style.setProperty("border", "2px solid red");
  }

  public accessAccepted(listInput?: HTMLInputElement[]) {
    listInput!.forEach((inputElement) => {
      inputElement.style.setProperty("border", "2px solid #287a33");
    });
  }

  public changeVisibilityPassword(
    input: HTMLInputElement,
    showIcon: HTMLElement,
    hideIcon: HTMLElement
  ) {
    if (input.getAttribute("type") === "password") {
      input.setAttribute("type", "text");
      showIcon.style.setProperty("display", "none");
      hideIcon.style.setProperty("display", "block");
    } else {
      input.setAttribute("type", "password");
      showIcon.style.setProperty("display", "block");
      hideIcon.style.setProperty("display", "none");
    }
  }

  public handleLoader(loader: HTMLElement,visibility:string): void {
    if(visibility === 'show'){
      loader?.style.setProperty('display','block')
    }else{
      loader?.style.setProperty('display','none')

    }
  }
}

const formulary = new Formulary();

export const {
  getProfilePhoto,
  insertBoxMsg,
  accessDenied,
  accessAccepted,
  changeVisibilityPassword,
  handleLoader
} = formulary;
