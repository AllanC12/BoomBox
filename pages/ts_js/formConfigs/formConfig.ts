

class Formulary {
  public getProfilePhoto(url: string | null,profilePhotoElement: HTMLElement,childrenProfilePhoto: HTMLCollection) {
    let strUrl: string[];
    if (url) {
      strUrl = url.split("//");
      if (strUrl.length === 0) {
        const iconUser = document.createElement("i");
        iconUser.classList.add("bi bi-person-circle");
        profilePhotoElement.appendChild(iconUser);
      } else {
        const photoUser = document.createElement("img");
        photoUser.classList.add("photo-user");
        photoUser.setAttribute("src",url)
        profilePhotoElement.removeChild(childrenProfilePhoto[0])
        profilePhotoElement.appendChild(photoUser);
      }
    }
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
}

const formulary = new Formulary();

export const {
  getProfilePhoto,
  accessAccepted,
  accessDenied,
  changeVisibilityPassword,
} = formulary;
