import { useState } from 'react'
import { MultipleChoiceQuestionType, OptionType } from '../types/types'
import {
    Typography,
    Card,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material'

export type MultipleChoiceQuestionProps = {
    question: MultipleChoiceQuestionType
    onSubmit?: (answer: MultipleChoiceQuestionType) => void
    readonly?: boolean
}

export const MultipleChoiceQuestion = (props: MultipleChoiceQuestionProps) => {
    const { question, readonly, onSubmit } = props

    const [selectedOptions, setSelectedOptions] = useState<OptionType[]>(
        question.selectedOptions
    )

    if (!readonly) {
        question.selectedOptions = selectedOptions
        if (onSubmit !== undefined) {
            onSubmit(question)
        }
    }

    return (
        <Card variant="outlined" sx={{ padding: '1rem' }}>
            <Typography sx={{ margin: '1rem' }} variant="body1">
                {question.question}
            </Typography>
            <FormGroup>
                {question.options.map((option, idx) => {
                    return (
                        <FormControlLabel
                            disabled={readonly}
                            key={idx}
                            control={
                                <Checkbox
                                    readOnly={readonly}
                                    checked={selectedOptions.includes(option)}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSelectedOptions([
                                                ...selectedOptions,
                                                option,
                                            ])
                                        } else {
                                            setSelectedOptions(
                                                selectedOptions.filter(
                                                    (opt) => opt !== option
                                                )
                                            )
                                        }
                                    }}
                                />
                            }
                            label={option.label}
                        />
                    )
                })}
            </FormGroup>
        </Card>
    )
}
