import { useState } from 'react'
import { OptionType, SingleChoiceQuestionType } from '../types/types'
import {
    FormControl,
    Card,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'

export type SingleChoiceQuestionProps = {
    question: SingleChoiceQuestionType
    onSubmit?: (answer: SingleChoiceQuestionType) => void
    readonly?: boolean
}

export const SingleChoiceQuestion = (props: SingleChoiceQuestionProps) => {
    const { question, readonly, onSubmit } = props

    const [selectedOption, setSelectedOption] = useState<
        OptionType | undefined
    >(question.selectedOption)

    question.selectedOption = selectedOption
    if (onSubmit !== undefined) {
        onSubmit(question)
    }

    return (
        <Card variant="outlined" sx={{ padding: '1rem' }}>
            <Typography sx={{ margin: '1rem' }} variant="body1">
                {question.question}
            </Typography>
            <FormControl>
                <RadioGroup>
                    {question.options.map((option, idx) => {
                        return (
                            <FormControlLabel
                                disabled={readonly}
                                key={idx}
                                value={option.value}
                                control={
                                    <Radio
                                        readOnly={readonly}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                setSelectedOption(option)
                                            }
                                        }}
                                    />
                                }
                                checked={selectedOption === option}
                                label={option.label}
                            />
                        )
                    })}
                </RadioGroup>
            </FormControl>
        </Card>
    )
}
