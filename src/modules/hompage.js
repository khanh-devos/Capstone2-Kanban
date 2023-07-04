import * as homeAPI from "./homepageAPI.js"


export const listItems = async () => {
  const movies = await homeAPI.getMovies();
  console.log(movies);
  const listLi = movies.map(item => `
    <li class='hp-ul-li'>
      <image class='hp-ul-li-img' src='${item.image.medium}'
        width="100%"
      />

      <div class='hp-ul-li-div'>
        <h3>${item.name}</h3>
        <button class='hp-heart-btn' name='${item.id}'>
        heart
        </button>
      </div>
      
      <h5 class='hp-likes' id='${item.id}-likes'>likes</h5>

      <button class='hp-comment-btn'>Comments</button>
    </li>
  
  `);

  document.querySelector('#homepage-ul').innerHTML = listLi.join(' ');
}