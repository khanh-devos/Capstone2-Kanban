export const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

const APP = 'WJMi62Cw2ldmsCpFe58w';

export const getComments = async (itemId) => {
  let movies = [];

  await fetch(`${BASE_URL}apps/${APP}/comments?item_id=${itemId}`)
    .then(async (res) => {
      if (res.ok) movies = await res.json();
      else movies = null;
    })
    
  return movies;
};

export const submitComment = async () => {
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

  const commentResponse = await commentSubmit.json();
  
  if (commentResponse.status === 201) {
    document.querySelector('#cm-feedback-message-success').style.display = 'block';
    comName.value = '';
    comInsight.value = '';
    setTimeout(() => {
      document.querySelector('#cm-feedback-message-success').style.display = 'none';
    }, 3000);
  } 
  else {
    document.querySelector('#cm-feedback-message-fail').style.display = 'block';
    setTimeout(() => {
      document.querySelector('#cm-feedback-message-fail').style.display = 'none';
    }, 3000);
  }
}