import {
    Box,
    CircularProgress,
    Grid,
    LinearProgress,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import './App.css'
import { RequestState, UnionQuestionType } from './types/types'
import { StartScreen } from './components/StartScreen'
import { FinishedScreen } from './components/FinishedScreen'
import { PollScreen } from './components/PollScreen'
import { DirectionControls } from './components/DirectionControls'
import { getQuestions } from './utils/querySupabase'

function App() {
    const [user, setUser] = useState<Realm.User | undefined>(undefined)

    const [questions, setQuestions] = useState<UnionQuestionType[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<number>(-1)
    const [requestState, setRequestState] = useState<RequestState>('idle')

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
                <PollScreen question={question} />
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
