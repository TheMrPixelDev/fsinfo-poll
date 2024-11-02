import { Question } from '../../../../backend/src/model/Interfaces'
import {
    isSingleChoiceQuestion,
    isMultipleChoiceQuestion,
    isTextAnswerQuestion,
} from '../../utils/guards'
import { SingleChoiceQuestion } from '../poll/questions/SingleChoiceQuestion'
import { TextAnswerQuestion } from '../poll/questions/TextAnswerQuestion'
import { MultipleChoiceQuestion } from '../poll/questions/MultipleChoiceQuestion'

export type QuestionReviewProps = {
    questions: Question[]
}

export const QuestionReview = (props: QuestionReviewProps) => {
    const { questions } = props

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
