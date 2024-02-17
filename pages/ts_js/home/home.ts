import { IMusicChart } from "../../../interfaces/dataMusic"

const linksNav = document.getElementById('nav-links')?.children as HTMLCollection

const linkTracks = document.getElementById('tracks') as HTMLElement
const linkArtists = document.getElementById('artists') as HTMLElement
const linkAlbums = document.getElementById('albums') as HTMLElement
let linkVisited: HTMLElement;

const styleLink = (linkVisited: HTMLElement) => {
  for(let i = 0; i < linksNav.length; i++){
    linksNav[i].addEventListener('click',(e) => {
      e.preventDefault()
      console.log(linksNav[i])
      linkVisited?.style.setProperty('background-color','#faf5f7')
      linkVisited?.style.setProperty('color','#000')
      linksNav[i]?.style.setProperty('background-color','#262525')
      linksNav[i]?.style.setProperty('color','#fff')
      linkVisited = linksNav[i]
    })
  }
 
}

const connectApi = async (endPoint: string):Promise<IMusicChart> => {
  const resp = await fetch(endPoint).then(resp => resp.json())
  return resp
}


const constructLayout = ( title: string,image: String): void => {
  const contentLibrary = document.querySelector('.content-library') as HTMLElement
  const boxMusic = document.createElement("div");
  boxMusic.classList.add("box-music");
  boxMusic.innerHTML = `  <div class="image-box"><img src='${image}'/></div>
  <div class="title-music">
      <p class="title">
          ${title}
      </p>
  </div>`;
  contentLibrary.appendChild(boxMusic)
};

const insertData = (url:string): void => {
  connectApi(url).then((resp: any) => {
    resp.tracks.data.map((album: any) => {
      const titleAlbum: String = album.title;
      const artistName: String = album.artist.name;
      const imageLayout: String = album.artist.picture_big;
      constructLayout(`${titleAlbum} - ${artistName}`, imageLayout);
    });
  });
   
 styleLink(linkVisited)

};

// const selectMusic = 

insertData("https://api.deezer.com/chart/0");
