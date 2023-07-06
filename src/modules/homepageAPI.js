const URL = 'https://api.tvmaze.com/seasons/1/episodes';
export const LIKES_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
export const APP = 'WJMi62Cw2ldmsCpFe58w';

export const getMovies = async () => {
  let movies = [];

  await fetch(URL)
    .then(async (res) => {
      movies = await res.json();
    })
    .catch(() => {
      movies = null;
    });

  return movies;
};

export const getLikes = async () => {
  let allLikes = [];

  await fetch(`${LIKES_URL}apps/${APP}/likes`)
    .then(async (res) => {
      if (res.ok && res.status === 200) allLikes = await res.json();
    });

  return allLikes;
};