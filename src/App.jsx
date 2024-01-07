import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Using selectedOption in an effect
    console.log(selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    getDataFromApi();
  }, []);

  function getDataFromApi() {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      .then(res => {
        setQuestions(res);
        setIsLoading(false);
      })
      .catch(error => console.error("Error fetching data:", error));
  }

  function handleOptionSelect(option) {
    setSelectedOption(option);
    checkAnswer(option);
  }

  function checkAnswer(option) {
    if (option === questions[currentIndex].correctAnswer) {
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

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h1>Loading...</h1>
      </div>
    );
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
                  <>
                    <p className="result-text incorrect-answer">Incorrect Answer!</p>
                    <p className="correct-answer">Correct Answer: {currentQuestion.correctAnswer}</p>
                  </>
                )}
                <button className="next-button" onClick={nextQuestion}>Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
