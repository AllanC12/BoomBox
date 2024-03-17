import { IMusic, IData } from "../../../interfaces/dataMusic";
import { ILayoutBoxMusic } from "../../../interfaces/Layout";
import { handleLoader } from "../formConfigs/formConfig.js";

const linksNav = document.getElementById("nav-links")
  ?.children as HTMLCollection;
const linksNavAside = document.querySelectorAll(
  ".navigation li span"
) as NodeList;
const linkTracks = document.getElementById("tracks") as HTMLElement;
const linkArtists = document.getElementById("artists") as HTMLElement;
const linkAlbums = document.getElementById("albums") as HTMLElement;

const linkExplorer = document.getElementById("explorer") as HTMLElement;
const linkMyMusics = document.getElementById("myMusics") as HTMLElement;
const linkRecomendations = document.getElementById(
  "recomendations"
) as HTMLElement;
const linkPlaysRecently = document.getElementById(
  "playsRecently"
) as HTMLElement;
const linkRadio = document.getElementById("radio") as HTMLElement;
const linkPlayingNow = document.getElementById("playingNow") as HTMLElement;
const contentLibrary = document.querySelector(
  ".content-library"
) as HTMLElement;
const player = document.getElementById("player") as HTMLElement;
const loader = document.getElementById("loader") as HTMLElement;
const searchForm = document.getElementById("searchForm") as HTMLFormElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const searchIcon = document.getElementById("searchIcon") as HTMLElement;
const musicName = document.getElementById("musicName") as HTMLElement;

let linkVisited: HTMLElement;

class ConstructLayout {

  public layoutError(): void {
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("errorMsg");
    errorMsg.innerText = "Não há resultados encontrados";
    contentLibrary.prepend(errorMsg);
  }

  public getDataFromLayout(url: string, itemApi: IMusic) {
    const title: string = url.includes("artists") ? itemApi.name: itemApi.title;
    const artist: string = url.includes("tracks") ? itemApi.artist.name : itemApi.name;
    const image: string = url.includes("albums") || url.includes("tracks") || url.includes("?q=")  ? itemApi.artist.picture_big : itemApi.picture_big;
    const preview: string = itemApi.preview;
    const idAlbum: number | null = url.includes("albums") ? itemApi.id : null;
    const idArtist: number | null = url.includes("artists") ? itemApi.id : null;

    const dataFromlayout: ILayoutBoxMusic = {
      title,
      artist,
      image,
      preview,
      idAlbum,
      idArtist,
    };

    console.log(image)


    this.layoutBoxMusic(dataFromlayout);
  }

  private layoutBoxMusic(dataLayoutBox: ILayoutBoxMusic): void {
    const { title, artist, image, preview, idAlbum, idArtist } = dataLayoutBox;

    const boxMusic = document.createElement("div");
    const titleMusic: string = title === artist ? "" : title;
    const artistMusic: string | undefined = artist ? artist : "";
    const imageLink: string = image ? image : image


    handleLoader(loader, "show");
    boxMusic.classList.add("box-music");
    boxMusic.innerHTML = `
      <div id='preview-link' idAlbum=${idAlbum} idArtist=${idArtist} preview='${preview}'>
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
    handleLoader(loader, "none");
  }


}

class HandleDataMusic {
  private async connectApi(endPoint: string): Promise<IData> {
    handleLoader(loader, "show");
    const resp = await fetch(endPoint).then((resp) => resp.json());
    handleLoader(loader, "none");

    return resp;
  }

  private playMusic = (source: string | null): void => {
    if (source) {
      player?.style.setProperty("display", "block");
      player?.setAttribute("src", source);
      player?.setAttribute("autoplay", "true");
    }
  };

  private getDataAboutMusic(element: ParentNode) {
    let titleMusicElement = element.children[1].children[0] as HTMLElement;
    let titleMusic: string = titleMusicElement.innerText;
    musicName.innerText = titleMusic;
  }

  private verifyBoxMusic(linkPreview: string | null, element: ParentNode) {
    if (linkPreview === "undefined") {
      //Box de artista ou de album
      const idAlbum = element.children[0].getAttribute("idAlbum")
      const idArtist = element.children[0].getAttribute("idArtist")

      if(idAlbum === 'null'){
        //Box de artista
        const urlArtist = `https://api.deezer.com/artist/${idArtist}/top?limit=50`
        this.insertData(urlArtist)
      }

    }
  }

  // public playersRecently(){
    
  // }

  public verifyMusicList(): void {
    setTimeout(() => {
      if (contentLibrary.children.length > 0) {
        for (let i = 0; i < contentLibrary.children.length; i++) {
          contentLibrary.children[i].addEventListener("click", () => {
            let linkPreview: string | null =
            contentLibrary.children[i].children[0].getAttribute("preview");
            this.verifyBoxMusic(linkPreview, contentLibrary.children[i]);
            this.getDataAboutMusic(contentLibrary.children[i]);
            this.playMusic(linkPreview);
          });
        }
      }
    }, 1000);
  }

  public insertData(url: string): void {
    this.connectApi(url).then((resp: IData) => {
      if (resp.data.length === 0) {
        construct.layoutError();
        return;
      }

      resp.data.map((cover: IMusic) => {
        construct.getDataFromLayout(url, cover);
        console.log(cover)
      });
    });
  }

  public searchMusic(searchTerm: string): void {
    const seacrhUrl: string = "https://api.deezer.com/search";
    contentLibrary.innerHTML = ``;
    dataMusic.insertData(`${seacrhUrl}?q=${searchTerm}`);
    dataMusic.verifyMusicList();
  }
}

