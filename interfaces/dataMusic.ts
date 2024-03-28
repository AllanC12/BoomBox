export interface IMusic {
  album: {
    cover_big: string;
  };
  artist: {
    name: string;
    picture_big: string;
  };
  title: string;
  name: string;
  id: number;
  picture_big: string;
  preview: string;
}

export interface IData {
  data: [];
  total: number;
}

export interface IGenre {
  id: number;
  name: string
  picture: string
  picture_big: string
  picture_medium: string

}