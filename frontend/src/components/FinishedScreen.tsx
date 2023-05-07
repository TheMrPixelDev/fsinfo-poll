import { Alert, Button, Snackbar, Typography } from '@mui/material'
import { QuestionReview } from './QuestionReview'
import Finished from '../assets/finished.gif'
import { RequestState, UnionQuestionType } from '../types/types'
import { useState } from 'react'
import { postQuestions } from '../utils/query'

export type FinishedScreenProps = {
    questions: UnionQuestionType[]
    onFinished: () => void
}

export const FinishedScreen = (props: FinishedScreenProps) => {
    const { questions, onFinished } = props
    const [sendState, setSendState] = useState<RequestState>('idle')

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
                onClick={() => {
                    postQuestions(questions).then((resState) =>
                        setSendState(resState)
                    )
                }}
            >
                Speichern
            </Button>
            <Snackbar
                open={sendState !== 'idle'}
                autoHideDuration={4000}
                onClose={() => {
                    setSendState('idle')
                    onFinished()
                }}
            >
                <Alert
                    onClose={() => {
                        setSendState('idle')
                        onFinished()
                    }}
                    severity={
                        sendState === 'error'
                            ? 'error'
                            : sendState === 'success'
                            ? 'success'
                            : 'info'
                    }
                    sx={{ width: '100%' }}
                >
                    {sendState === 'success'
                        ? 'Deine Antworten wurden erfolgreich gespeichert'
                        : sendState === 'error'
                        ? 'Beim Speichern deiner Antworten ist ein Fehler aufgetreten.'
                        : null}
                </Alert>
            </Snackbar>
        </>
    )
}
