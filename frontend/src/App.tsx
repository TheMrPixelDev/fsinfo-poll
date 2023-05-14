import { Box, Grid, LinearProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import './App.css'
import { RequestState } from './types/types'
import { StartScreen } from './components/StartScreen'
import { FinishedScreen } from './components/FinishedScreen'
import { PollScreen } from './components/PollScreen'
import { DirectionControls } from './components/DirectionControls'
import { Answer, Question } from '../../backend/src/model/Interfaces'
import { getQuestions } from './utils/endpoints'

let answers: Answer[] = []

function App() {
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<number>(-1)
    const [requestState, setRequestState] = useState<RequestState>('idle')

    useEffect(() => {
        setRequestState('pending')
        getQuestions()
            .then((questions) => {
                if (questions !== undefined) {
                    setRequestState('success')
                    setQuestions(questions)
                } else {
                    setRequestState('error')
                }
            })
            .catch(() => {
                setRequestState('error')
            })
    }, [])

    if (requestState === 'pending') {
        return (
            <div style={{ border: '1px solid black' }}>
                <LinearProgress />
            </div>
        )
    }

    if (requestState === 'error') {
        return (
            <Grid container>
                <Grid item display="flex" justifyContent="center">
                    <Typography>
                        Beim Laden der Fragen vom Server ist ein Fehler
                        aufgetreten.
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    const question =
        currentQuestion >= 0 &&
        currentQuestion < questions.length &&
        currentQuestion >= 0
            ? questions[currentQuestion]
            : undefined

    if (question !== undefined) {
        return (
            <>
                <PollScreen question={question} answers={answers} />
                <DirectionControls
                    onBackward={() => setCurrentQuestion(currentQuestion - 1)}
                    onForward={() => setCurrentQuestion(currentQuestion + 1)}
                />
                <p className="read-the-docs">FSinfo Umfrage Tool</p>
            </>
        )
    } else {
        if (currentQuestion === questions.length) {
            return (
                <FinishedScreen
                    answers={answers}
                    onFinished={() => {
                        setCurrentQuestion(-1)
                    }}
                    questions={questions}
                />
            )
        } else {
            return (
                <Box sx={{ height: '100%' }}>
                    <StartScreen
                        amountOfQuestions={questions.length}
                        onStart={() => setCurrentQuestion(0)}
                    />
                </Box>
            )
        }
    }
}

export default App
