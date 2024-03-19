

export interface IMusic {
  title:string,
  name: string,
  album: {
    cover_big: string
  },
  id:number
  artist: {
    name:string,
    picture_big:string
  },
  picture_big: string
  preview: string
}

export interface IData {
  data: [],
  total: number
}

