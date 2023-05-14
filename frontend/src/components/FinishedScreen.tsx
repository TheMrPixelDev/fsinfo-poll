import { Alert, Button, Snackbar, Typography } from '@mui/material'
import { QuestionReview } from './QuestionReview'
import Finished from '../assets/finished.gif'
import { RequestState } from '../types/types'
import { useState } from 'react'
import { Answer } from '../../../backend/src/model/Interfaces'
import { postAnswers } from '../utils/endpoints'

export type FinishedScreenProps = {
    onFinished: () => void
    answers: Answer[]
}

export const FinishedScreen = (props: FinishedScreenProps) => {
    const { onFinished, answers } = props
    const [sendState, setSendState] = useState<RequestState>('idle')

    return (
        <>
            <h1>Finished!</h1>
            <img src={Finished} style={{ borderRadius: 10 }} />
            <Typography variant="body1" sx={{ margin: '2rem' }}>
                Yey du bist fertig! Danke, dass du uns deine Meinung gesagt hast
                :) Willst du deine Antworten speichern?
            </Typography>
            <Button
                sx={{ margin: '1rem' }}
                variant="contained"
                color="success"
                onClick={() => {
                    postAnswers(answers).then((resState) =>
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
