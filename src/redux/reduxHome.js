import { reduxAddLike, reduxGetLikes } from './likes/likeSlice';
import { showLikes } from '../modules/hompage';

export const showReduxLikes = (store) => {
  const { likes: ALL_LIKES } = store.getState().like;
  const hearts = document.querySelectorAll('.redux-likes');

  Object.values(hearts).forEach((item) => {
    const id = item.id.split('-')[0];
    const episode = ALL_LIKES.find((e) => e.item_id === id);
    if (episode) item.innerHTML = `${episode.likes} likes`;
    else item.innerHTML = `${0} likes`;
  });
};

export const reduxMelike = async (event, store) => {
  const id = event.target.id.split('-')[0];
  const { likes: ALL_LIKES } = store.getState().like;
  const isExisting = ALL_LIKES.find((e) => e.item_id === id);

  const updateLike = {
    item_id: id,
    likes: 0,
  };
  if (isExisting) updateLike.likes = isExisting.likes + 1;

  await store.dispatch(reduxAddLike(updateLike));
  store.dispatch(reduxGetLikes());
  showReduxLikes(store);
};

export const showListEpisodes = (store) => store.subscribe(() => {
  const { movies } = store.getState().movie;
  if (!movies) return;

  const listLi = movies.map((item) => `
    <li class='redux-ul-li'>
      <image class='hp-ul-li-img' alt="movie cover" src='${item.image.medium}'
        width="100%"
      />

      <div class='hp-ul-li-div'>
        <h3 class='item-title'>${item.name}</h3>
        <span class="material-symbols-outlined redux-heart" 
        id='${item.id}-heart'>
          favorite
        </span>
      </div>
      
      <h5 class='redux-likes' id='${item.id}-likes'>likes</h5>

      <button class='hp-comment-btn' name='${item.id}' id='${item.id}'>Comments</button>
    </li>
  
  `);
  const reduxHomeUl = document.querySelector('#redux-home-ul');
  reduxHomeUl.innerHTML = listLi.join(' ');

  // showReduxLikes
  showReduxLikes(store);

  // add new like:
  const h5 = document.querySelectorAll('.redux-heart');
  Object.values(h5).forEach((item) => {
    item.addEventListener('click', (event) => reduxMelike(event, store));
  });
});

export const changePage = (event, store) => {
  event.preventDefault();
  const { id } = event.currentTarget;

  const headerLink = document.querySelectorAll('.header-a');
  Object.values(headerLink).forEach((link) => {
    const pageID = link.id.split('-')[1] || null;
    if (!pageID) return;

    const page = document.querySelector(`#${pageID}`);
    if (!page) return;

    if (link.id === id) page.style.display = 'block';
    else page.style.display = 'none';

    // refesh everything to synchronize any change between Redux or Vanila.
    store.dispatch(reduxGetLikes('random'));
    showLikes();

    // change back ground
    const body = document.querySelector('body');
    body.classList.toggle('redux-bg-img');
  });
};