/**
 * @jest-environment jsdom
 */

import moviesCounter from './homepageFunc.js';

describe('test Counter Movies all edge cases', () => {
  test('normal with 20 movies', () => {
    document.body.innerHTML = '<div id="episode-counter"></div>';

    const checkDom = jest.fn(() => document.querySelector('#episode-counter').textContent);

    expect(moviesCounter(20)).toStrictEqual(new Array(20).fill(1));
    expect(checkDom()).toBe('Episode(20)');
  });

  test('over 100 movies', () => {
    document.body.innerHTML = '<div id="homepage-ul"></div>';

    const checkDom = jest.fn(() => document.querySelector('#homepage-ul').textContent);

    expect(moviesCounter(110)).toStrictEqual(null);
    expect(checkDom()).toBe('Too many movies !!');
  });

  test('there is no movies', () => {
    document.body.innerHTML = '<div id="homepage-ul"></div>';

    const checkDom = jest.fn(() => document.querySelector('#homepage-ul').textContent);

    expect(moviesCounter(0)).toStrictEqual(null);
    expect(checkDom()).toBe('fetching failed !');
  });
});