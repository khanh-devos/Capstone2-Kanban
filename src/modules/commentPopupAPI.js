import { APP, LIKES_URL } from './homepageAPI.js';

export default async function getComments(itemId) {
  let movies = [];

  await fetch(`${LIKES_URL}apps/${APP}/comments?item_id=${itemId}`)
    .then(async (res) => {
      if (res.ok && res.status === 200) movies = await res.json();
      else movies = null;
    });

  return movies;
}