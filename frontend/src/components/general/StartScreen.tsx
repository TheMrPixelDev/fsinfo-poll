import { Button, Typography, Card, Container } from '@mui/material'
import Logo from '../../assets/logo.svg'

export const StartScreen = ({ onStart }: { onStart: () => void }) => {
    return (
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <Card variant="outlined" sx={{ padding: '1rem' }}>
                <img src={Logo} style={{ borderRadius: 10 }} />
                <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                    <>
                        Danke, dass du an der FSinfo Umfrage
                        {new Date().getFullYear()} teilnimmst. Klicke auf START,
                        wenn du bereit bist.
                    </>
                </Typography>
                <br />
                <Button variant="contained" onClick={onStart}>
                    START
                </Button>
            </Card>
        </Container>
    )
}
