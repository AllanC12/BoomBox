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
const linksNavAside = document.querySelectorAll(".navigation li span");
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
const loader = document.getElementById("loader");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("search");
const searchIcon = document.getElementById("searchIcon");
const musicName = document.getElementById("musicName");
let linkVisited;
class ConstructLayout {
    layoutError() {
        const errorMsg = document.createElement("p");
        errorMsg.classList.add("errorMsg");
        errorMsg.innerText = "Não há resultados encontrados";
        contentLibrary.prepend(errorMsg);
    }
    getDataFromLayout(url, itemApi) {
        const getImage = () => {
            let linkImage;
            if (url.includes('albums') || url.includes('tracks') || url.includes('?q=')) {
                linkImage = itemApi.artist.picture_big;
            }
            else if (url.includes('artist')) {
                linkImage = itemApi.album.cover_big;
            }
            else {
                linkImage = itemApi.picture_big;
            }
            return linkImage;
        };
        const title = url.includes("artists") ? itemApi.name : itemApi.title;
        const artist = url.includes("tracks") ? itemApi.artist.name : itemApi.name;
        const imageArtist = url.includes('top?limit') ? itemApi.album.cover_big : '';
        const imageAlbumTracks = url.includes("albums") || url.includes("tracks") || url.includes("?q=") ? itemApi.artist.picture_big : itemApi.picture_big;
        const preview = itemApi.preview;
        const idAlbum = url.includes("albums") ? itemApi.id : null;
        const idArtist = url.includes("artists") ? itemApi.id : null;
        const dataFromlayout = {
            title,
            artist,
            image: imageAlbumTracks || imageArtist,
            preview,
            idAlbum,
            idArtist,
        };
        this.layoutBoxMusic(dataFromlayout);
        dataMusic.verifyMusicList();
    }
    layoutBoxMusic(dataLayoutBox) {
        const { title, artist, image, preview, idAlbum, idArtist } = dataLayoutBox;
        const boxMusic = document.createElement("div");
        const titleMusic = title === artist ? "" : title;
        const artistMusic = artist ? artist : '';
        handleLoader(loader, "show");
        boxMusic.classList.add("box-music");
        boxMusic.innerHTML = `
      <div id='preview-link' idAlbum=${idAlbum} idArtist=${idArtist} preview='${preview}'>
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
            if (source === null || source === void 0 ? void 0 : source.includes('https://')) {
                player === null || player === void 0 ? void 0 : player.style.setProperty("display", "block");
                player === null || player === void 0 ? void 0 : player.setAttribute("src", source);
                player === null || player === void 0 ? void 0 : player.setAttribute("autoplay", "true");
                console.log('musica tocada');
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
    getDataAboutMusic(element) {
        let titleMusicElement = element.children[1].children[0];
        let titleMusic = titleMusicElement.innerText;
        musicName.innerText = titleMusic;
    }
    verifyBoxMusic(linkPreview, element) {
        if (linkPreview === "undefined") {
            const idAlbum = element.children[0].getAttribute("idAlbum");
            const idArtist = element.children[0].getAttribute("idArtist");
            if (idAlbum === 'null') {
                const urlArtist = `https://api.deezer.com/artist/${idArtist}/top?limit=50`;
                this.insertData(urlArtist);
            }
        }
    }
    // public playersRecently(){
    // }
    verifyMusicList() {
        setTimeout(() => {
            if (contentLibrary.children.length > 0) {
                for (let i = 0; i < contentLibrary.children.length; i++) {
                    contentLibrary.children[i].addEventListener("click", () => {
                        let linkPreview = contentLibrary.children[i].children[0].getAttribute("preview");
                        this.verifyBoxMusic(linkPreview, contentLibrary.children[i]);
                        this.getDataAboutMusic(contentLibrary.children[i]);
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
                construct.getDataFromLayout(url, cover);
            });
        });
    }
    searchMusic(searchTerm) {
        const seacrhUrl = "https://api.deezer.com/search";
        contentLibrary.innerHTML = ``;
        dataMusic.insertData(`${seacrhUrl}?q=${searchTerm}`);
        dataMusic.verifyMusicList();
    }
}
class HandleLinks {
    styleLinks(link) {
        Array.from(linksNav).forEach((linkStyleDefault) => {
            if (linkStyleDefault instanceof HTMLElement) {
                linkStyleDefault.style.setProperty("background-color", "transparent");
                linkStyleDefault.style.setProperty("color", "#000");
            }
        });
        link === null || link === void 0 ? void 0 : link.style.setProperty("background-color", "#000");
        link === null || link === void 0 ? void 0 : link.style.setProperty("color", "#fff");
    }
    resetAndInsertLayout(urlContent, linkVisitedElement = null) {
        contentLibrary.innerHTML = ``;
        dataMusic.insertData(urlContent);
        dataMusic.verifyMusicList();
        linkVisited = linkVisitedElement;
    }
    callEndPoints(link) {
        switch (link.id) {
            case "tracks":
                this.resetAndInsertLayout("https://api.deezer.com/chart/0/tracks", linkTracks);
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
            case "explorer":
                this.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks", linkExplorer);
                break;
            case "myMusics":
                this.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks", linkMyMusics);
                break;
            case "recomendations":
                this.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks", linkRecomendations);
                break;
            case "playsRecently":
                this.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks", linkPlaysRecently);
                break;
            case "radio":
                this.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks", linkRadio);
                break;
            case "playingNow":
                this.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks", linkPlayingNow);
                break;
        }
    }
}
const construct = new ConstructLayout();
const dataMusic = new HandleDataMusic();
const manipulateLinks = new HandleLinks();
// linkExplorer?.addEventListener('click',(e):void => {
//   e.preventDefault()
//   dataMusic.insertData('https://api.deezer.com/chart/2/tracks')
// })
Array.from(linksNav).forEach((link) => {
    link.addEventListener("click", () => {
        manipulateLinks.callEndPoints(link);
    });
});
Array.from(linksNavAside).forEach((link) => {
    link.addEventListener("click", () => {
        manipulateLinks.callEndPoints(link);
    });
});
searchForm === null || searchForm === void 0 ? void 0 : searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    dataMusic.searchMusic(searchInput.value);
});
searchIcon === null || searchIcon === void 0 ? void 0 : searchIcon.addEventListener("click", () => {
    dataMusic.searchMusic(searchInput.value);
});
dataMusic.insertData("https://api.deezer.com/chart/0/tracks");
dataMusic.verifyMusicList();
