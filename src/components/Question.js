import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up the timer
    const timer = setTimeout(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          // Timer hit 0
          onAnswered(false); // Call onAnswered with false
          setTimeRemaining(10); // Reset the timer for the next question
          return 10; // Return 10 to reset the time remaining
        }
        return prevTime - 1; // Decrease time remaining by 1
      });
    }, 1000); // 1 second interval

    // Cleanup function
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timer when an answer is selected
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;

