import { IMusic, IData } from "../../../interfaces/dataMusic";
import { ILayoutBoxMusic } from "../../../interfaces/Layout";
import { handleLoader } from "../formConfigs/formConfig.js";

const linksNav = document.getElementById("nav-links")
  ?.children as HTMLCollection;
const linksNavAside = document.querySelectorAll(
  ".navigation li span"
) as NodeList;
const contentLibrary = document.querySelector(
  ".content-library"
) as HTMLElement;
const player = document.getElementById("player") as HTMLElement;
const loader = document.getElementById("loader") as HTMLElement;
const searchForm = document.getElementById("searchForm") as HTMLFormElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const searchIcon = document.getElementById("searchIcon") as HTMLElement;
const musicName = document.getElementById("musicName") as HTMLElement;
const titleMusicElement = document.querySelector('.title-music') as HTMLElement
const boxImageMusicPlayer = document.querySelector('.img-music') as HTMLElement
const imageMusicPlayer = document.querySelector('.img-music img') as HTMLElement

let linkVisited: HTMLElement;
let layoutLoaded: boolean = false;

class ConstructLayout {
  
  public layoutError(): void {
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("errorMsg");
    errorMsg.innerText = "Não há resultados encontrados";
    contentLibrary.prepend(errorMsg);
  }

  public getDataFromLayoutMusic(url: string, itemApi: IMusic) {
    const title: string = url.includes("artists")
      ? itemApi.name
      : itemApi.title;
    const artist: string = url.includes("tracks")
      ? itemApi.artist.name
      : itemApi.name;
    const imageArtist: string = url.includes("top?limit")
      ? itemApi.album.cover_big
      : "";
    const imageAlbums: string = url.includes("albums")
      ? itemApi.artist.picture_big
      : itemApi.picture_big;
    const imageTracks: string =
      url.includes("tracks") || url.includes("?q=")
        ? itemApi.artist.picture_big
        : itemApi.picture_big;
    const imageAlbumSingle: string | null = url.includes("/album/")
      ? sessionStorage.getItem("image_album_single")
      : null;
    const preview: string = itemApi.preview;
    const idAlbum: number | null = url.includes("albums") ? itemApi.id : null;
    const idArtist: number | null = url.includes("artists") ? itemApi.id : null;

    const dataFromlayout: ILayoutBoxMusic = {
      title,
      artist,
      image: imageTracks || imageArtist || imageAlbums || imageAlbumSingle,
      preview,
      idAlbum,
      idArtist,
    };

    this.layoutBoxMusic(dataFromlayout);

  }

  private layoutBoxMusic(dataLayoutBox: ILayoutBoxMusic): void {
    const { title, artist, image, preview, idAlbum, idArtist } = dataLayoutBox;

    const boxMusic = document.createElement("div");
    const titleMusic: string = title === artist ? "" : title;
    const artistMusic: string = artist ? artist : "";

    handleLoader(loader, "show");

    boxMusic.classList.add("box-music");
    boxMusic.setAttribute("id_album", `${idAlbum}`);
    boxMusic.setAttribute("id_artist", `${idArtist}`);
    boxMusic.setAttribute("preview_music", `${preview}`);
    boxMusic.setAttribute("preview_image", `${image}`);
    boxMusic.setAttribute("preview_image_album", `${image}`);

    boxMusic.innerHTML = `
      <div id='preview-link'>
       <div class='image-box'>
         <img  src='${image}'/></div>
       </div>
          <h4 class="title">
              ${titleMusic} - ${artistMusic}
          </h4>
        </div>
      `;
    contentLibrary.prepend(boxMusic);
    handleLoader(loader, "none");

  }

  public resetAndInsertLayout(urlContent: string): void {
    contentLibrary.innerHTML = ``;
    dataMusic.insertData(urlContent);
  }


}

class HandleDataMusic {

  private async connectApi(endPoint: string): Promise<IData> {
    handleLoader(loader, "show");
    const resp = await fetch(endPoint).then((resp) => resp.json());
    handleLoader(loader, "none");

    return resp;
  }

  private applyImageInPlayer(preview_image: string | null){
    if(preview_image){
      boxImageMusicPlayer?.style.setProperty("display", "block");
      imageMusicPlayer?.setAttribute('src',preview_image)
    }


  }

  private playMusic = (source: string | null,preview_image: string | null): void => {
    if (source?.includes("https://")) {
      player?.style.setProperty("display", "block");
      player?.setAttribute("src", source);
      player?.setAttribute("autoplay", "true");
    }
    this.applyImageInPlayer(preview_image)
  };

