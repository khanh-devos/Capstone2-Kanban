import { ALL_LIKES, showLikes } from "./hompage";

const URL = 'https://api.tvmaze.com/seasons/1/episodes';
const LIKES_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const LENGTH = 6;
const APP = 'WJMi62Cw2ldmsCpFe58w';

export const getMovies = async () => {
  let movies = [];

  await fetch(URL)
    .then(async (res) => {
      movies = await res.json();
    })
    .catch((err) => {
      movies = [];
    });

  return movies.slice(0, LENGTH);
};

export const addLike = (updateLike) => {
  fetch(LIKES_URL + `apps/${APP}/likes`, {
    method: 'POST',
    body: JSON.stringify(updateLike),
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  })
  .then(async (res) => {
    await showLikes();
  })
}

export const getLikes = async (item_id) => {
  let all_likes = [];

  await fetch(LIKES_URL + `apps/${APP}/likes`)
  .then(async res => {
    all_likes = await res.json();
  })

  return all_likes
}