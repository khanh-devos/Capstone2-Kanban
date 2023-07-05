import './style.css';
import * as home from './modules/hompage.js';
import * as comment from './modules/commentPopup';

home.listItems();
home.showLikes();
comment.commentShow();
comment.commentClose();
comment.commentSubmit();
