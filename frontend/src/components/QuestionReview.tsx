import { UnionQuestionType } from '../types/types'
import {
    isMultipleChoiceQuestion,
    isSingleChoiceQuestion,
    isTextAnswerQuestion,
} from '../utils/guards'
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion'
import { SingleChoiceQuestion } from './SingleChoiceQuestion'
import { TextAnswerQuestion } from './TextAnswerQuestion'

export type QuestionReviewProps = {
    questions: UnionQuestionType[]
}

export const QuestionReview = (props: QuestionReviewProps) => {
    const { questions } = props

    console.log(questions)

    return (
        <>
            {questions.map((question, idx) => {
                if (isSingleChoiceQuestion(question)) {
                    return (
                        <SingleChoiceQuestion
                            key={idx}
                            readonly
                            question={question}
                        />
                    )
                } else if (isMultipleChoiceQuestion(question)) {
                    console.log(question)
                    return (
                        <MultipleChoiceQuestion
                            key={idx}
                            readonly
                            question={question}
                        />
                    )
                } else if (isTextAnswerQuestion(question)) {
                    return (
                        <TextAnswerQuestion
                            key={idx}
                            readonly
                            question={question}
                        />
                    )
                } else {
                    return null
                }
            })}
        </>
    )
}
