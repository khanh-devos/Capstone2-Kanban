import getComments from './commentPopupAPI.js';
import { APP, LIKES_URL } from './homepageAPI.js';

export const commentCounter = (element) => element.children.length;

export const updateComment = async (itemId) => {
  const comments = await getComments(itemId);
  if (!comments) return;

  const commentLi = comments.map((item) => `
    <tr class='cm-li'>
    <td>${item.comment}</td> 
    <td>${item.username}</td> 
    <td>${item.creation_date}</td>
    </tr>
  `);

  const commentBox = document.querySelector('#cm-movie-existing-comment');
  commentBox.innerHTML = commentLi.join(' ');

  document.querySelector('#comments-number').innerHTML = `Comment(${commentCounter(commentBox)})`;
};

export const commentPopup = (itemId, movie) => {
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

  updateComment(itemId);
};

export const commentShow = (movies) => {
  const commentTarget = document.querySelector('#homepage');
  commentTarget.addEventListener('click', (e) => {
    if (e.target instanceof HTMLButtonElement) {
      const itemId = parseInt(e.target.attributes.name.nodeValue, 10);
      const movie = movies.find((e) => e.id === itemId);

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

    document.querySelector('#cm-movie-existing-comment').innerHTML = '';
    document.querySelector('#comments-number').innerHTML = '';
  };

  commentClose.addEventListener('click', commentPopupClose);
};

export const submitComment = async (e) => {
  e.preventDefault();
  const comName = document.querySelector('#cm-commentor-name');
  const comInsight = document.querySelector('#cm-commentor-insight');

  if (comName.value === '' || comInsight.value === '') {
    document.querySelector('#cm-feedback-message-fail').style.display = 'block';

    setTimeout(() => {
      document.querySelector('#cm-feedback-message-fail').style.display = 'none';
    }, 3000);
    return;
  }

  const data = {
    item_id: e.target.getAttribute('item-id'),
    username: comName.value,
    comment: comInsight.value,
  };

  const commentSubmit = await fetch(`${LIKES_URL}apps/${APP}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (commentSubmit.ok) {
    updateComment(data.item_id);

    document.querySelector('#cm-feedback-message-success').style.display = 'block';
    comName.value = '';
    comInsight.value = '';

    setTimeout(() => {
      document.querySelector('#cm-feedback-message-success').style.display = 'none';
    }, 3000);
  } else {
    document.querySelector('#cm-feedback-message-fail').style.display = 'block';

    setTimeout(() => {
      document.querySelector('#cm-feedback-message-fail').style.display = 'none';
    }, 3000);
  }
};