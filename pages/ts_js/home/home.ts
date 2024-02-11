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

  });
};

insetData()
