import React, { useState, useEffect } from 'react';

import apiUserFav from './apiUserFav';
import apiTvMaze from './apiTvMaze';

import ListRow from './ListRow';
import Navbar from './Navbar';


export default function Favorites() {

  const [ loadIsFavorite, setLoadIsFavorite ] = useState([]);
  const [ listAllFavoriteShows, setListAllFavoriteShows ] = useState([]);

  useEffect(()=>{
    async function getIsFavorite(){
      const idFavoritedShows = []
      
      const res = await fetch('/favoritarUser', { 
        method:'get',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
       });
       const { data } = res;
      if(data){
        data.filter((item)=>{
          let showId = item.idShow;
          return idFavoritedShows.push(showId)
        })
        setLoadIsFavorite(idFavoritedShows)
      }
    }
    getIsFavorite()
  },[]);

  useEffect(()=>{
    async function getlistAllFavoriteShows(){
      const arrayAllFavoritedShows = []
      const tenta = [1,2,3,74,465,7455]
      setLoadIsFavorite([1,2,3])
      setListAllFavoriteShows(tenta.map(async (id)=>{
        const responseShows = await apiTvMaze.get(`/shows/${id}`);
        if (responseShows){  
          arrayAllFavoritedShows.push(responseShows)
          
        }console.log(listAllFavoriteShows)
        return arrayAllFavoritedShows
       
  
      }))
    }

    getlistAllFavoriteShows()
  },[])



  return (
    <><div>
      {listAllFavoriteShows.length > 0 && listAllFavoriteShows.map((show, key)=>(<div>asd
        {}
      </div>))}</div>
      {console.log(listAllFavoriteShows)}
    </>

  )
}