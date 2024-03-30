var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { handleLoader } from "../formConfigs/formConfig.js";
const linksNav = document.querySelectorAll("#nav-links span");
const contentLibrary = document.querySelector(".content-library");
const btnFilter = document.getElementById('btn_filter');
const selectFilter = document.getElementById('filter_by');
const player = document.getElementById("player");
const loader = document.getElementById("loader");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchIcon = document.getElementById("searchIcon");
const linksAside = document.querySelectorAll(".navigation li span");
const musicName = document.getElementById("musicName");
const boxImageMusicPlayer = document.querySelector(".img-music");
const imageMusicPlayer = document.querySelector(".img-music img");
let linkVisited;
let layoutLoaded = false;
class ConstructLayout {
    layoutError() {
        const errorMsg = document.createElement("p");
        errorMsg.classList.add("errorMsg");
        errorMsg.innerText = "Não há resultados encontrados";
        contentLibrary.prepend(errorMsg);
    }
    constructListGenres(genre, idGenre) {
        const selectFilter = document.getElementById('filter_by');
        const genreElement = document.createElement('option');
        genreElement.setAttribute('id', `${idGenre}`);
        genreElement.textContent = genre;
        selectFilter.appendChild(genreElement);
    }
    listGenres() {
        const urlGenres = `https://api.deezer.com/genre`;
        const response = dataMusic.connectApi(urlGenres).then((resp) => {
            resp.data.forEach((genre) => {
                const { id, name } = genre;
                this.constructListGenres(name, id);
            });
        });
    }
    getDataFromLayoutMusic(url, itemApi) {
        const title = url.includes("artists")
            ? itemApi.name
            : itemApi.title;
        const artist = url.includes("tracks")
            ? itemApi.artist.name
            : itemApi.name;
        const imageArtist = url.includes("top?limit")
            ? itemApi.album.cover_big
            : "";
        const imageAlbums = url.includes("albums")
            ? itemApi.artist.picture_big
            : itemApi.picture_big;
        const imageTracks = url.includes("tracks") || url.includes("?q=")
            ? itemApi.artist.picture_big
            : itemApi.picture_big;
        const imageAlbumSingle = url.includes("/album/")
            ? sessionStorage.getItem("image_album_single")
            : null;
        const preview = itemApi.preview;
        const idAlbum = url.includes("albums") ? itemApi.id : null;
        const idArtist = url.includes("artists") ? itemApi.id : null;
        const dataFromlayout = {
            title,
            artist,
            image: imageTracks || imageArtist || imageAlbums || imageAlbumSingle,
            preview,
            idAlbum,
            idArtist,
        };
        this.layoutBoxMusic(dataFromlayout);
    }
    layoutBoxMusic(dataLayoutBox) {
        const { title, artist, image, preview, idAlbum, idArtist } = dataLayoutBox;
        const boxMusic = document.createElement("div");
        const titleMusic = title === artist ? "" : title;
        const artistMusic = artist ? artist : "";
        handleLoader(loader, "show");
        boxMusic.classList.add("box-music");
        boxMusic.setAttribute("id_album", `${idAlbum}`);
        boxMusic.setAttribute("id_artist", `${idArtist}`);
        boxMusic.setAttribute("preview_music", `${preview}`);
        boxMusic.setAttribute("preview_image", `${image}`);
        boxMusic.setAttribute("preview_image_album", `${image}`);
        boxMusic.innerHTML = `
      <div id='preview-link'>
       <div class='image-box'>
         <img  src='${image}'/></div>
       </div>
          <h4 class="title">
              ${titleMusic} - ${artistMusic}
          </h4>
        </div>
      `;
        contentLibrary.prepend(boxMusic);
        handleLoader(loader, "none");
    }
    resetAndInsertLayout(urlContent) {
        contentLibrary.innerHTML = ``;
        dataMusic.insertData(urlContent);
    }
}
class HandleDataMusic {
    constructor() {
        this.playMusic = (source, preview_image) => {
            if (source === null || source === void 0 ? void 0 : source.includes("https://")) {
                player === null || player === void 0 ? void 0 : player.style.setProperty("display", "block");
                player === null || player === void 0 ? void 0 : player.setAttribute("src", source);
                player === null || player === void 0 ? void 0 : player.setAttribute("autoplay", "true");
            }
            this.applyImageInPlayer(preview_image);
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
    applyImageInPlayer(preview_image) {
        if (preview_image) {
            boxImageMusicPlayer === null || boxImageMusicPlayer === void 0 ? void 0 : boxImageMusicPlayer.style.setProperty("display", "block");
            imageMusicPlayer === null || imageMusicPlayer === void 0 ? void 0 : imageMusicPlayer.setAttribute("src", preview_image);
        }
    }
    getDataAboutMusic(element) {
        let titleMusicElement = element.children[1];
        let linkImageAlbum = element.getAttribute("preview_image_album");
        if (linkImageAlbum) {
            sessionStorage.setItem("image_album_single", linkImageAlbum);
        }
        let titleMusic = titleMusicElement.innerText;
        musicName.innerText = titleMusic;
    }
    verifyBoxMusic(linkPreview, element) {
        const idAlbum = element.getAttribute("id_album");
        const idArtist = element.getAttribute("id_artist");
        const preview_image = element.getAttribute("preview_image");
        this.getDataAboutMusic(element);
        if (linkPreview === "undefined") {
            if (idArtist !== "null") {
                const urlArtist = `https://api.deezer.com/artist/${idArtist}/top?limit=50`;
                construct.resetAndInsertLayout(urlArtist);
            }
            if (idAlbum !== "null") {
                const urlAlbum = `https://api.deezer.com/album/${idAlbum}/tracks`;
                construct.resetAndInsertLayout(urlAlbum);
            }
        }
        else {
            this.playMusic(linkPreview, preview_image);
        }
    }
    verifyMusicList() {
        if (layoutLoaded) {
            for (let i = 0; i < contentLibrary.children.length; i++) {
                contentLibrary.children[i].addEventListener("click", (e) => {
                    let linkPreview = contentLibrary.children[i].getAttribute("preview_music");
                    this.verifyBoxMusic(linkPreview, contentLibrary.children[i]);
                });
            }
        }
    }
    insertData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connectApi(url).then((resp) => {
                if (resp.data.length === 0) {
                    construct.layoutError();
                    return;
                }
                resp.data.map((cover) => {
                    construct.getDataFromLayoutMusic(url, cover);
                });
            });
            layoutLoaded = true;
            dataMusic.verifyMusicList();
        });
    }
    searchMusic(searchTerm) {
        const seacrhUrl = "https://api.deezer.com/search";
        contentLibrary.innerHTML = ``;
        dataMusic.insertData(`${seacrhUrl}?q=${searchTerm}`);
        dataMusic.verifyMusicList();
    }
    filterMusic() {
        const optionSelected = selectFilter.options[selectFilter.selectedIndex];
        const idOptionSelected = optionSelected.getAttribute('id');
        const urlFilterByGenre = `https://api.deezer.com/genre/${idOptionSelected}/artists`;
        construct.resetAndInsertLayout(urlFilterByGenre);
    }
}
class HandleLinks {
    linksStyle(linkStyled) {
        linkVisited === null || linkVisited === void 0 ? void 0 : linkVisited.style.setProperty("background-color", "transparent");
        linkVisited === null || linkVisited === void 0 ? void 0 : linkVisited.style.setProperty("color", "#000");
        linkStyled === null || linkStyled === void 0 ? void 0 : linkStyled.style.setProperty("background-color", "#000");
        linkStyled === null || linkStyled === void 0 ? void 0 : linkStyled.style.setProperty("color", "#fff");
        linkVisited = linkStyled;
    }
    callEndPoints(link) {
        if (link instanceof HTMLElement) {
            switch (link.id) {
                case "tracks":
                    construct.resetAndInsertLayout("https://api.deezer.com/chart/0/tracks");
                    break;
                case "artists":
                    construct.resetAndInsertLayout("https://api.deezer.com/chart/0/artists");
                    break;
                case "albums":
                    construct.resetAndInsertLayout("https://api.deezer.com/chart/0/albums");
                    break;
                case "explorer":
                    construct.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks");
                    break;
                case "myMusics":
                    construct.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks");
                    break;
                case "recomendations":
                    construct.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks");
                    break;
                case "playsRecently":
                    construct.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks");
                    break;
                case "radio":
                    construct.resetAndInsertLayout("https://api.deezer.com/radio/37151/tracks");
                    break;
                case "playingNow":
                    construct.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks");
                    break;
            }
        }
    }
    applyStylesLinks(listLinks) {
        Array.from(listLinks).forEach((link) => {
            link.addEventListener("click", (e) => {
                manipulateLinks.callEndPoints(link);
                if (e.target instanceof HTMLElement) {
                    manipulateLinks.linksStyle(e.target);
                }
            });
        });
    }
}
const construct = new ConstructLayout();
const dataMusic = new HandleDataMusic();
const manipulateLinks = new HandleLinks();
searchForm === null || searchForm === void 0 ? void 0 : searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    dataMusic.searchMusic(searchInput.value);
});
searchIcon === null || searchIcon === void 0 ? void 0 : searchIcon.addEventListener("click", () => {
    dataMusic.searchMusic(searchInput.value);
});
btnFilter === null || btnFilter === void 0 ? void 0 : btnFilter.addEventListener('click', () => {
    dataMusic.filterMusic();
});
dataMusic.insertData("https://api.deezer.com/chart/0/tracks");
manipulateLinks.applyStylesLinks(linksAside);
manipulateLinks.applyStylesLinks(linksNav);
construct.listGenres();
