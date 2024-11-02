import { Button, Container, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AnswerContext, NotificationContext } from '../../hooks/contexts'
import { postAnswers } from '../../utils/endpoints'
import { useNavigate } from 'react-router'
//import Finished from '../assets/finished.gif'

export const FinishedScreen = () => {
    const navigate = useNavigate()
    const { answers } = useContext(AnswerContext)
    const { setNotification } = useContext(NotificationContext)
    const [postStatus, setPostStatus] = useState<
        'IDLE' | 'POSTING' | 'SUCCESS' | 'ERROR'
    >('IDLE')

    function submitAnswers() {
        setPostStatus('POSTING')
        postAnswers(answers)
            .then(() => setPostStatus('SUCCESS'))
            .catch(() => setPostStatus('ERROR'))
    }

    useEffect(() => {
        switch (postStatus) {
            case 'POSTING':
                setNotification({
                    text: 'Anworten werden abgesendet.',
                    color: 'info',
                })
                break
            case 'SUCCESS':
                setNotification({
                    text: 'Antworten wurden erfolgreich gespeichert.',
                    color: 'success',
                })
                break
            case 'ERROR':
                setNotification({
                    text: 'Beim Speichern deiner Antworten ist ein Fehler aufgetreten.',
                    color: 'error',
                })
                break
        }
    }, [postStatus])

    return (
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <h1>Finished!</h1>
            <Typography variant="body1" sx={{ margin: '2rem' }}>
                Yey du bist fertig! Danke, dass du uns deine Meinung gesagt hast
                :) Willst du deine Antworten speichern?
            </Typography>
            <Button
                sx={{ margin: '1rem' }}
                variant="contained"
                color={
                    postStatus === 'ERROR'
                        ? 'error'
                        : postStatus === 'SUCCESS'
                        ? 'success'
                        : 'info'
                }
                disabled={postStatus === 'POSTING' || postStatus === 'SUCCESS'}
                onClick={submitAnswers}
            >
                {postStatus === 'POSTING'
                    ? 'sende'
                    : postStatus === 'ERROR'
                    ? 'fehler!'
                    : postStatus === 'SUCCESS'
                    ? 'erfolg!'
                    : 'speichern'}
            </Button>
            {postStatus === 'SUCCESS' ? (
                <Button onClick={() => navigate('/poll', { replace: true })}>
                    zurücksetzen
                </Button>
            ) : null}
        </Container>
    )
}
