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
const linksNav = (_a = document.getElementById('nav-links')) === null || _a === void 0 ? void 0 : _a.children;
const linkTracks = document.getElementById('tracks');
const linkArtists = document.getElementById('artists');
const linkAlbums = document.getElementById('albums');
let linkVisited;
const styleLink = (linkVisited) => {
    for (let i = 0; i < linksNav.length; i++) {
        linksNav[i].addEventListener('click', (e) => {
            var _a, _b;
            e.preventDefault();
            console.log(linksNav[i]);
            linkVisited === null || linkVisited === void 0 ? void 0 : linkVisited.style.setProperty('background-color', '#faf5f7');
            linkVisited === null || linkVisited === void 0 ? void 0 : linkVisited.style.setProperty('color', '#000');
            (_a = linksNav[i]) === null || _a === void 0 ? void 0 : _a.style.setProperty('background-color', '#262525');
            (_b = linksNav[i]) === null || _b === void 0 ? void 0 : _b.style.setProperty('color', '#fff');
            linkVisited = linksNav[i];
        });
    }
};
const connectApi = (endPoint) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fetch(endPoint).then(resp => resp.json());
    return resp;
});
const constructLayout = (title, image) => {
    const contentLibrary = document.querySelector('.content-library');
    const boxMusic = document.createElement("div");
    boxMusic.classList.add("box-music");
    boxMusic.innerHTML = `  <div class="image-box"><img src='${image}'/></div>
  <div class="title-music">
      <p class="title">
          ${title}
      </p>
  </div>`;
    contentLibrary.appendChild(boxMusic);
};
const insertData = (url) => {
    connectApi(url).then((resp) => {
        resp.tracks.data.map((album) => {
            const titleAlbum = album.title;
            const artistName = album.artist.name;
            const imageLayout = album.artist.picture_big;
            constructLayout(`${titleAlbum} - ${artistName}`, imageLayout);
        });
    });
    styleLink(linkVisited);
};
// const selectMusic = 
insertData("https://api.deezer.com/chart/0");
export {};
