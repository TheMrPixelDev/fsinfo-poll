import { UnionQuestionType } from '../types/types'
import {
    isSingleChoiceQuestion,
    isMultipleChoiceQuestion,
    isTextAnswerQuestion,
} from '../utils/guards'
import { SingleChoiceQuestion } from './SingleChoiceQuestion'
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion'
import { TextAnswerQuestion } from './TextAnswerQuestion'

export type PollScreenProps = {
    question: UnionQuestionType
}

export const PollScreen = ({ question }: PollScreenProps) => {
    return (
        <>
            {question !== undefined && isSingleChoiceQuestion(question) ? (
                <SingleChoiceQuestion question={question} />
            ) : null}
            {question !== undefined && isMultipleChoiceQuestion(question) ? (
                <MultipleChoiceQuestion question={question} />
            ) : null}
            {question !== undefined && isTextAnswerQuestion(question) ? (
                <TextAnswerQuestion question={question} />
            ) : null}
        </>
    )
}
