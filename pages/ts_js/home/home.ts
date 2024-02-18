import { IMusicChart } from "../../../interfaces/dataMusic"

const linksNav = document.getElementById('nav-links')?.children as HTMLCollection
const contentLibrary = document.querySelector(".content-library") as HTMLElement;

const linkTracks = document.getElementById('tracks') as HTMLElement
const linkArtists = document.getElementById('artists') as HTMLElement
const linkAlbums = document.getElementById("albums") as HTMLElement;
let linkVisited: HTMLElement;

for (let i = 0; i < linksNav.length; i++) {
  linksNav[i].addEventListener("click", (e) => {   
    e.preventDefault();
    switch (linksNav[i].id) {
      case "tracks":
        contentLibrary.innerHTML = ``
        insertData("https://api.deezer.com/chart/0/tracks");
        linkVisited?.style.setProperty('background-color','#faf5f7')
        linkVisited?.style.setProperty('color','#000')
        linkTracks?.style.setProperty("background-color", "#262525");
        linkTracks?.style.setProperty("color", "#fff");
        linkVisited = linkTracks
        break;
      case "artists":
        contentLibrary.innerHTML = ``
        insertData("https://api.deezer.com/chart/0/artists");
        linkVisited?.style.setProperty('background-color','#faf5f7')
        linkVisited?.style.setProperty('color','#000')
        linkArtists?.style.setProperty("background-color", "#262525");
        linkArtists?.style.setProperty("color", "#fff");
        linkVisited = linkArtists
        break;
      case "albums":
        contentLibrary.innerHTML = ``
        insertData("https://api.deezer.com/chart/0/albums");
        linkVisited?.style.setProperty('background-color','#faf5f7')
        linkVisited?.style.setProperty('color','#000')
        linkAlbums?.style.setProperty("background-color", "#262525");
        linkAlbums?.style.setProperty("color", "#fff");
        linkVisited = linkAlbums
        break;
    }
  });
}

const connectApi = async (endPoint: string): Promise<IMusicChart> => {
  const resp = await fetch(endPoint).then((resp) => resp.json());
  return resp;
};

const constructLayout = (title: string, image: String): void => {

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

const insertData = (url: string): void => {
  connectApi(url).then((resp: any) => {
    console.log(resp);
    resp.data.map((album: any) => {
      const title: String = url.includes('artists') ? album.name : album.title;
      const artist: String = url.includes('tracks') ? album.artist.name : album.name;
      const imageLayout: String = url.includes('albums') || url.includes('tracks') ? album.artist.picture_big : album.picture_big;
      constructLayout(`${title} - ${artist}`, imageLayout);
    });
  });
};


insertData("https://api.deezer.com/chart/2/artists");
