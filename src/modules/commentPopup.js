import { getComments } from './commentPopupAPI.js';
import { APP } from './homepageAPI.js';
import { BASE_URL } from './commentPopupAPI.js';

export const commentPopup = async (itemId, data) => {
  const commentElem = document.querySelector('#commentPopup');
  commentElem.style.display = 'block';
  document.querySelector('#cm-movie-img').src = data.imgLink;
  document.querySelector('#cm-movie-title').innerHTML = data.itemName;
  document.querySelector('#cm-movie-details').innerHTML = data.itemSummary;
  document.querySelector('#cm-movie-type').innerHTML = data.itemType;
  document.querySelector('#cm-movie-runtime').innerHTML = data.itemRuntime;
  document.querySelector('#cm-movie-rating').innerHTML = data.itemRating;
  document.querySelector('#cm-submit-comment').setAttribute('item-id', itemId);

  const comment = await getComments(itemId);

  if (comment && comment.length) {
    const commentLi = comment.map((item) => `
      <tr class='cm-li'>
        <td>${item.comment}</td> 
        <td>${item.username}</td> 
        <td>${item.creation_date}</td>
      </tr>
    `);
    document.querySelector('#cm-movie-existing-comment').innerHTML = commentLi.join(' ');
  } else {
    const commentLi = "<tr class='cm-li'><td colspan=3>No comments found!</td></tr>";
    document.querySelector('#cm-movie-existing-comment').innerHTML = commentLi;
  }

  return null;
};

export const commentShow = () => {
  const commentTarget = document.querySelector('#homepage');
  commentTarget.addEventListener('click', (e) => {
    if (e.target instanceof HTMLButtonElement) {
      const itemId = e.target.attributes.name.nodeValue;

      commentPopup(itemId, {
        imgLink: e.target.parentElement.querySelector('.hp-ul-li-img').src,
        itemName: e.target.parentElement.querySelector('.item-title').innerText,
        itemSummary: e.target.parentElement.querySelector('.item-details-hidden').innerText,
        itemType: e.target.parentElement.querySelector('.item-type-hidden').innerText,
        itemRuntime: e.target.parentElement.querySelector('.item-runtime-hidden').innerText,
        itemRating: e.target.parentElement.querySelector('.item-rating-hidden').innerText,
      });
    }
  });
};

export const commentClose = () => {
  const commentClose = document.querySelector('.cm-close-comment-popup');
  const commentPopupClose = () => {
    const commentElem = document.querySelector('#commentPopup');
    commentElem.style.display = 'none';
  };
  commentClose.addEventListener('click', commentPopupClose);
}

export const commentSubmit = () => {
  const commentSubmit = document.querySelector('#cm-submit-comment');
  commentSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    const comName = document.querySelector('#cm-commentor-name');
    const comInsight = document.querySelector('#cm-commentor-insight');

    const data = {
      item_id: e.target.getAttribute('item-id'),
      username: comName.value,
      comment: comInsight.value,
    };
    const commentSubmit = await fetch(`${BASE_URL}apps/${APP}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const commentResponse = await commentSubmit;
    if (commentResponse.status === 201) {
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
  });
};