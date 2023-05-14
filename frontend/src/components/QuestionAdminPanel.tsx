import {
    Alert,
    Button,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { QuestionDialog } from './QuestionDialog'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useQuestions } from '../hooks/useQuestions'
import { Question } from '../../../backend/src/model/Interfaces'

export const QuestionAdminPanel = () => {
    const { questions, deleteQuestionMutation } = useQuestions()

    const [openAddQuestionDialog, setOpenAddQuestionDialog] =
        useState<boolean>(false)
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [questionToUpdate, setQuestionToUpdate] = useState<
        Question | undefined
    >(undefined)

    useEffect(() => {
        if (questions.isFetching) {
            setShowNotification(true)
        }
    }, [questions])

    return (
        <>
            <Button
                disabled={questions === undefined}
                variant="contained"
                onClick={() => setOpenAddQuestionDialog(true)}
            >
                Frage hinzufügen
            </Button>
            <QuestionDialog
                questionToUpdate={questionToUpdate}
                open={
                    (openAddQuestionDialog && questions !== undefined) ||
                    questionToUpdate !== undefined
                }
                onClose={() => {
                    if (openAddQuestionDialog) {
                        setOpenAddQuestionDialog(false)
                    }
                    if (questionToUpdate) {
                        setQuestionToUpdate(undefined)
                    }
                }}
            />
            {questions.data === undefined ? (
                <Typography>
                    Beim Laden der Fragen vom Server ist ein Fehler
                    aufgetretetn.
                </Typography>
            ) : questions.data.length === 0 ? (
                <Typography>
                    Aktuell sind noch keine Fragen vorhanden.
                </Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Frage</TableCell>
                            <TableCell>Aktionen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.data.map((question, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{question._id}</TableCell>
                                <TableCell>{question.text}</TableCell>
                                <TableCell>
                                    <Button
                                        sx={{ marginRight: '1rem' }}
                                        color="success"
                                        startIcon={<EditIcon />}
                                        variant="contained"
                                        onClick={() => {
                                            setQuestionToUpdate(question)
                                        }}
                                    >
                                        Bearbeiten
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() =>
                                            deleteQuestionMutation.mutate(
                                                question._id
                                            )
                                        }
                                    >
                                        Löschen
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            <Snackbar
                open={showNotification}
                autoHideDuration={2000}
                onClose={() => setShowNotification(false)}
            >
                <Alert
                    color={
                        questions.isError
                            ? 'error'
                            : questions.isFetching
                            ? 'info'
                            : questions.isSuccess
                            ? 'success'
                            : 'info'
                    }
                >
                    {questions.isError
                        ? 'Fehler aufgetreten'
                        : questions.isFetching
                        ? 'Daten werden geladen'
                        : questions.isSuccess
                        ? 'Aktion war erfolgreich'
                        : null}
                </Alert>
            </Snackbar>
        </>
    )
}
