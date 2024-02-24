import { ITrack,IArtist,IAlbum,IMusic,IData } from "../../../interfaces/dataMusic";
import { handleLoader } from "../formConfigs/formConfig.js";

let linkVisited: HTMLElement;
const linksNav = document.getElementById("nav-links")
  ?.children as HTMLCollection;
const linkTracks = document.getElementById("tracks") as HTMLElement;
const linkArtists = document.getElementById("artists") as HTMLElement;
const linkAlbums = document.getElementById("albums") as HTMLElement;
const contentLibrary = document.querySelector(
  ".content-library"
) as HTMLElement;
const player = document.getElementById("player") as HTMLElement;
const loader = document.getElementById('loader') as HTMLElement

const styleLinks = (link: HTMLElement, linkVisited: HTMLElement): void => {
  link?.style.setProperty("background-color", "#262525");
  link?.style.setProperty("color", "#fff");
  linkVisited?.style.setProperty("background-color", "#faf5f7");
  linkVisited?.style.setProperty("color", "#000");
};

const playMusic = (source: string | null) => {
  if (source) {
    player?.setAttribute("src", source);
    player?.setAttribute("autoplay", "true");
  }
};

const verifyMusicList = () => {
  setTimeout(() => {
    if (contentLibrary.children.length > 0) {
      for (let i = 0; i < contentLibrary.children.length; i++) {
        contentLibrary.children[i].addEventListener("click", () => {
          let linkPreview: string | null =
          contentLibrary.children[i].children[0].getAttribute("preview");
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


const connectApi = async (endPoint: string): Promise<IData> => {
  await handleLoader(loader,"show")
  const resp = await fetch(endPoint).then((resp) => resp.json());
 await handleLoader(loader,"none")

  return resp;
};

const constructLayout = (
  title: string,
  artist: string,
  image: String,
  preview: string
): void => {
  const boxMusic = document.createElement("div");
  const titleMusic: string = title === artist ? "" : title;
  const artistMusic: string | undefined = artist ? artist : "";

  handleLoader(loader,"show")

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
    handleLoader(loader,"none")

};

const insertData = (url: string): void => {
  connectApi(url).then((resp: IData) => {
    resp.data.map((cover:IMusic) => {
      const imageLayout: string = url.includes("albums") || url.includes("tracks") ? cover.artist.picture_big : cover.picture_big;
      const artist: string = url.includes("tracks") ? cover.artist.name : cover.name;
      const title: string = url.includes("artists") ? cover.name : cover.title;
      const preview: string = url.includes("tracks") ? cover.preview : "";
        constructLayout(title, artist, imageLayout, preview);
    });
  });

};

insertData("https://api.deezer.com/chart/0/tracks");
verifyMusicList();

