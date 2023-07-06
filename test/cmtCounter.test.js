/**
 * @jest-environment jsdom
 */

import commentCounter from './cmtCounterFunc.js';

describe('test Counter Comments all edge cases', () => {
  test('normal with 20 comments', () => {
    document.body.innerHTML = '<div id="comments-number"></div>';

    const checkDom = jest.fn(() => document.querySelector('#comments-number').textContent);

    expect(commentCounter(20)).toStrictEqual(new Array(20).fill(1));
    expect(checkDom()).toBe('Comments (20)');
  });

  test('over 30 comments', () => {
    document.body.innerHTML = '<div id="cm-movie-existing-comment"></div>';

    const checkDom = jest.fn(() => document.querySelector('#cm-movie-existing-comment').textContent);

    expect(commentCounter(50)).toStrictEqual(null);
    expect(checkDom()).toBe('over 30 comments');
  });

  test('there is no comment', () => {
    document.body.innerHTML = '<div id="cm-movie-existing-comment"></div>';

    const checkDom = jest.fn(() => document.querySelector('#cm-movie-existing-comment').textContent);

    expect(commentCounter(0)).toStrictEqual(null);
    expect(checkDom()).toBe('No comments found!');
  });
});