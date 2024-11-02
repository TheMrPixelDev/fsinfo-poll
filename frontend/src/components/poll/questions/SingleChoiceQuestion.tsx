import { useEffect, useState } from 'react'
import { Option } from '../../../../../backend/src/model/Interfaces'
import {
    FormControl,
    Card,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'
import { QuestionComponentProps } from '../../../types/props'

export type SingleChoiceQuestionProps = {} & QuestionComponentProps

export const SingleChoiceQuestion = (props: SingleChoiceQuestionProps) => {
    const { question, readonly, onAnswerChange } = props

    const [selectedOption, setSelectedOption] = useState<Option | undefined>(
        undefined
    )

    useEffect(() => {
        if (onAnswerChange !== undefined) {
            console.log('Single Choice Answer changed')
            onAnswerChange({
                ofQuestion: question._id,
                type: question.type,
                options: selectedOption !== undefined ? [selectedOption] : [],
            })
        }
    }, [selectedOption])

    return (
        <Card variant="elevation">
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
