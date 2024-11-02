import { useState } from 'react'
import { Answer, Question } from '../../backend/src/model/Interfaces'
import {
    AnswerContext,
    NotificationContext,
    QuestionContext,
} from './hooks/contexts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Poll } from './components/poll/Poll'
import { StartScreen } from './components/general/StartScreen'
import { Admin } from './components/admin/Admin'
import { Alert, Snackbar } from '@mui/material'
import { Notification } from './types/types'

const App = () => {
    const [answers, setAnswers] = useState<Answer[]>([])
    const [questions, setQuestions] = useState<Question[]>([])
    const [notification, setNotification] = useState<Notification | undefined>(
        undefined
    )

    return (
        <>
            <AnswerContext.Provider value={{ answers, setAnswers }}>
                <QuestionContext.Provider value={{ questions, setQuestions }}>
                    <NotificationContext.Provider
                        value={{ notification, setNotification }}
                    >
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Poll />} />
                                <Route path="/poll" element={<Poll />} />
                                <Route path="/admin" element={<Admin />} />
                            </Routes>
                        </BrowserRouter>
                        <Snackbar
                            open={notification !== undefined}
                            autoHideDuration={2000}
                            onClose={() => setNotification(undefined)}
                        >
                            <Alert variant="filled" color={notification?.color}>
                                {notification?.text}
                            </Alert>
                        </Snackbar>
                        <ReactQueryDevtools initialIsOpen={true} />
                    </NotificationContext.Provider>
                </QuestionContext.Provider>
            </AnswerContext.Provider>
        </>
    )
}

export default App
