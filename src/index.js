import _ from 'lodash';
import './style.css';
import backgroundImg from './imgs/image.png';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
  console.log(element.action());
  return element;
}
  
document.body.appendChild(component());
