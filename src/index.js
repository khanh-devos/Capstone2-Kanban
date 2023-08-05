import { listItems } from './modules/hompage.js';
import * as comment from './modules/commentPopup.js';
import './style.css';
import { changePage, showListEpisodes, store } from './redux/reduxHome';
import { reduxGetEpisodes } from './redux/movies/movieSlice.js';
import { reduxGetLikes } from './redux/likes/likeSlice.js';

store.dispatch(reduxGetEpisodes('random'));
store.dispatch(reduxGetLikes('random'));
showListEpisodes();

listItems();
comment.commentClose();
document.querySelector('#cm-submit-comment').addEventListener('click', comment.submitComment);

const headerLink = document.querySelectorAll('a[class="header-a"]');
Object.values(headerLink).forEach((e) => {
  e.addEventListener('click', changePage);
});