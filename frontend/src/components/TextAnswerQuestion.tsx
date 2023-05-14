import { useState } from 'react'
import { TextField, Card, Typography } from '@mui/material'
import { Answer, Question } from '../../../backend/src/model/Interfaces'

export type TextAnswerQuestionProps = {
    question: Question
    onSubmit?: (answer: Answer) => void
    readonly?: boolean
}

export const TextAnswerQuestion = (props: TextAnswerQuestionProps) => {
    const { question, readonly, onSubmit } = props

    const [answerText, setAnswerText] = useState<string>('')

    if (onSubmit !== undefined) {
        const answer: Answer = {
            ofQuestion: question._id,
            type: question.type,
            text: answerText,
        }
        onSubmit(answer)
    }

    return (
        <Card variant="outlined" sx={{ padding: '1rem' }}>
            <Typography sx={{ margin: '1rem' }} variant="body1">
                {question.text}
            </Typography>
            <TextField
                disabled={readonly}
                value={answerText}
                onChange={(event) => {
                    setAnswerText(event.target.value)
                }}
                multiline
                rows={10}
                fullWidth
            />
        </Card>
    )
}
