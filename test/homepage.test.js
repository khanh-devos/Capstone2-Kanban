/**
 * @jest-environment jsdom
 */

import { moviesCounter } from '../src/modules/hompage.js';

describe('test movies on the DOM', () => {
  test('return 0 when there are no item', () => {
    const movies = new Array(0).fill('<li></li>');
    document.body.innerHTML = '<ul id="homepage-ul"></ul>';
    const ul = document.querySelector('#homepage-ul');
    ul.innerHTML = movies.join(' ');

    expect(moviesCounter(ul)).toStrictEqual(0);
  });

  test('return 1 when there are 1 item', () => {
    const movies = new Array(1).fill('<li></li>');
    document.body.innerHTML = '<ul id="homepage-ul"></ul>';
    const ul = document.querySelector('#homepage-ul');
    ul.innerHTML = movies.join(' ');

    expect(moviesCounter(ul)).toStrictEqual(1);
  });

  test('return 20 when there are 20 items', () => {
    const movies = new Array(20).fill('<li></li>');
    document.body.innerHTML = '<ul id="homepage-ul"></ul>';
    const ul = document.querySelector('#homepage-ul');
    ul.innerHTML = movies.join(' ');

    expect(moviesCounter(ul)).toStrictEqual(20);
  });
});