import axios from 'axios';

const apiUserFav = axios.create({
  baseURL: 'http://localhost:3333',
});


export default apiUserFav;