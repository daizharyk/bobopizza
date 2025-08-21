// utils/scrollPosition.js
let savedScroll = 0;

export const saveScrollPosition = () => {
  savedScroll = window.scrollY;
};

export const restoreScrollPosition = () => {
  window.scrollTo(0, savedScroll);
};
