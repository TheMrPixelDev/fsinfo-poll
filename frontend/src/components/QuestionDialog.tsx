import {
    DialogContent,
    DialogTitle,
    Dialog,
    MenuItem,
    Select,
    TextField,
    Grid,
    Button,
    SxProps,
    Snackbar,
    Alert,
} from '@mui/material'
import {
    Option,
    Question,
    QuestionAnswerType,
} from '../../../backend/src/model/Interfaces'
import { useEffect, useReducer, useState } from 'react'
import { AddOptionBox } from './AddOptionsBox'
import { useQuestions } from '../hooks/useQuestions'

function isQuestionAnswerType(value: string): value is QuestionAnswerType {
    return (
        value === 'TEXT' ||
        value === 'MULTIPLE_CHOICE' ||
        value === 'SINGLE_CHOICE'
    )
}

function isOptionArray(values: Object[]): values is Option[] {
    return values.every((value) => 'value' in value)
}

function isQuestion(value: Object[] | Object): value is Question {
    return 'text' in value
}

enum QuestionActionKind {
    SET_TEXT,
    SET_OPTIONS,
    SET_TYPE,
    RESET,
    SET_INITIAL,
}

interface QuestionAction {
    type: QuestionActionKind
    payload: Option[] | string | QuestionAnswerType | Question
}

function questionReducer(state: Question, action: QuestionAction): Question {
    if (
        action.type === QuestionActionKind.SET_TEXT &&
        typeof action.payload === 'string'
    ) {
        return {
            ...state,
            text: action.payload,
        }
    } else if (
        action.type === QuestionActionKind.SET_TYPE &&
        typeof action.payload === 'string' &&
        isQuestionAnswerType(action.payload)
    ) {
        return {
            ...state,
            type: action.payload,
        }
    } else if (
        action.type === QuestionActionKind.SET_OPTIONS &&
        typeof action.payload === 'object' &&
        !isQuestion(action.payload) &&
        isOptionArray(action.payload)
    ) {
        return {
            ...state,
            options: action.payload,
        }
    } else if (action.type === QuestionActionKind.RESET) {
        return { type: 'TEXT', text: '' }
    } else if (
        action.type === QuestionActionKind.SET_INITIAL &&
        isQuestion(action.payload)
    ) {
        return action.payload
    } else {
        return state
    }
}

export type QuestionDialogProps = {
    questionToUpdate?: Question
    open: boolean
    onClose: () => void
}

export const QuestionDialog = ({
    open,
    onClose,
    questionToUpdate,
}: QuestionDialogProps) => {
    const itemStyles: SxProps = {
        margin: '1rem',
    }

    const { addQuestionMutation } = useQuestions()

    const [questionState, dispatchQuestion] = useReducer(questionReducer, {
        text: '',
        options: [],
        type: 'TEXT',
    })

    useEffect(() => {
        if (questionToUpdate !== undefined) {
            dispatchQuestion({
                type: QuestionActionKind.SET_INITIAL,
                payload: questionToUpdate,
            })
        } else {
            dispatchQuestion({
                type: QuestionActionKind.SET_INITIAL,
                payload: {
                    text: '',
                    options: [],
                    type: 'TEXT',
                },
            })
        }
    }, [questionToUpdate])

    function clearAndQuit() {
        dispatchQuestion({ type: QuestionActionKind.RESET, payload: '' })
        onClose()
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle sx={{ margin: '1rem' }}>
                    Frage hinzufügen
                </DialogTitle>
                <DialogContent sx={{ padding: '1rem' }}>
                    <Grid container>
                        <Grid item xs={8} sx={itemStyles}>
                            <TextField
                                variant="filled"
                                value={questionState.text}
                                sx={{ width: '100%' }}
                                label="Fragetext"
                                onChange={(event) =>
                                    dispatchQuestion({
                                        type: QuestionActionKind.SET_TEXT,
                                        payload: event.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={4} sx={itemStyles}>
                            <Select
                                variant="filled"
                                sx={{ width: '100%' }}
                                label="Art der Frage"
                                value={questionState.type}
                                onChange={(event) =>
                                    dispatchQuestion({
                                        type: QuestionActionKind.SET_TYPE,
                                        payload: event.target.value,
                                    })
                                }
                            >
                                <MenuItem value={'TEXT'}>Freitext</MenuItem>
                                <MenuItem value={'MULTIPLE_CHOICE'}>
                                    Mehrfachantwort
                                </MenuItem>
                                <MenuItem value={'SINGLE_CHOICE'}>
                                    Einfachantwort
                                </MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sx={itemStyles}>
                            {questionState.type === 'MULTIPLE_CHOICE' ||
                            questionState.type === 'SINGLE_CHOICE' ? (
                                <AddOptionBox
                                    sx={{
                                        border: '1px solid lightgrey',
                                        borderRadius: '0.3rem',
                                        padding: '1rem',
                                        width: '100%',
                                    }}
                                    options={
                                        questionState.options !== undefined
                                            ? questionState.options
                                            : []
                                    }
                                    onChange={(options) =>
                                        dispatchQuestion({
                                            type: QuestionActionKind.SET_OPTIONS,
                                            payload: options,
                                        })
                                    }
                                />
                            ) : null}
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sx={itemStyles}>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        addQuestionMutation.mutate(
                                            questionState,
                                            {
                                                onSuccess: () => clearAndQuit(),
                                            }
                                        )
                                    }
                                    sx={{ marginRight: '1rem' }}
                                >
                                    Speichern
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => onClose()}
                                >
                                    Abbrechen
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
