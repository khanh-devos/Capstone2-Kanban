import { APP, LIKES_URL } from './homepageAPI.js';

export default async function getComments(itemId) {
  let comments = [];

  await fetch(`${LIKES_URL}apps/${APP}/comments?item_id=${itemId}`)
    .then(async (res) => {
      if (res.ok && res.status === 200) comments = await res.json();
    })
    .catch(() => {
      comments = [];
    });

  return comments;
}