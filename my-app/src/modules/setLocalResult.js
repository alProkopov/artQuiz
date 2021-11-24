export default function setLocalResult(from, to) {
  to.totalScore = from.totalScore;
  to.currentCategory = from.currentCategory;

  from.category.forEach((item, index) => {
    to.category[index].score = item.score;
    to.category[index].result = item.result;
    to.category[index].isPassed = item.isPassed;

    let questionsTo = to.category[index].questions;
    let questionsFrom = item.questions;

    for (let i = 0; i < questionsFrom.length; i++) {
      questionsTo[i].isCorrectResult = questionsFrom[i].isCorrectResult;
      questionsTo[i].isCorrect = questionsFrom[i].isCorrect;
    }
  });
}
