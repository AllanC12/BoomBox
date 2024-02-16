var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
const insertData = () => {
    connectApi("https://api.deezer.com/chart/0").then((resp) => {
        resp.tracks.data.map((album) => {
            const titleAlbum = album.title;
            const artistName = album.artist.name;
            const imageLayout = album.artist.picture_big;
            constructLayout(`${titleAlbum} - ${artistName}`, imageLayout);
        });
    });
};
insertData();
export {};
