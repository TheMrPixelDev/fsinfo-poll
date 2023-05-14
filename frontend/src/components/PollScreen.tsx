import {
    isSingleChoiceQuestion,
    isMultipleChoiceQuestion,
    isTextAnswerQuestion,
} from '../utils/guards'
import { SingleChoiceQuestion } from './SingleChoiceQuestion'
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion'
import { TextAnswerQuestion } from './TextAnswerQuestion'
import { Answer, Question } from '../../../backend/src/model/Interfaces'

export type PollScreenProps = {
    question: Question
    answers: Answer[]
}

export const PollScreen = ({ question, answers }: PollScreenProps) => {
    function addOrReplaceAnswer(newAnswer: Answer) {
        let madeModification = false
        const newAnswers = answers.map((answer) => {
            if (answer.ofQuestion === newAnswer.ofQuestion) {
                madeModification = true
                return newAnswer
            } else {
                return answer
            }
        })
        if (!madeModification) {
            answers.push(newAnswer)
        } else {
            answers = newAnswers
        }
    }

    return (
        <>
            {question !== undefined && isSingleChoiceQuestion(question) ? (
                <SingleChoiceQuestion
                    question={question}
                    onSubmit={(answer) => addOrReplaceAnswer(answer)}
                />
            ) : null}
            {question !== undefined && isMultipleChoiceQuestion(question) ? (
                <MultipleChoiceQuestion
                    question={question}
                    onSubmit={(answer) => addOrReplaceAnswer(answer)}
                />
            ) : null}
            {question !== undefined && isTextAnswerQuestion(question) ? (
                <TextAnswerQuestion
                    question={question}
                    onSubmit={(answer) => addOrReplaceAnswer(answer)}
                />
            ) : null}
        </>
    )
}
