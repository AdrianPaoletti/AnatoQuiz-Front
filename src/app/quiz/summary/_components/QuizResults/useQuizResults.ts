import { useCallback, useEffect, useState } from "react";

import { resultsData } from "./resultsData";
import { ICounterScore, IUseQuizResults } from "./type";

export function useQuizResults(): IUseQuizResults {
  const [counterScore, setCounterScore] = useState<ICounterScore>({
    successes: 0,
    failures: 0,
    score: 0,
  });

  const setResults = useCallback(() => {
    let successes: number = 0;
    let failures: number = 0;
    let score: number = 0;

    for (const question of resultsData) {
      question.isCorrect ? (successes += 1) : (failures += 1);
    }

    score = setScore(successes);
    setCounterScore((prevCounterScore) => ({
      ...prevCounterScore,
      successes,
      failures,
      score,
    }));
  }, []);

  function setScore(successes: number): number {
    const totalQuestions: number = resultsData.length;
    const score: number = (successes * 10) / totalQuestions;

    return score;
  }

  useEffect(() => {
    setResults();
  }, [setResults]);

  return { counterScore };
}
