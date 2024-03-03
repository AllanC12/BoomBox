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

class ConstructLayout {

  public layoutError (): void{
    const errorMsg = document.createElement('p')
    errorMsg.classList.add('errorMsg')
    errorMsg.innerText = 'Não há resultados encontrados'
    contentLibrary.prepend(errorMsg)
  }

  public layoutBoxMusic(  title: string,artist: string,image: String,preview: string):void {
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
  }
}

class HandleDataMusic{

  private async connectApi(endPoint: string): Promise<IData> {
    handleLoader(loader,"show")
    const resp = await fetch(endPoint).then((resp) => resp.json());
    handleLoader(loader,"none")
  
    return resp;
  }

 private playMusic = (source: string | null): void => {
    if (source) {
      player?.setAttribute("src", source);
      player?.setAttribute("autoplay", "true");
    }
  }

  public verifyMusicList ():void {
    setTimeout(() => {
      if (contentLibrary.children.length > 0) {
        for (let i = 0; i < contentLibrary.children.length; i++) {
          contentLibrary.children[i].addEventListener("click", () => {
            let linkPreview: string | null =
            contentLibrary.children[i].children[0].getAttribute("preview");
            this.playMusic(linkPreview);
          });
        }
      }
    }, 2000);
  }


  public insertData (url: string): void {
    this.connectApi(url).then((resp: IData) => {
      if(resp.data.length === 0){
        construct.layoutError()
      }
  
      resp.data.map((cover:IMusic) => {
        const imageLayout: string = url.includes("albums") || url.includes("tracks") || url.includes('?q=') ? cover.artist.picture_big : cover.picture_big;
        const artist: string = url.includes("tracks") ? cover.artist.name : cover.name;
        const title: string = url.includes("artists") ? cover.name : cover.title;
        const preview: string = url.includes("tracks") ? cover.preview : "";
        construct.layoutBoxMusic(title, artist, imageLayout, preview);
      });
    });
  }

}

class HandleLinks {
  private styleLinks (link:HTMLElement) {
    Array.from(linksNav).forEach((linkStyleDefault:Element) => {
      if (linkStyleDefault instanceof HTMLElement) {
        linkStyleDefault.style.setProperty('background-color','#faf5f7')
        linkStyleDefault.style.setProperty('color','#000')
      }
    })
    link?.style.setProperty('background-color','#000')
    link?.style.setProperty('color','#fff')
  }

  public navigationInUpMenu (link:Element){
    switch (link.id) {
      case "tracks":
        contentLibrary.innerHTML = ``;
        dataMusic.insertData("https://api.deezer.com/chart/0/tracks");
        dataMusic.verifyMusicList();
        linkVisited = linkTracks;
        this.styleLinks(linkVisited)
        break;
      case "artists":
        contentLibrary.innerHTML = ``;
        dataMusic.insertData("https://api.deezer.com/chart/0/artists");
        dataMusic.verifyMusicList();
        linkVisited = linkArtists;
        this.styleLinks(linkVisited)
        break;
       case "albums":
        contentLibrary.innerHTML = ``;
        dataMusic.insertData("https://api.deezer.com/chart/0/albums");
        dataMusic.verifyMusicList();
        linkVisited = linkAlbums;
        this.styleLinks(linkVisited)
        break;
    }
  }
}

const construct = new ConstructLayout()
const dataMusic = new HandleDataMusic()
const manipulateLinks  = new HandleLinks()

btnExplorer?.addEventListener('click',(e):void => {
  e.preventDefault()
  console.log('ok')
  dataMusic.insertData('https://api.deezer.com/chart/2/tracks')
})

Array.from(linksNav).forEach((link:Element) => {
  link.addEventListener("click", ():void =>{
    manipulateLinks.navigationInUpMenu(link)
  })
})

searchIcon?.addEventListener('click', ():void =>{
  const seacrhUrl: string = 'https://api.deezer.com/search'
  const searchTerm: string = searchInput.value
  contentLibrary.innerHTML = ``
  dataMusic.insertData(`${seacrhUrl}?q=${searchTerm}`)
})

dataMusic.insertData("https://api.deezer.com/chart/0/tracks");
dataMusic.verifyMusicList();

