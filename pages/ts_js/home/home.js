var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { handleLoader } from "../formConfigs/formConfig.js";
const linksNav = (_a = document.getElementById("nav-links")) === null || _a === void 0 ? void 0 : _a.children;
const linkTracks = document.getElementById("tracks");
const linkArtists = document.getElementById("artists");
const linkAlbums = document.getElementById("albums");
const linkExplorer = document.getElementById("explorer");
const linkMyMusics = document.getElementById("myMusics");
const linkRecomendations = document.getElementById("recomendations");
const linkPlaysRecently = document.getElementById("playsRecently");
const linkRadio = document.getElementById("radio");
const linkPlayingNow = document.getElementById("playingNow");
const contentLibrary = document.querySelector(".content-library");
const player = document.getElementById("player");
const loader = document.getElementById('loader');
const searchInput = document.getElementById('search');
const searchIcon = document.getElementById('searchIcon');
let linkVisited;
class ConstructLayout {
    layoutError() {
        const errorMsg = document.createElement('p');
        errorMsg.classList.add('errorMsg');
        errorMsg.innerText = 'Não há resultados encontrados';
        contentLibrary.prepend(errorMsg);
    }
    layoutBoxMusic(title, artist, image, preview) {
        const boxMusic = document.createElement("div");
        const titleMusic = title === artist ? "" : title;
        const artistMusic = artist ? artist : "";
        handleLoader(loader, "show");
        boxMusic.classList.add("box-music");
        boxMusic.innerHTML = `
      <div id='preview-link' preview='${preview}'>
        <div class="image-box">
        <img src='${image}'/></div>
        </div>
        <div class="title-music">
          <p class="title">
              ${titleMusic} - ${artistMusic}
          </p>
          </div>
        </div>
      `;
        contentLibrary.prepend(boxMusic);
        handleLoader(loader, "none");
    }
}
class HandleDataMusic {
    constructor() {
        this.playMusic = (source) => {
            if (source) {
                player === null || player === void 0 ? void 0 : player.setAttribute("src", source);
                player === null || player === void 0 ? void 0 : player.setAttribute("autoplay", "true");
            }
        };
    }
    connectApi(endPoint) {
        return __awaiter(this, void 0, void 0, function* () {
            handleLoader(loader, "show");
            const resp = yield fetch(endPoint).then((resp) => resp.json());
            handleLoader(loader, "none");
            return resp;
        });
    }
    verifyMusicList() {
        setTimeout(() => {
            if (contentLibrary.children.length > 0) {
                for (let i = 0; i < contentLibrary.children.length; i++) {
                    contentLibrary.children[i].addEventListener("click", () => {
                        let linkPreview = contentLibrary.children[i].children[0].getAttribute("preview");
                        this.playMusic(linkPreview);
                    });
                }
            }
        }, 1000);
    }
    insertData(url) {
        this.connectApi(url).then((resp) => {
            if (resp.data.length === 0) {
                construct.layoutError();
                return;
            }
            resp.data.map((cover) => {
                const imageLayout = url.includes("albums") || url.includes("tracks") || url.includes('?q=') ? cover.artist.picture_big : cover.picture_big;
                const artist = url.includes("tracks") ? cover.artist.name : cover.name;
                const title = url.includes("artists") ? cover.name : cover.title;
                const preview = cover.preview;
                construct.layoutBoxMusic(title, artist, imageLayout, preview);
            });
        });
    }
}
class HandleLinks {
    styleLinks(link) {
        Array.from(linksNav).forEach((linkStyleDefault) => {
            if (linkStyleDefault instanceof HTMLElement) {
                linkStyleDefault.style.setProperty('background-color', '#faf5f7');
                linkStyleDefault.style.setProperty('color', '#000');
            }
        });
        link === null || link === void 0 ? void 0 : link.style.setProperty('background-color', '#000');
        link === null || link === void 0 ? void 0 : link.style.setProperty('color', '#fff');
    }
    resetAndInsertLayout(urlContent, linkVisitedElement) {
        contentLibrary.innerHTML = ``;
        dataMusic.insertData(urlContent);
        dataMusic.verifyMusicList();
        linkVisited = linkVisitedElement;
    }
    navigationInUpMenu(link) {
        switch (link.id) {
            case "tracks":
                this.resetAndInsertLayout('https://api.deezer.com/chart/0/tracks', linkTracks);
                this.styleLinks(linkVisited);
                break;
            case "artists":
                this.resetAndInsertLayout("https://api.deezer.com/chart/0/artists", linkArtists);
                this.styleLinks(linkVisited);
                break;
            case "albums":
                this.resetAndInsertLayout("https://api.deezer.com/chart/0/albums", linkAlbums);
                this.styleLinks(linkVisited);
                break;
        }
    }
}
const construct = new ConstructLayout();
const dataMusic = new HandleDataMusic();
const manipulateLinks = new HandleLinks();
linkExplorer === null || linkExplorer === void 0 ? void 0 : linkExplorer.addEventListener('click', (e) => {
    e.preventDefault();
    dataMusic.insertData('https://api.deezer.com/chart/2/tracks');
});
Array.from(linksNav).forEach((link) => {
    link.addEventListener("click", () => {
        manipulateLinks.navigationInUpMenu(link);
    });
});
searchIcon === null || searchIcon === void 0 ? void 0 : searchIcon.addEventListener('click', () => {
    const seacrhUrl = 'https://api.deezer.com/search';
    const searchTerm = searchInput.value;
    contentLibrary.innerHTML = ``;
    dataMusic.insertData(`${seacrhUrl}?q=${searchTerm}`);
    dataMusic.verifyMusicList();
});
dataMusic.insertData("https://api.deezer.com/chart/0/tracks");
dataMusic.verifyMusicList();
