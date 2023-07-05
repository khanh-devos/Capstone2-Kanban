import { APP } from "./homepageAPI";

export const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

export const getComments = async (itemId) => {
  let movies = [];

  await fetch(`${BASE_URL}apps/${APP}/comments?item_id=${itemId}`)
    .then(async (res) => {
      movies = await res.json();
    })
    .catch(() => {
      movies = null;
    });

  return movies;
};
