class Formulary {
    getProfilePhoto(url, profilePhotoElement, childrenProfilePhoto) {
        if (url) {
            if (url.includes("https://")) {
                const photoUser = document.createElement("img");
                photoUser.classList.add("photo-user");
                photoUser.setAttribute("src", url);
                profilePhotoElement.removeChild(childrenProfilePhoto[0]);
                profilePhotoElement.appendChild(photoUser);
            }
            else {
                return;
            }
        }
    }
    insertBoxMsg(msgText, elementMessage) {
        elementMessage.innerHTML = `<div class='msg-user'><p class='msg'>${msgText}</p></div>`;
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
    handleLoader(loader, visibility) {
        if (visibility === 'show') {
            loader === null || loader === void 0 ? void 0 : loader.style.setProperty('display', 'block');
        }
        else {
            loader === null || loader === void 0 ? void 0 : loader.style.setProperty('display', 'none');
        }
    }
}
const formulary = new Formulary();
export const { getProfilePhoto, insertBoxMsg, accessDenied, accessAccepted, changeVisibilityPassword, handleLoader } = formulary;
