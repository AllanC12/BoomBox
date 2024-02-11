import { IMusicChart } from "../../../interfaces/dataMusic"

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

const insetData = (): void => {
  connectApi("https://api.deezer.com/chart/0").then((resp:any) => {
     resp.albums.data.map((album: any) => {
      const titleAlbum: String = album.title
      console.log(album)
      const artistName: String = album.artist.name
      const imageLayout: String = album.artist.picture_big
      constructLayout(`${titleAlbum} - ${artistName}`,imageLayout)
     })
  
  });
};

insetData()
