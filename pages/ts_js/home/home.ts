import { IMusicChart } from "../../../interfaces/dataMusic"

const connectApi = async (endPoint: string):Promise<IMusicChart> => {
  const resp = await fetch(endPoint).then(resp => resp.json())
  return resp
}


const constructLayout = (image: string, title: string): void => {
  const boxMusic = document.createElement("div");
  boxMusic.classList.add("box-music");
  boxMusic.innerHTML = `  <div class="image-box">${image}</div>
  <div class="title-music">
      <p class="title">
          ${title}
      </p>
  </div>`;
};

const insetData = (): void => {
  connectApi("https://api.deezer.com/chart/0").then((resp) => {
    resp.albums.data.forEach((data) => {
      const title = data.albums.data[0].name
      console.log(title)
      // constructLayout()
    })
    const title = resp.albums.data[data].name
    console.log(resp.albums.data[0].artist.name);
  });
};

insetData()
