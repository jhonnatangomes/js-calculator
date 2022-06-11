const body = document.querySelector('body');
const calcTitle = document.querySelector('#calc-title');
const toggleSpan = document.querySelector('.toggle span');
const toggleContainer = document.querySelector('.toggle-container');
const numbers = document.querySelector('.numbers-container');
const toggle = document.querySelector('.switch');
const screen = document.querySelector('.screen');
const keysContainer = document.querySelector('.keys-container');
const buttons = document.querySelectorAll('button');
const delButton = document.querySelector('.del');
const resetButton = document.querySelector('.reset');
const equalButton = document.querySelector('.equal');

function applyTheme(theme) {
  const themes = {
    1: {
      mainBackground: 'hsl(222, 26%, 31%)',
      topText: 'white',
      screenBackground: 'hsl(224, 36%, 15%)',
      equalBackgroundColor: 'hsl(6, 63%, 50%)',
      equalShadow: 'hsl(6, 70%, 34%)',
      keypadBackground: 'hsl(223, 31%, 20%)',
      keyBackground: 'hsl(30, 25%, 89%)',
      keyShadow: 'hsl(28, 16%, 65%)',
      keyColor: 'hsl(221, 14%, 31%)',
      delAndResetBackground: 'hsl(225, 21%, 49%)',
      delAndResetShadow: 'hsl(224, 28%, 35%)',
      delAndResetColor: 'white',
      equalColor: 'white',
    },
    2: {
      mainBackground: 'hsl(0, 0%, 90%)',
      topText: 'hsl(60, 10%, 19%)',
      screenBackground: 'hsl(0, 0%, 93%)',
      equalBackgroundColor: 'hsl(25, 98%, 40%)',
      equalShadow: 'hsl(25, 99%, 27%)',
      keypadBackground: 'hsl(0, 5%, 81%)',
      keyBackground: 'hsl(45, 7%, 89%)',
      keyShadow: 'hsl(35, 11%, 61%)',
      keyColor: 'hsl(60, 10%, 19%)',
      delAndResetBackground: 'hsl(185, 42%, 37%)',
      delAndResetShadow: 'hsl(185, 58%, 25%)',
      delAndResetColor: 'white',
      equalColor: 'white',
    },
    3: {
      mainBackground: 'hsl(268, 75%, 9%)',
      topText: 'hsl(52, 100%, 62%)',
      screenBackground: 'hsl(268, 71%, 12%)',
      equalBackgroundColor: 'hsl(176, 100%, 44%)',
      equalShadow: 'hsl(177, 92%, 70%)',
      keypadBackground: 'hsl(268, 71%, 12%)',
      keyBackground: 'hsl(268, 47%, 21%)',
      keyShadow: 'hsl(290, 70%, 36%)',
      keyColor: 'hsl(52, 100%, 62%)',
      delAndResetBackground: 'hsl(281, 89%, 26%)',
      delAndResetShadow: 'hsl(285, 91%, 52%)',
      delAndResetColor: 'white',
      equalColor: 'hsl(198, 20%, 13%)',
    },
  }[theme];
  body.style.backgroundColor = themes.mainBackground;
  toggleContainer.style.backgroundColor = themes.keypadBackground;
  calcTitle.style.color = themes.topText;
  toggleSpan.style.color = themes.topText;
  numbers.style.color = themes.topText;
  screen.style.color = themes.topText;
  toggle.style.backgroundColor = themes.equalBackgroundColor;
  screen.style.backgroundColor = themes.screenBackground;
  keysContainer.style.backgroundColor = themes.keypadBackground;
  buttons.forEach((button) => {
    button.style.backgroundColor = themes.keyBackground;
    button.style.boxShadow = `0 4px ${themes.keyShadow}`;
    button.style.color = themes.keyColor;
  });
  [delButton, resetButton].forEach((button) => {
    button.style.backgroundColor = themes.delAndResetBackground;
    button.style.color = themes.delAndResetColor;
    button.style.boxShadow = `0 4px ${themes.delAndResetShadow}`;
  });
  equalButton.style.backgroundColor = themes.equalBackgroundColor;
  equalButton.style.boxShadow = `0 4px ${themes.equalShadow}`;
  equalButton.style.color = themes.equalColor;

  saveThemeInLocalStorage(theme);
}

function saveThemeInLocalStorage(theme) {
  localStorage.setItem('theme', theme);
}

function loadThemeFromLocalStorage() {
  const localStorageTheme = localStorage.getItem('theme');
  if (!localStorageTheme) {
    toggle.style.left = '3px';
    return applyTheme('1');
  }
  if (localStorageTheme === '1') toggle.style.left = '3px';
  if (localStorageTheme === '2') toggle.style.left = '18px';
  if (localStorageTheme === '3') toggle.style.left = '33px';
  applyTheme(localStorageTheme);
}

loadThemeFromLocalStorage();
