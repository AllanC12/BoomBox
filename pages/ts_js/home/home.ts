import { ITrack,IArtist,IAlbum,IMusic,IData } from "../../../interfaces/dataMusic";
import { handleLoader } from "../formConfigs/formConfig.js";

const linksNav = document.getElementById("nav-links")?.children as HTMLCollection;
const btnExplorer = document.getElementById("btn-explorer") as HTMLElement;
const linkTracks = document.getElementById("tracks") as HTMLElement;
const linkArtists = document.getElementById("artists") as HTMLElement;
const linkAlbums = document.getElementById("albums") as HTMLElement;
const contentLibrary = document.querySelector(".content-library") as HTMLElement;
const player = document.getElementById("player") as HTMLElement;
const loader = document.getElementById('loader') as HTMLElement
const searchInput = document.getElementById('search') as HTMLInputElement
const searchIcon = document.getElementById('searchIcon') as HTMLElement

let linkVisited: HTMLElement;
let response:boolean = true;

const constructLayouError = () => {
  const errorMsg = document.createElement('p')
  errorMsg.classList.add('errorMsg')
  errorMsg.innerText = 'Não há resultados encontrados'
  contentLibrary.prepend(errorMsg)
}

const styleLinks = (link:HTMLElement) => {
    Array.from(linksNav).forEach((linkStyleDefault:Element) => {
      if (linkStyleDefault instanceof HTMLElement) {
        linkStyleDefault.style.setProperty('background-color','#faf5f7')
        linkStyleDefault.style.setProperty('color','#000')
      }
    })
    link?.style.setProperty('background-color','#000')
    link?.style.setProperty('color','#fff')
}


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


const navigationInUpMenu = (link:Element) => {
  switch (link.id) {
    case "tracks":
      contentLibrary.innerHTML = ``;
      insertData("https://api.deezer.com/chart/0/tracks");
      verifyMusicList();
      linkVisited = linkTracks;
      styleLinks(linkVisited)
      break;
    case "artists":
      contentLibrary.innerHTML = ``;
      insertData("https://api.deezer.com/chart/0/artists");
      verifyMusicList();
      linkVisited = linkArtists;
      styleLinks(linkVisited)
      break;
     case "albums":
      contentLibrary.innerHTML = ``;
      insertData("https://api.deezer.com/chart/0/albums");
      verifyMusicList();
      linkVisited = linkAlbums;
      styleLinks(linkVisited)
      break;
  }
}

const connectApi = async (endPoint: string): Promise<IData> => {
  handleLoader(loader,"show")
  const resp = await fetch(endPoint).then((resp) => resp.json());
  handleLoader(loader,"none")

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
    if(resp.data.length === 0){
      constructLayouError()
    }

    resp.data.map((cover:IMusic) => {
      const imageLayout: string = url.includes("albums") || url.includes("tracks") || url.includes('?q=') ? cover.artist.picture_big : cover.picture_big;
      const artist: string = url.includes("tracks") ? cover.artist.name : cover.name;
      const title: string = url.includes("artists") ? cover.name : cover.title;
      const preview: string = url.includes("tracks") ? cover.preview : "";
      constructLayout(title, artist, imageLayout, preview);
    });
  });

};

btnExplorer?.addEventListener('click',(e):void => {
  e.preventDefault()
  console.log('ok')
  insertData('https://api.deezer.com/chart/2/tracks')
})

Array.from(linksNav).forEach((link:Element) => {
  link.addEventListener("click", ():void =>{
    navigationInUpMenu(link)
  })
})

searchIcon?.addEventListener('click', ():void =>{
  const seacrhUrl: string = 'https://api.deezer.com/search'
  const searchTerm: string = searchInput.value
  contentLibrary.innerHTML = ``
  insertData(`${seacrhUrl}?q=${searchTerm}`)
})

insertData("https://api.deezer.com/chart/0/tracks");
verifyMusicList();

