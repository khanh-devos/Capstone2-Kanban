import Data from './__mock__.js';

export default function moviesCounter(n) {
  const data = new Data();
  data.setData(n);
  const movies = data.getData();

  if (movies) {
    if (movies.length <= 100) {
      document.querySelector('#episode-counter').innerHTML = `Episode(${movies.length})`;

      return movies;
    }

    document.querySelector('#homepage-ul').innerHTML = 'Too many movies !!';
  } else {
    document.querySelector('#homepage-ul').innerHTML = 'fetching failed !';
  }

  return null;
}