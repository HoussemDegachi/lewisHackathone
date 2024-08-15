import React, { useEffect, useState } from "react";
import quizzes from "@/public/quizz/quizz.json";
import { getRandomNumber } from "@/lib/utils";
import { Button } from "./button";

function Quizz({ onSuccess }) {
  // get random exercise
  const [quizz, setQuizz] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const quizzesNumber = quizzes.length;
    const quizzNumber = getRandomNumber(0, quizzesNumber - 1);
    setQuizz(quizzes[quizzNumber]);
  }, []);

  function handleResponse(question) {
    if (!answers.includes(question)) {
      setAnswers([...answers, question]);
      quizz.answer == question && onSuccess();
    }
  }

  return (
    <div className="bg-black py-4 px-6 flex flex-col items-center">
      {quizz && (
        <>
          <p className={"text-white text-md mb-10 max-w-[600px] text-center"}>{quizz.question}</p>
          <div className="flex flex-col items-center w-full">
            {["A", "B", "C", "D"].map((question) => (
              <Button
                variant={`${
                  answers.includes(question)
                    ? !(quizz.answer === question) && "destructive"
                    : "outline"
                }`}
                className={`mb-3 text-white max-w-[400px] w-full ${
                  !answers.includes(question) ? "bg-transparent" : (quizz.answer === question) && "bg-green-500"
                } text-sm`}
                onClick={() => handleResponse(question)}
                key={question}
              >
                {quizz[question]}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Quizz;
