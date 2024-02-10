import { IMusicChart } from "../../../interfaces/dataMusic"

const connectApi = async (endPoint: string):Promise<IMusicChart> => {
  const resp = await fetch(endPoint).then(resp => resp.json())
  return resp
}


// const constructLayout = ():void => {

// }

const insetData = ():void => {
  connectApi('https://api.deezer.com/chart/0').then(resp => {
    console.log(resp.tracks)
  })
  
}

insetData()
