import { useEffect, useState } from 'react'
import {
    Typography,
    Card,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material'
import { Answer, Option } from '../../../../../backend/src/model/Interfaces'
import { QuestionComponentProps } from '../../../types/props'

export type MultipleChoiceQuestionProps = {} & QuestionComponentProps

export const MultipleChoiceQuestion = (props: MultipleChoiceQuestionProps) => {
    const { question, readonly, onAnswerChange } = props

    const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

    useEffect(() => {
        if (onAnswerChange !== undefined) {
            console.log('Multiple Choice Answer changed')
            const newAnswer: Answer = {
                ofQuestion: question._id,
                type: question.type,
                options: selectedOptions,
            }
            onAnswerChange(newAnswer)
        }
    }, [selectedOptions])

    return (
        <Card variant="outlined" sx={{ padding: '1rem' }}>
            <Typography sx={{ margin: '1rem' }} variant="body1">
                {question.text}
            </Typography>
            <FormGroup>
                {question.options !== undefined
                    ? question.options.map((option, idx) => {
                          return (
                              <FormControlLabel
                                  disabled={readonly}
                                  key={idx}
                                  control={
                                      <Checkbox
                                          readOnly={readonly}
                                          checked={selectedOptions.includes(
                                              option
                                          )}
                                          onChange={(event) => {
                                              if (event.target.checked) {
                                                  setSelectedOptions([
                                                      ...selectedOptions,
                                                      option,
                                                  ])
                                              } else {
                                                  setSelectedOptions(
                                                      selectedOptions.filter(
                                                          (opt) =>
                                                              opt !== option
                                                      )
                                                  )
                                              }
                                          }}
                                      />
                                  }
                                  label={option.value}
                              />
                          )
                      })
                    : null}
            </FormGroup>
        </Card>
    )
}
