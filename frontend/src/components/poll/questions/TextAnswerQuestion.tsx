import { useEffect, useState } from 'react'
import { TextField, Card, Typography } from '@mui/material'
import { Answer } from '../../../../../backend/src/model/Interfaces'
import { QuestionComponentProps } from '../../../types/props'

export type TextAnswerQuestionProps = {} & QuestionComponentProps

export const TextAnswerQuestion = (props: TextAnswerQuestionProps) => {
    const { question, readonly, onAnswerChange } = props

    const [answerText, setAnswerText] = useState<string>('')

    useEffect(() => {
        if (onAnswerChange !== undefined) {
            console.log('Text Question Answer changed')
            const answer: Answer = {
                ofQuestion: question._id,
                type: question.type,
                text: answerText,
            }
            onAnswerChange(answer)
        }
    }, [answerText])

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
