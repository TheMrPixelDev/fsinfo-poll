import { useState } from 'react'
import { Answer, Question, Option } from '../../../backend/src/model/Interfaces'
import {
    FormControl,
    Card,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'

export type SingleChoiceQuestionProps = {
    question: Question
    onSubmit?: (answer: Answer) => void
    readonly?: boolean
}

export const SingleChoiceQuestion = (props: SingleChoiceQuestionProps) => {
    const { question, readonly, onSubmit } = props

    const [selectedOption, setSelectedOption] = useState<Option | undefined>(
        undefined
    )

    if (onSubmit !== undefined) {
        onSubmit({
            ofQuestion: question._id,
            type: question.type,
            options: selectedOption !== undefined ? [selectedOption] : [],
        })
    }

    return (
        <Card variant="outlined" sx={{ padding: '1rem' }}>
            <Typography sx={{ margin: '1rem' }} variant="body1">
                {question.text}
            </Typography>
            <FormControl>
                <RadioGroup>
                    {question.options !== undefined
                        ? question.options.map((option, idx) => {
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
                                      label={option.value}
                                  />
                              )
                          })
                        : null}
                </RadioGroup>
            </FormControl>
        </Card>
    )
}
