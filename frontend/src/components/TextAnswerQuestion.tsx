import { useState } from 'react'
import { TextAnswerQuestionType } from '../types/types'
import { TextField, Card, Typography } from '@mui/material'

export type TextAnswerQuestionProps = {
    question: TextAnswerQuestionType
    onSubmit?: (answer: TextAnswerQuestionType) => void
    readonly?: boolean
}

export const TextAnswerQuestion = (props: TextAnswerQuestionProps) => {
    const { question, readonly, onSubmit } = props

    const [answer, setAnswer] = useState<string>(question.answer)

    question.answer = answer
    if (onSubmit !== undefined) {
        onSubmit(question)
    }

    return (
        <Card variant="outlined" sx={{ padding: '1rem' }}>
            <Typography sx={{ margin: '1rem' }} variant="body1">
                {question.question}
            </Typography>
            <TextField
                disabled={readonly}
                value={question.answer}
                onChange={(event) => {
                    setAnswer(event.target.value)
                }}
                multiline
                rows={10}
                fullWidth
            />
        </Card>
    )
}
