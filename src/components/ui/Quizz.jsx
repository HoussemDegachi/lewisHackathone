import React, { useEffect, useState } from "react";
import quizzes from "@/public/quizz/quizz.json";
import { getRandomNumber } from "@/lib/utils";
import { Button } from "./button";

function Quizz({ onSuccess, onFailure }) {
  // get random exercise
  const [quizz, setQuizz] = useState(null);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const quizzesNumber = quizzes.length;
    const quizzNumber = getRandomNumber(0, quizzesNumber - 1);
    setQuizz(quizzes[quizzNumber]);
  }, []);

  function handleResponse(question) {
      setAnswer(question);
      quizz.answer == question ? onSuccess() : onFailure();
  }

  return (
    <div className="py-4 px-6 flex flex-col items-center">
      {quizz && (
        <>
          <p className={"text-white text-md mb-10 max-w-[600px] text-center"}>
            {quizz.question}
          </p>
          <div className="flex flex-col items-center w-full">
            {["A", "B", "C", "D"].map((question) => (
              <Button
                variant={`${
                  !answer ? "outline" : (answer !== question) && "destructive"
                }`}
                className={`mb-3 text-white max-w-[400px] w-full ${
                  !answer
                    ? "bg-transparent"
                    : answer === quizz.answer &&
                      answer == question &&
                      "bg-green-500"
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
