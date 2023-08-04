import * as comment from './commentPopup.js';
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
  await fetch(`${homeAPI.LIKES_URL}apps/${homeAPI.APP}/likes`, {
    method: 'POST',
    body: JSON.stringify(updateLike),
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
  })
    .then(() => {
      showLikes();
    });
};

export const melike = (event) => {
  const id = event.target.id.split('-')[0];
  const isExisting = ALL_LIKES.find((e) => e.item_id === id);

  const updateLike = {
    item_id: id,
    likes: 0,
  };

  if (isExisting) updateLike.likes = isExisting.likes + 1;

  addLike(updateLike);
};

export const moviesCounter = (element) => element.childElementCount;

export const listItems = async () => {
  const movies = await homeAPI.getMovies();
  const homepageUl = document.querySelector('#homepage-ul');

  if (!movies) return;

  const listLi = movies.map((item) => `
    <li class='hp-ul-li'>
      <image class='hp-ul-li-img' alt="movie cover" src='${item.image.medium}'
        width="100%"
      />

      <div class='hp-ul-li-div'>
        <h3 class='item-title'>${item.name}</h3>
        <span class="material-symbols-outlined heart" 
        id='${item.id}-heart'>
          favorite
        </span>
      </div>
      
      <h5 class='hp-likes' id='${item.id}-likes'>likes</h5>

      <button class='hp-comment-btn' name='${item.id}' id=''${item.id}>Comments</button>
    </li>
  
  `);
  homepageUl.innerHTML = listLi.join(' ');

  const spans = document.querySelectorAll('.heart');
  Object.values(spans).forEach((item) => {
    item.addEventListener('click', melike);
  });

  // show likes
  await showLikes();

  // check movies in the DOM.
  document.querySelector('#episode-counter').innerHTML = `Episode(${moviesCounter(homepageUl)})`;

  // activate the comment page.
  comment.commentShow(movies);
};
