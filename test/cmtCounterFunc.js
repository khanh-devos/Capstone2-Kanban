import Data from './__mock__.js';

export default function commentCounter(n) {
  const data = new Data();
  data.setData(n);
  const comments = data.getData();

  if (comments) {
    if (comments.length <= 30) {
      document.querySelector('#comments-number').innerHTML = `Comments (${comments.length})`;
      return comments;
    }

    const commentLi = "<tr class='cm-li'><td colspan=3>over 30 comments</td></tr>";
    document.querySelector('#cm-movie-existing-comment').innerHTML = commentLi;
  } else {
    const commentLi = "<tr class='cm-li'><td colspan=3>No comments found!</td></tr>";
    document.querySelector('#cm-movie-existing-comment').innerHTML = commentLi;
  }

  return null;
}