import { Button, Typography, Card } from '@mui/material'
import Logo from '../assets/logo.svg'

export type StartScreenProps = {
    amountOfQuestions: number
    onStart: () => void
}

export const StartScreen = ({
    amountOfQuestions,
    onStart,
}: StartScreenProps) => {
    return (
        <Card variant="outlined" sx={{ padding: '1rem' }}>
            <img src={Logo} style={{ borderRadius: 10 }} />
            <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                Das beantworten von aktuell {amountOfQuestions} Fragen wird in
                etwa {amountOfQuestions * 0.5} Minuten dauern. Klicke auf START
                um die Umfrage zu starten.
            </Typography>
            <br />
            <Button variant="contained" onClick={onStart}>
                START
            </Button>
        </Card>
    )
}
