import {
    Button,
    FormControl,
    FormControlProps,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material'
import { Option } from '../../../../backend/src/model/Interfaces'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

export type AddOptionsBoxProps = {
    onChange: (options: Option[]) => void
    options: Option[]
} & Omit<FormControlProps, 'onChange'>

export const AddOptionBox = (props: AddOptionsBoxProps) => {
    const { onChange, options, ...additionalProps } = props
    const [textValue, setTextValue] = useState<string>('')

    function addOption() {
        if (textValue.length > 0) {
            onChange([
                ...options,
                {
                    value: textValue,
                },
            ])
            setTextValue('')
        }
    }

    function removeOption(option: Option) {
        onChange(options.filter((opt) => opt !== option))
    }

    return (
        <FormControl {...additionalProps}>
            <Typography variant="body1">Optionen hinzufügen</Typography>
            <List>
                {options.map((option, idx) => (
                    <ListItem key={idx} disablePadding>
                        <ListItemText>{option.value}</ListItemText>
                        <IconButton onClick={() => removeOption(option)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <TextField
                value={textValue}
                variant="filled"
                label="Name der Option"
                onChange={(event) => setTextValue(event.target.value)}
            />
            <Button
                sx={{ marginTop: '1rem' }}
                onClick={addOption}
                variant="outlined"
            >
                Hinzufügen
            </Button>
        </FormControl>
    )
}
