import * as commentAPI from './commentPopupAPI.js';

const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const APP = 'WJMi62Cw2ldmsCpFe58w';

export const commentCounter = async (itemId) => {
  const comments = await commentAPI.getComments(itemId);
  console.log(comments);

  if (comments) {
    if(comments.length <= 20) {
      return comments
    }
    else {
      const commentLi = "<tr class='cm-li'><td colspan=3>over 10 comments</td></tr>";
      document.querySelector('#cm-movie-existing-comment').innerHTML = commentLi;
    }
  }
  else {
    const commentLi = "<tr class='cm-li'><td colspan=3>No comments found!</td></tr>";
    document.querySelector('#cm-movie-existing-comment').innerHTML = commentLi;
  }

  return null
}

export const commentPopup = async (itemId, movie) => {
  const commentElem = document.querySelector('#commentPopup');
  document.querySelector('body').style.overflow = 'hidden'; 

  commentElem.style.display = 'block';
  document.querySelector('#cm-movie-img').src = movie.image.original;
  document.querySelector('#cm-movie-title').innerHTML = movie.name;
  document.querySelector('#cm-movie-details').innerHTML = movie.summary;
  document.querySelector('#cm-movie-type').innerHTML = movie.type;
  document.querySelector('#cm-movie-runtime').innerHTML = movie.runtime;
  document.querySelector('#cm-movie-rating').innerHTML = movie.rating.average;
  document.querySelector('#cm-submit-comment').setAttribute('item-id', itemId);

  const comments = await commentCounter(itemId);
  if (!comments) return;

  const commentLi = comments.map((item) => `
    <tr class='cm-li'>
      <td>${item.comment}</td> 
      <td>${item.username}</td> 
      <td>${item.creation_date}</td>
    </tr>
  `);

  document.querySelector('#cm-movie-existing-comment').innerHTML = commentLi.join(' ');

};

export const commentShow = (movies) => {
  const commentTarget = document.querySelector('#homepage');
  commentTarget.addEventListener('click', (e) => {
    if (e.target instanceof HTMLButtonElement) {
      const itemId = parseInt(e.target.attributes.name.nodeValue, 10);
      const movie = movies.find(e => e.id === itemId);
      
      commentPopup(itemId, movie);
    }
  });
};

export const commentClose = () => {
  const commentClose = document.querySelector('.cm-close-comment-popup');
  
  const commentPopupClose = () => {
    const commentElem = document.querySelector('#commentPopup');
    commentElem.style.display = 'none';
    document.querySelector('body').style.overflow = 'auto'; 
  };

  commentClose.addEventListener('click', commentPopupClose);
};


