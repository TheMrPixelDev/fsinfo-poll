import { Button } from '@mui/material'

export type DirectionControlsProps = {
    onForward: () => void
    onBackward: () => void
}

export const DirectionControls = ({
    onForward,
    onBackward,
}: DirectionControlsProps) => {
    return (
        <>
            <Button
                style={{ margin: '1rem' }}
                variant="outlined"
                onClick={onBackward}
            >
                Zurück
            </Button>
            <Button
                style={{ margin: '1rem' }}
                variant="contained"
                onClick={onForward}
            >
                Weiter
            </Button>
        </>
    )
}
