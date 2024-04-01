export default function Question({
  question,
  answers,
  click,
}: {
  question: string;
  answers: { id: string; answer: string }[];
  click: () => void;
}) {
  return (
    <>
      <div>{question}</div>
      {answers.map((answer, index) => (
        <button key={answer.id} onClick={click}>
          <p>Numero {index}:</p>
          <p>{answer.answer}</p>
        </button>
      ))}
    </>
  );
}
