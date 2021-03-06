import animation from '../../modules/animation';
import localStorageGet from '../../modules/localStorageGet';

let settings = {
  volumeValue: null,
  TimerSwitcher: null,
  TimerTime: null,
  name: 'settings',
};
window.addEventListener('load', () => localStorageGet(settings));
window.addEventListener('hashchange', () => localStorageGet(settings));

export default function init(object, hasTimer) {
  let currentCategory = object.currentCategory;
  let currentCategoryScore = object.category[currentCategory].score;
  let currentQuestionIndex = object.category[currentCategory].questionIndex;

  let currentQuestionChoices =
    object.category[currentCategory].questions[currentQuestionIndex].choices;

  let currentQuestionPictureNum =
    object.category[currentCategory].questions[currentQuestionIndex].num;

  let currentQuestionPictureAuthor =
    object.category[currentCategory].questions[currentQuestionIndex].author;

  let currentQuestionPictureName =
    object.category[currentCategory].questions[currentQuestionIndex].name;

  let currentQuestionPictureYear =
    object.category[currentCategory].questions[currentQuestionIndex].year;


  let overlay = `
  <div class="overlay">

    <div class="overlay-item close-quiz">
      <button class="button black-button close-card-button">x</button>
      <p class="close-quiz-text">Do you really want to quit the game?</p>
      <div class="button-container button-close-quiz-container">
        <button class="button black-button cancel-button">Cancel</button>
        <button class="button black-button yes-button-picture">Yes</button>
      </div>
    </div>

    <div class="overlay-item correct-answer standard">
      <div class="answer-picture">
        <img
          src="../../../assets/image-data-master/img/${currentQuestionPictureNum}.jpg"
        />
        <div class="correct-logo"></div>
      </div>
      <p class="correct-answer-name">${currentQuestionPictureName}</p>
      <p class="correct-answer-picture">
        ${currentQuestionPictureAuthor}, ${currentQuestionPictureYear}
      </p>
      <button class="button black-button next-button">Next</button>
    </div>

    <div class="overlay-item correct-answer standard incorrect-answer">
      <div class="answer-picture">
        <img
          src="../../../assets/image-data-master/img/${currentQuestionPictureNum}.jpg"
        />
        <div class="incorrect-logo"></div>
      </div>
      <p class="correct-answer-name">${currentQuestionPictureName}</p>
      <p class="correct-answer-picture">
        ${currentQuestionPictureAuthor}, ${currentQuestionPictureYear}
      </p>
      <button class="button black-button next-button">Next</button>
    </div>

      <div class="overlay-item result standard">
        <img src="../../assets/svg/congratulations-logo.svg"/>
        <p class="result-congratulations">Congratulations!</p>
        <p class="result-score">${currentCategoryScore}/10</p>
        <div class="button-container button-close-quiz-container">
          <button class="button black-button home-button" onclick="document.location='/#'">Home</a></button>
          <button class="button black-button nextQuiz-button" >Next Quiz</button>
        </div>
      </div>

      <div class="overlay-item game-over result standard">
        <img src="../../assets/svg/gameOver-logo.svg"/>
        <p class="result-score">Game over</p>
        <p class="result-congratulations">Play again?</p>
        <div class="button-container button-close-quiz-container">
          <button class="button black-button playYes-button">Yes</button>
          <button class="button black-button playNo-button">No</button>
        </div>
      </div>

  </div>
  `;

  let question = `
    <section class="question">
      ${overlay}
      <div class="container question-container-picture">
        <div class="question-header ">
          <button class="button close-quiz-button">x</button>
          <div class="timer-line ${
            settings.TimerSwitcher ? '' : 'no-active'
          }"></div>
          <p class="timer-text ${settings.TimerSwitcher ? '' : 'no-active'}">${
    settings.TimerTime
  }</p>
        </div>
        <p class="answer-title">Which is ${currentQuestionPictureAuthor} picture?</p>
        <div class="question-answers-container question-answers-container-picture">
          ${currentQuestionChoices
            .map(
              (item) => `
            <div id='${item}'class="answer-button-picture" id="2" style="background-image: url('../../assets/image-data-master/full/${item}full.webp')"></div>
          `
            )
            .join('\n')}
        </div>
      </div>
    </section>
    `;

  let container = document.querySelector('.pageEntry');
  container.innerHTML = question;
  animation();
}
