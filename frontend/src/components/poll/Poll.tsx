import { SingleChoiceQuestion } from './questions/SingleChoiceQuestion'
import { MultipleChoiceQuestion } from './questions/MultipleChoiceQuestion'
import { TextAnswerQuestion } from './questions/TextAnswerQuestion'
import { useContext, useState } from 'react'
import { DirectionControls } from './DirectionControls'
import { useQuestions } from '../../hooks/useQuestions'
import EditIcon from '@mui/icons-material/Edit'
import {
    isMultipleChoiceQuestion,
    isSingleChoiceQuestion,
    isTextAnswerQuestion,
} from '../../utils/guards'
import {
    AppBar,
    Box,
    Button,
    Container,
    LinearProgress,
    Toolbar,
    Typography,
} from '@mui/material'
import { ColorModeSwitcher } from '../general/ColorModeSwitcher'
import { useNavigate } from 'react-router'
import { Answer } from '../../../../backend/src/model/Interfaces'
import { AnswerContext } from '../../hooks/contexts'
import { ApplicationMode } from '../../types/enums'
import { StartScreen } from '../general/StartScreen'
import { FinishedScreen } from '../general/FinishedScreen'

export const Poll = () => {
    const { answers, setAnswers } = useContext(AnswerContext)
    const { data } = useQuestions()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1)

    const routerNavigate = useNavigate()

    function addOrMutateAnswer(newAnswer: Answer) {
        const alreadyAnswered = answers.some(
            (answer) => answer.ofQuestion === newAnswer.ofQuestion
        )

        if (alreadyAnswered) {
            setAnswers(
                answers.map((answer) => {
                    if (answer.ofQuestion === newAnswer.ofQuestion) {
                        return newAnswer
                    } else {
                        return answer
                    }
                })
            )
        } else {
            setAnswers([...answers, newAnswer])
        }
    }

    if (data) {
        const currentApplicationMode =
            currentQuestionIndex >= 0 && currentQuestionIndex < data.length
                ? ApplicationMode.POLLING
                : currentQuestionIndex < 0
                ? ApplicationMode.IDLE
                : ApplicationMode.FINISHED

        const question = data[currentQuestionIndex]

        const navigate = {
            next: () => setCurrentQuestionIndex(currentQuestionIndex + 1),
            previous: () => setCurrentQuestionIndex(currentQuestionIndex - 1),
        }

        if (currentApplicationMode === ApplicationMode.POLLING) {
            return (
                <>
                    <AppBar>
                        <Toolbar
                            sx={{ flex: 1, justifyContent: 'space-around' }}
                        >
                            <Typography variant="h6">FSinfo Umfrage</Typography>
                            <Box component="div">
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => routerNavigate('/admin')}
                                    sx={{ marginRight: '1rem' }}
                                >
                                    <EditIcon />
                                </Button>
                                <ColorModeSwitcher />
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Container
                        maxWidth="lg"
                        sx={{ textAlign: 'center', marginTop: '5rem' }}
                    >
                        {question !== undefined &&
                        isSingleChoiceQuestion(question) ? (
                            <SingleChoiceQuestion
                                question={question}
                                onAnswerChange={(answer) =>
                                    addOrMutateAnswer(answer)
                                }
                            />
                        ) : null}
                        {question !== undefined &&
                        isMultipleChoiceQuestion(question) ? (
                            <MultipleChoiceQuestion
                                question={question}
                                onAnswerChange={(answer) =>
                                    addOrMutateAnswer(answer)
                                }
                            />
                        ) : null}
                        {question !== undefined &&
                        isTextAnswerQuestion(question) ? (
                            <TextAnswerQuestion
                                question={question}
                                onAnswerChange={(answer) =>
                                    addOrMutateAnswer(answer)
                                }
                            />
                        ) : null}

                        <DirectionControls
                            onBackward={navigate.previous}
                            onForward={navigate.next}
                        />
                    </Container>
                </>
            )
        } else if (currentApplicationMode === ApplicationMode.IDLE) {
            return <StartScreen onStart={() => setCurrentQuestionIndex(0)} />
        } else if (currentApplicationMode === ApplicationMode.FINISHED) {
            return <FinishedScreen />
        } else {
            return <>Application has reached an exhaustive state...</>
        }
    } else {
        return <LinearProgress />
    }
}
