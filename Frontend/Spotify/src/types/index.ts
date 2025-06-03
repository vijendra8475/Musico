export interface Song {
    _id : string,
    title : string,
    artist : string,
    album : string | null,
    imageUrl : string,
    audioUrl : string,
    duration : number,
    createdAt : string,
    updatedAt : string
}

export interface Album {
    _id : string,
    title : string,
    artist : string,
    imageUrl : string,
    releaseYear : number,
    songs : Song[]
}

export interface Stats {
    totalSongs : number,
    totalArtists : number,
    totalAlbums : number,
    totalUsers : number
}