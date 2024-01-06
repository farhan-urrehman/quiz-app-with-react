import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    getDataFromApi();
  }, []);

  function getDataFromApi() {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      .then(res => setQuestions(res))
      .catch(error => console.error("Error fetching data:", error));
  }

  function handleOptionSelect(option) {
    setSelectedOption(option);
  }

  function checkAnswer() {
    if (selectedOption === questions[currentIndex].correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowResult(true);
  }

  function nextQuestion() {
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(false);
    setCurrentIndex(currentIndex + 1);
  }

  if (!questions.length) {
    return <h1 className="loading">Loading...</h1>;
  }

  const isCurrentQuestionValid = currentIndex >= 0 && currentIndex < questions.length;
  const currentQuestion = questions[currentIndex];
  const options = currentQuestion.incorrectAnswers.concat([currentQuestion.correctAnswer]);

  return (
    <div className="App">
      <div className="App-header">
        {isCurrentQuestionValid && (
          <>
            <p className="question">{currentQuestion.question.text}</p>
            {!showResult && (
              <div className="options-grid">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="option"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            {showResult && (
              <div className="result">
                {isCorrect ? (
                  <p className="result-text correct-answer">Correct Answer!</p>
                ) : (
                  <p className="result-text incorrect-answer">Incorrect Answer!</p>
                )}
                <button className="next-button" onClick={nextQuestion}>Next</button>
              </div>
            )}
            {!showResult && (
              <button className="check-answer" onClick={checkAnswer} disabled={!selectedOption}>
                Check Answer
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
