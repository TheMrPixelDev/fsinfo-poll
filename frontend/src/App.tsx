import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import './App.css'
import { RequestState, UnionQuestionType } from './types/types'
import { getQuestions, postQuestions } from './utils/query'
import { StartScreen } from './components/StartScreen'
import { FinishedScreen } from './components/FinishedScreen'
import { PollScreen } from './components/PollScreen'
import { DirectionControls } from './components/DirectionControls'

function App() {
    const [questions, setQuestions] = useState<UnionQuestionType[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<number>(-1)
    const [requestState, setRequestState] = useState<RequestState>('idle')

    useEffect(() => {
        setRequestState('pending')
        getQuestions().then((qs) => {
            if (qs !== undefined) {
                console.log(qs)
                setQuestions(qs)
                setRequestState('success')
            } else {
                setRequestState('error')
            }
        })
    }, [])

    if (requestState === 'pending') {
        return <Typography>Fragen werden vom Server abgerufen...</Typography>
    }

    if (requestState === 'error') {
        return (
            <Typography>
                Beim Laden der Fragen vom Server ist ein Fehler aufgetreten.
            </Typography>
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
                    questions={questions}
                    onSubmit={() => {
                        postQuestions(questions)
                    }}
                />
            )
        } else {
            return (
                <StartScreen
                    amountOfQuestions={questions.length}
                    onStart={() => setCurrentQuestion(0)}
                />
            )
        }
    }
}

export default App
