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
const contentLibrary = document.querySelector(".content-library");
const linkTracks = document.getElementById('tracks');
const linkArtists = document.getElementById('artists');
const linkAlbums = document.getElementById("albums");
let linkVisited;
for (let i = 0; i < linksNav.length; i++) {
    linksNav[i].addEventListener("click", (e) => {
        e.preventDefault();
        switch (linksNav[i].id) {
            case "tracks":
                contentLibrary.innerHTML = ``;
                insertData("https://api.deezer.com/chart/0/tracks");
                linkVisited === null || linkVisited === void 0 ? void 0 : linkVisited.style.setProperty('background-color', '#faf5f7');
                linkVisited === null || linkVisited === void 0 ? void 0 : linkVisited.style.setProperty('color', '#000');
                linkTracks === null || linkTracks === void 0 ? void 0 : linkTracks.style.setProperty("background-color", "#262525");
                linkTracks === null || linkTracks === void 0 ? void 0 : linkTracks.style.setProperty("color", "#fff");
                linkVisited = linkTracks;
                break;
            case "artists":
                contentLibrary.innerHTML = ``;
                insertData("https://api.deezer.com/chart/0/artists");
                linkVisited === null || linkVisited === void 0 ? void 0 : linkVisited.style.setProperty('background-color', '#faf5f7');
                linkVisited === null || linkVisited === void 0 ? void 0 : linkVisited.style.setProperty('color', '#000');
                linkArtists === null || linkArtists === void 0 ? void 0 : linkArtists.style.setProperty("background-color", "#262525");
                linkArtists === null || linkArtists === void 0 ? void 0 : linkArtists.style.setProperty("color", "#fff");
                linkVisited = linkArtists;
                break;
            case "albums":
                contentLibrary.innerHTML = ``;
                insertData("https://api.deezer.com/chart/0/albums");
                linkVisited === null || linkVisited === void 0 ? void 0 : linkVisited.style.setProperty('background-color', '#faf5f7');
                linkVisited === null || linkVisited === void 0 ? void 0 : linkVisited.style.setProperty('color', '#000');
                linkAlbums === null || linkAlbums === void 0 ? void 0 : linkAlbums.style.setProperty("background-color", "#262525");
                linkAlbums === null || linkAlbums === void 0 ? void 0 : linkAlbums.style.setProperty("color", "#fff");
                linkVisited = linkAlbums;
                break;
        }
    });
}
const connectApi = (endPoint) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fetch(endPoint).then((resp) => resp.json());
    return resp;
});
const constructLayout = (title, image) => {
    const boxMusic = document.createElement("div");
    boxMusic.classList.add("box-music");
    boxMusic.innerHTML = `  <div class="image-box"><img src='${image}'/></div>
  <div class="title-music">
      <p class="title">
          ${title}
      </p>
  </div>`;
    contentLibrary.prepend(boxMusic);
};
const insertData = (url) => {
    connectApi(url).then((resp) => {
        console.log(resp);
        resp.data.map((album) => {
            const title = url.includes('artists') ? album.name : album.title;
            const artist = url.includes('tracks') ? album.artist.name : album.name;
            const imageLayout = url.includes('albums') || url.includes('tracks') ? album.artist.picture_big : album.picture_big;
            constructLayout(`${title} - ${artist}`, imageLayout);
        });
    });
};
insertData("https://api.deezer.com/chart/2/artists");
export {};
