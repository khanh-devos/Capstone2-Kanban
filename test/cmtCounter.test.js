/**
 * @jest-environment jsdom
 */

import { commentCounter } from '../src/modules/commentPopup.js';

describe('test Counter Comments all edge cases', () => {
  test('return 0 when there is no comments', () => {
    const comments = new Array(0).fill('<li></li>');
    document.body.innerHTML = '<ul id="homepage-ul"></ul>';
    const ul = document.querySelector('#homepage-ul');
    ul.innerHTML = comments.join(' ');

    expect(commentCounter(ul)).toStrictEqual(0);
  });

  test('return 1 when there is 1 comment', () => {
    const comments = new Array(1).fill('<li></li>');
    document.body.innerHTML = '<ul id="homepage-ul"></ul>';
    const ul = document.querySelector('#homepage-ul');
    ul.innerHTML = comments.join(' ');

    expect(commentCounter(ul)).toStrictEqual(1);
  });

  test('return 20 when there is no comments', () => {
    const comments = new Array(20).fill('<li></li>');
    document.body.innerHTML = '<ul id="homepage-ul"></ul>';
    const ul = document.querySelector('#homepage-ul');
    ul.innerHTML = comments.join(' ');

    expect(commentCounter(ul)).toStrictEqual(20);
  });
});