  private getDataAboutMusic(element: Element) {
    let titleMusicElement = element.children[1] as HTMLElement;

    let linkImageAlbum: string | null = element.getAttribute("preview_image_album");
    
    if (linkImageAlbum) {
      sessionStorage.setItem("image_album_single", linkImageAlbum);
    }
    
    let titleMusic: string = titleMusicElement.innerText;
    musicName.innerText = titleMusic;
  }

  private verifyBoxMusic(linkPreview: string | null, element: Element ) {
      const idAlbum = element.getAttribute("id_album");
      const idArtist = element.getAttribute("id_artist");
      const preview_image = element.getAttribute("preview_image");

      this.getDataAboutMusic(element)

      if(linkPreview === 'undefined'){

        if (idArtist !== "null") {
          const urlArtist = `https://api.deezer.com/artist/${idArtist}/top?limit=50`;
          construct.resetAndInsertLayout(urlArtist)
        }
  
        if (idAlbum !== "null") {
          const urlAlbum = `https://api.deezer.com/album/${idAlbum}/tracks`; 
          construct.resetAndInsertLayout(urlAlbum)
        }

      }else{
        this.playMusic(linkPreview,preview_image);
        console.log(preview_image)
      }

  }

  public verifyMusicList(): void {

    if (layoutLoaded) {
      for (let i = 0; i < contentLibrary.children.length; i++) {
        contentLibrary.children[i].addEventListener("click", (e) => {
            let linkPreview: string | null = contentLibrary.children[i].getAttribute("preview_music");
            this.verifyBoxMusic(linkPreview, contentLibrary.children[i]);
        });
        
      }
    }
  }

  public async insertData(url: string): Promise<void> {

    await this.connectApi(url).then((resp: IData) => {  
      if (resp.data.length === 0) {
          construct.layoutError();
          return;
        }

      resp.data.map((cover: IMusic) => {
        construct.getDataFromLayoutMusic(url, cover);
      });
    });
    
    layoutLoaded = true;

    dataMusic.verifyMusicList();
    
    return
  }

  public searchMusic(searchTerm: string): void {
    const seacrhUrl: string = "https://api.deezer.com/search";
    contentLibrary.innerHTML = ``;
    dataMusic.insertData(`${seacrhUrl}?q=${searchTerm}`);
    dataMusic.verifyMusicList();
  }
}

class HandleLinks {
  public linksStyle(linkStyled: HTMLElement): void {
    linkVisited?.style.setProperty("background-color", "transparent");
    linkVisited?.style.setProperty("color", "#000");
    linkStyled?.style.setProperty("background-color", "#000");
    linkStyled?.style.setProperty("color", "#fff");
    linkVisited = linkStyled;
  }

  public callEndPoints(link: Element) {
    switch (link.id) {
      case "tracks":
        construct.resetAndInsertLayout("https://api.deezer.com/chart/0/tracks");
        break;
      case "artists":
        construct.resetAndInsertLayout("https://api.deezer.com/chart/0/artists");
        break;
      case "albums":
        construct.resetAndInsertLayout("https://api.deezer.com/chart/0/albums");
        break;
      case "explorer":
        construct.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks");
        break;
      case "myMusics":
        construct.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks");
        break;
      case "recomendations":
        construct.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks");
        break;
      case "playsRecently":
        construct.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks");
        break;
      case "radio":
        construct.resetAndInsertLayout("https://api.deezer.com/radio/37151/tracks");
        break;
      case "playingNow":
        construct.resetAndInsertLayout("https://api.deezer.com/chart/2/tracks");
        break;
    }
  }
}

const construct = new ConstructLayout();
const dataMusic = new HandleDataMusic();
const manipulateLinks = new HandleLinks();

Array.from(linksNav).forEach((link: Element) => {
  link.addEventListener("click", (e): void => {
    manipulateLinks.callEndPoints(link);
    if (e.target instanceof HTMLElement) {
      manipulateLinks.linksStyle(e.target);
    }
  });
});

Array.from(linksNavAside).forEach((link: any) => {
  link.addEventListener("click", (): void => {
    manipulateLinks.callEndPoints(link);
  });
});

searchForm?.addEventListener("submit", (e): void => {
  e.preventDefault();
  dataMusic.searchMusic(searchInput.value);
});

searchIcon?.addEventListener("click", (): void => {
  dataMusic.searchMusic(searchInput.value);
});

dataMusic.insertData("https://api.deezer.com/chart/0/tracks");

