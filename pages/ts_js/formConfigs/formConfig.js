class Formulary {
    getProfilePhoto(url, profilePhotoElement, childrenProfilePhoto) {
        let strUrl;
        if (url) {
            strUrl = url.split("//");
            if (strUrl.length === 0) {
                const iconUser = document.createElement("i");
                iconUser.classList.add("bi bi-person-circle");
                profilePhotoElement.appendChild(iconUser);
            }
            else {
                const photoUser = document.createElement("img");
                photoUser.classList.add("photo-user");
                photoUser.setAttribute("src", url);
                profilePhotoElement.removeChild(childrenProfilePhoto[0]);
                profilePhotoElement.appendChild(photoUser);
            }
        }
    }
    accessDenied(target) {
        target.style.setProperty("border", "2px solid red");
    }
    accessAccepted(listInput) {
        listInput.forEach((inputElement) => {
            inputElement.style.setProperty("border", "2px solid #287a33");
        });
    }
    changeVisibilityPassword(input, showIcon, hideIcon) {
        if (input.getAttribute("type") === "password") {
            input.setAttribute("type", "text");
            showIcon.style.setProperty("display", "none");
            hideIcon.style.setProperty("display", "block");
        }
        else {
            input.setAttribute("type", "password");
            showIcon.style.setProperty("display", "block");
            hideIcon.style.setProperty("display", "none");
        }
    }
}
const formulary = new Formulary();
export const { getProfilePhoto, accessAccepted, accessDenied, changeVisibilityPassword, } = formulary;
