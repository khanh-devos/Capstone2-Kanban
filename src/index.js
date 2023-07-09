import './style.css';
import * as home from './modules/hompage.js';
import * as comment from './modules/commentPopup.js';

home.listItems();

comment.commentClose();
document.querySelector('#cm-submit-comment').addEventListener('click', comment.submitComment);
