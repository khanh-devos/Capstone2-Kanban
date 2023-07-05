import * as homeAPI from './homepageAPI.js';

let ALL_LIKES = [];

export const showLikes = async () => {
  ALL_LIKES = await homeAPI.getLikes();

  const likes = document.querySelectorAll('.hp-likes');
  Object.values(likes).forEach((item) => {
    const id = item.id.split('-')[0];
    const likes = ALL_LIKES.find((e) => e.item_id === id);
    if (likes) item.innerHTML = `${likes.likes} likes`;
    else item.innerHTML = `${0} likes`;
  });
};

export const addLike = async (updateLike) => {
  fetch(`${homeAPI.LIKES_URL}apps/${homeAPI.APP}/likes`, {
    method: 'POST',
    body: JSON.stringify(updateLike),
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
  })
    .then(() => showLikes());
};

export const melike = (event) => {
  const isExisting = ALL_LIKES.find((e) => e.item_id === event.target.name);

  const updateLike = {
    item_id: event.target.name,
    likes: 0,
  };

  if (isExisting) updateLike.likes = isExisting.likes + 1;

  addLike(updateLike);
};

export const moviesCounter = (movies) => {
  if (movies) {
    if (movies.length <= 20) {
      document.querySelector('#episode-counter').innerHTML = `Episode(${movies.length})`;
    } else return false;
  } else {
    document.querySelector('#homepage-ul').innerHTML = 'fetching failed !';
  }

  return true;
};

export const listItems = async () => {
  const movies = await homeAPI.getMovies();
  const check = moviesCounter(movies);
  const homepageUl = document.querySelector('#homepage-ul');

  if (!check) {
    homepageUl.innerHTML = 'Too many Movies';
    return;
  }

  const listLi = movies.map((item) => `
    <li class='hp-ul-li'>
      <image class='hp-ul-li-img' src='${item.image.medium}'
        width="100%"
      />

      <div class='hp-ul-li-div'>
        <h3>${item.name}</h3>
        <button class='hp-heart-btn' name='${item.id}'>
        heart
        </button>
      </div>
      
      <h5 class='hp-likes' id='${item.id}-likes'>likes</h5>

      <button class='hp-comment-btn' name='${item.id}'>Comments</button>
    </li>
  
  `);

  homepageUl.innerHTML = listLi.join(' ');

  const btns = document.querySelectorAll('.hp-heart-btn');
  Object.values(btns).forEach((item) => {
    item.addEventListener('click', melike);
  });
};