class HandleLinks {
  private styleLinks(link: HTMLElement) {
    Array.from(linksNav).forEach((linkStyleDefault: Element) => {
      if (linkStyleDefault instanceof HTMLElement) {
        linkStyleDefault.style.setProperty("background-color", "transparent");
        linkStyleDefault.style.setProperty("color", "#000");
      }
    });
    link?.style.setProperty("background-color", "#000");
    link?.style.setProperty("color", "#fff");
  }

  private resetAndInsertLayout(
    urlContent: string,
    linkVisitedElement: any = null
  ): void {
    contentLibrary.innerHTML = ``;
    dataMusic.insertData(urlContent);
    dataMusic.verifyMusicList();
    linkVisited = linkVisitedElement;
  }

  public callEndPoints(link: Element) {
    switch (link.id) {
      case "tracks":
        this.resetAndInsertLayout(
          "https://api.deezer.com/chart/0/tracks",
          linkTracks
        );
        this.styleLinks(linkVisited);
        break;
      case "artists":
        this.resetAndInsertLayout(
          "https://api.deezer.com/chart/0/artists",
          linkArtists
        );
        this.styleLinks(linkVisited);
        break;
      case "albums":
        this.resetAndInsertLayout(
          "https://api.deezer.com/chart/0/albums",
          linkAlbums
        );
        this.styleLinks(linkVisited);
        break;
      case "explorer":
        this.resetAndInsertLayout(
          "https://api.deezer.com/chart/2/tracks",
          linkExplorer
        );
        break;

      case "myMusics":
        this.resetAndInsertLayout(
          "https://api.deezer.com/chart/2/tracks",
          linkMyMusics
        );
        break;
      case "recomendations":
        this.resetAndInsertLayout(
          "https://api.deezer.com/chart/2/tracks",
          linkRecomendations
        );
        break;
      case "playsRecently":
        this.resetAndInsertLayout(
          "https://api.deezer.com/chart/2/tracks",
          linkPlaysRecently
        );
        break;
      case "radio":
        this.resetAndInsertLayout(
          "https://api.deezer.com/chart/2/tracks",
          linkRadio
        );
        break;
      case "playingNow":
        this.resetAndInsertLayout(
          "https://api.deezer.com/chart/2/tracks",
          linkPlayingNow
        );
        break;
    }
  }
}

const construct = new ConstructLayout();
const dataMusic = new HandleDataMusic();
const manipulateLinks = new HandleLinks();

// linkExplorer?.addEventListener('click',(e):void => {
//   e.preventDefault()
//   dataMusic.insertData('https://api.deezer.com/chart/2/tracks')
// })

Array.from(linksNav).forEach((link: Element) => {
  link.addEventListener("click", (): void => {
    manipulateLinks.callEndPoints(link);
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
dataMusic.verifyMusicList();
