import { Button, Typography } from '@mui/material'
import { QuestionReview } from './QuestionReview'
import Finished from '../assets/finished.gif'
import { UnionQuestionType } from '../types/types'

export type FinishedScreenProps = {
    questions: UnionQuestionType[]
    onSubmit: () => void
}

export const FinishedScreen = (props: FinishedScreenProps) => {
    const { questions, onSubmit } = props
    return (
        <>
            <h1>Finished!</h1>
            <img src={Finished} style={{ borderRadius: 10 }} />
            <Typography variant="body1" sx={{ margin: '2rem' }}>
                Yey du bist fertig! Danke, dass du uns deine Meinung gesagt hast
                :) Hier kannst du dir deine Antworten nochmal anschauen:
            </Typography>
            <QuestionReview questions={questions} />
            <Button
                sx={{ margin: '1rem' }}
                variant="contained"
                color="success"
                onClick={onSubmit}
            >
                Speichern
            </Button>
        </>
    )
}
