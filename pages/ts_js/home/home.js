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
let linkVisited;
const linksNav = (_a = document.getElementById("nav-links")) === null || _a === void 0 ? void 0 : _a.children;
const linkTracks = document.getElementById("tracks");
const linkArtists = document.getElementById("artists");
const linkAlbums = document.getElementById("albums");
const contentLibrary = document.querySelector(".content-library");
const player = document.getElementById("player");
const loader = document.getElementById('loader');
const styleLinks = (link, linkVisited) => {
    link === null || link === void 0 ? void 0 : link.style.setProperty("background-color", "#262525");
    link === null || link === void 0 ? void 0 : link.style.setProperty("color", "#fff");
    linkVisited === null || linkVisited === void 0 ? void 0 : linkVisited.style.setProperty("background-color", "#faf5f7");
    linkVisited === null || linkVisited === void 0 ? void 0 : linkVisited.style.setProperty("color", "#000");
};
const playMusic = (source) => {
    if (source) {
        player === null || player === void 0 ? void 0 : player.setAttribute("src", source);
        player === null || player === void 0 ? void 0 : player.setAttribute("autoplay", "true");
    }
};
const verifyMusicList = () => {
    setTimeout(() => {
        if (contentLibrary.children.length > 0) {
            for (let i = 0; i < contentLibrary.children.length; i++) {
                contentLibrary.children[i].addEventListener("click", () => {
                    let linkPreview = contentLibrary.children[i].children[0].getAttribute("preview");
                    playMusic(linkPreview);
                });
            }
        }
    }, 2000);
};
for (let i = 0; i < linksNav.length; i++) {
    linksNav[i].addEventListener("click", (e) => {
        e.preventDefault();
        switch (linksNav[i].id) {
            case "tracks":
                contentLibrary.innerHTML = ``;
                insertData("https://api.deezer.com/chart/0/tracks");
                styleLinks(linkTracks, linkVisited);
                verifyMusicList();
                linkVisited = linkTracks;
                break;
            case "artists":
                contentLibrary.innerHTML = ``;
                insertData("https://api.deezer.com/chart/0/artists");
                styleLinks(linkArtists, linkVisited);
                verifyMusicList();
                linkVisited = linkArtists;
                break;
            case "albums":
                contentLibrary.innerHTML = ``;
                insertData("https://api.deezer.com/chart/0/albums");
                styleLinks(linkAlbums, linkVisited);
                verifyMusicList();
                linkVisited = linkAlbums;
                break;
        }
    });
}
const connectApi = (endPoint) => __awaiter(void 0, void 0, void 0, function* () {
    yield handleLoader(loader, "show");
    const resp = yield fetch(endPoint).then((resp) => resp.json());
    yield handleLoader(loader, "none");
    return resp;
});
const constructLayout = (title, artist, image, preview) => {
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
};
const insertData = (url) => {
    connectApi(url).then((resp) => {
        resp.data.map((cover) => {
            const imageLayout = url.includes("albums") || url.includes("tracks") ? cover.artist.picture_big : cover.picture_big;
            const artist = url.includes("tracks") ? cover.artist.name : cover.name;
            const title = url.includes("artists") ? cover.name : cover.title;
            const preview = url.includes("tracks") ? cover.preview : "";
            constructLayout(title, artist, imageLayout, preview);
        });
    });
};
insertData("https://api.deezer.com/chart/0/tracks");
verifyMusicList();
