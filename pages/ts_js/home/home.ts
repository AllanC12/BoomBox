import { IMusicChart } from "../../../interfaces/dataMusic"

let linkVisited: HTMLElement;
const linksNav = document.getElementById('nav-links')?.children as HTMLCollection
const linkTracks = document.getElementById('tracks') as HTMLElement
const linkArtists = document.getElementById('artists') as HTMLElement
const linkAlbums = document.getElementById("albums") as HTMLElement;
const contentLibrary = document.querySelector(".content-library") as HTMLElement;
const player = document.getElementById('player') as HTMLElement

const styleLinks = (link:HTMLElement,linkVisited:HTMLElement):void => {
  link?.style.setProperty("background-color", "#262525");
  link?.style.setProperty("color", "#fff")
  linkVisited?.style.setProperty('background-color','#faf5f7')
  linkVisited?.style.setProperty('color','#000')
}

console.log(player)
for (let i = 0; i < linksNav.length; i++) {
  linksNav[i].addEventListener("click", (e) => {   
    e.preventDefault();
    switch (linksNav[i].id) {
      case "tracks":
        contentLibrary.innerHTML = ``
        insertData("https://api.deezer.com/chart/0/tracks");
        styleLinks(linkTracks,linkVisited);
        linkVisited = linkTracks
        break;
      case "artists":
        contentLibrary.innerHTML = ``
        insertData("https://api.deezer.com/chart/0/artists");
        styleLinks(linkArtists,linkVisited);
        linkVisited = linkArtists
        break;
      case "albums":
        contentLibrary.innerHTML = ``
        insertData("https://api.deezer.com/chart/0/albums");
        styleLinks(linkAlbums,linkVisited);
        linkVisited = linkAlbums
        break;
    }
  });
}

const connectApi = async (endPoint: string): Promise<IMusicChart> => {
  const resp = await fetch(endPoint).then((resp) => resp.json());
  return resp;
};

const constructLayout = (title: string, image: String,preview: string): void => {

  const boxMusic = document.createElement("div");

  boxMusic.classList.add("box-music");
  boxMusic.innerHTML = `
  <div id='preview-link' preview='${preview}'>
    <div class="image-box">
     <img src='${image}'/></div>
    </div>
     <div class="title-music">
       <p class="title">
           ${title}
       </p>
       </div>
    </div>
  `;
  contentLibrary.prepend(boxMusic);
};

const insertData = (url: string): void => {
  connectApi(url).then((resp: any) => {
    console.log(resp);
    resp.data.map((album: any) => {
      const imageLayout: String = url.includes('albums') || url.includes('tracks') ? album.artist.picture_big : album.picture_big;
      const artist: String = url.includes('tracks') ? album.artist.name : album.name;
      const title: String = url.includes('artists') ? album.name : album.title;
      const preview: string = url.includes('tracks') ? album.preview : ''
      constructLayout(`${title} - ${artist}`, imageLayout,preview);
    });
  });
};

insertData("https://api.deezer.com/chart/0/tracks");

const playMusic = (source:string | null) => {
  if(source){
    player?.setAttribute('src',source)
    player?.setAttribute('autoplay','true')
  }
}

setTimeout(() => {
  if(contentLibrary.children.length > 0){
    for(let i = 0; i < contentLibrary.children.length; i++){
      contentLibrary.children[i].addEventListener('click',() => {
        let linkPreview: string | null = contentLibrary.children[i].children[0].getAttribute('preview')
        playMusic(linkPreview)
      })
    }
  }
},2000)



