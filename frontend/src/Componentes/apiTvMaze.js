import axios from 'axios';

const apiTvMaze = axios.create({
  baseURL: 'http://api.tvmaze.com',
})


const FullGenresList = async (list)=>{
  const allGenres = []
  const allShows = list;
  
  allShows.map((show) => {
    const {genres} = show
    return genres.filter(item => allGenres.push(item))
  });

  const setUniqueGenre = new Set(allGenres);
  const arrayUniqueGenre = [...setUniqueGenre].sort((a, b) => a < b ? -1 : 1);
  
  return arrayUniqueGenre

};


export const ShowsByGenre = async ()=>{   

  const allShowsByGenre = [];
  const allShows = await apiTvMaze.get('/shows');
  const genresList = await FullGenresList(allShows.data);
  
  genresList.filter((genre)=>{
    let objetoShowByGenre = {
      genre: genre,
      shows: allShows.data.filter((show)=>{
        let genres = show.genres
        if(genres.includes(genre) === true && show !== undefined){
          return show
        }
      })  
    }
    return allShowsByGenre.push(objetoShowByGenre)
  })

    return allShowsByGenre
};


export default apiTvMaze;