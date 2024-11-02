import {
    AppBar,
    Box,
    Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import { QuestionDialog } from './QuestionDialog'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router'
import { Question } from '../../../../backend/src/model/Interfaces'
import { useQuestions } from '../../hooks/useQuestions'
import { ColorModeSwitcher } from '../general/ColorModeSwitcher'
import { NotificationContext } from '../../hooks/contexts'

export const Admin = () => {
    const { data, status, deleteQuestionMutation } = useQuestions()

    const [openAddQuestionDialog, setOpenAddQuestionDialog] =
        useState<boolean>(false)
    const { setNotification } = useContext(NotificationContext)
    const [questionToUpdate, setQuestionToUpdate] = useState<
        Question | undefined
    >(undefined)

    const navigate = useNavigate()

    useEffect(() => {
        switch (status) {
            case 'error':
                setNotification({
                    color: 'error',
                    text: 'Fehler beim Laden der Fragen.',
                })
                break
            case 'loading':
                setNotification({
                    color: 'info',
                    text: 'Fragen werden geladen.',
                })
                break
            case 'success':
                setNotification({
                    color: 'success',
                    text: 'Fragen wurden erfolgreich geladen.',
                })
        }
    }, [status])

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar
                        sx={{
                            flex: 1,
                            justifyContent: 'space-around',
                        }}
                    >
                        <Typography variant="h6">
                            FSinfo Umfrage Tool
                        </Typography>
                        <Box component="div">
                            <Button
                                sx={{ marginRight: '1rem' }}
                                onClick={() => navigate('/poll')}
                                variant="outlined"
                            >
                                Zur Umfrage
                            </Button>
                            <Button
                                disabled={data === undefined}
                                variant="outlined"
                                onClick={() => setOpenAddQuestionDialog(true)}
                                sx={{ marginRight: '1rem' }}
                            >
                                Frage hinzufügen
                            </Button>
                            <ColorModeSwitcher />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth="lg">
                <QuestionDialog
                    questionToUpdate={questionToUpdate}
                    open={
                        (openAddQuestionDialog && data !== undefined) ||
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
                {data === undefined ? null : data.length === 0 ? (
                    <Typography>
                        Aktuell sind noch keine Fragen vorhanden.
                    </Typography>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Fragetext</TableCell>
                                <TableCell>Fragetyp</TableCell>
                                <TableCell>Aktionen</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((question, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{question._id}</TableCell>
                                    <TableCell>{question.text}</TableCell>
                                    <TableCell>
                                        {question.type === 'SINGLE_CHOICE' ? (
                                            <RadioButtonCheckedIcon />
                                        ) : question.type === 'TEXT' ? (
                                            <FormatColorTextIcon />
                                        ) : (
                                            <CheckBoxIcon />
                                        )}
                                    </TableCell>
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
            </Container>
        </>
    )
}
