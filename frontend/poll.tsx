{
    question !== undefined && isSingleChoiceQuestion(question) ? (
        <SingleChoiceQuestion
            onSubmit={(answer) => {
                questions[currentQuestion] = answer
            }}
            question={question}
        />
    ) : null
}
{
    question !== undefined && isMultipleChoiceQuestion(question) ? (
        <MultipleChoiceQuestion
            onSubmit={(answer) => {
                questions[currentQuestion] = answer
            }}
            question={question}
        />
    ) : null
}
{
    question !== undefined && isTextAnswerQuestion(question) ? (
        <TextAnswerQuestion
            question={question}
            onSubmit={(answer) => {
                questions[currentQuestion] = answer
            }}
        />
    ) : null
}
