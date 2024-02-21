export interface ITrack {
  id: number,
  title: string,
  artist: {
    name: string
  },
  preview: string
}

export interface IArtist {
  id: number,
  name: string,
  link: string
}

export interface IAlbum {
  id: number,
  artist: {
    name:string,
    picture_big:string
  }
}

export interface IMusic {
  title:string,
  name: string,
  album: Object,
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

