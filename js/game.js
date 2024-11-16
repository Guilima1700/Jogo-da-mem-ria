const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const attemptsDisplay = document.querySelector('.attempts');
const resetButton = document.querySelector('.reset-button');

const characters = [
  'xerife',
  'pedepano',
  'zejacare',
  'jubileu',
  'leoncio',
  'zeca-urubu',
  'pica--pau-femea',
  'meany',
  'mendingo',
  'robopp',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';
let attempts = localStorage.getItem('attempts') ? parseInt(localStorage.getItem('attempts')) : 0;
let loop;

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  
  if (disabledCards.length === 20) {
    clearInterval(loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}. Tentativas: ${attempts}`);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  attempts++;
  localStorage.setItem('attempts', attempts);
  attemptsDisplay.innerHTML = `Tentativas: ${attempts}`;

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    firstCard = '';
    secondCard = '';
    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      firstCard = '';
      secondCard = '';
    }, 500);
  }
}

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    checkCards();
  }
}

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {
  loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

const resetGame = () => {
  grid.innerHTML = '';
  firstCard = '';
  secondCard = '';
  attempts = 0;
  localStorage.setItem('attempts', attempts);
  attemptsDisplay.innerHTML = `Tentativas: ${attempts}`;
  timer.innerHTML = 0;
  loadGame();
  startTimer();
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  attemptsDisplay.innerHTML = `Tentativas: ${attempts}`;
  startTimer();
  loadGame();
}

resetButton.addEventListener('click', resetGame);
