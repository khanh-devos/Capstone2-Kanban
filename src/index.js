import './style.css';
import * as home from './modules/hompage.js';
import * as comment from './modules/commentPopup';
import * as commentAPI from './modules/commentPopupAPI';

home.listItems();
home.showLikes();

comment.commentClose();
document.querySelector('#cm-submit-comment').addEventListener('click', commentAPI.submitComment);
