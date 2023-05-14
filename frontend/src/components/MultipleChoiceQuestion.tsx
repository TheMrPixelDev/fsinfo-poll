import { useState } from 'react'
import {
    Typography,
    Card,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material'
import { Answer, Option, Question } from '../../../backend/src/model/Interfaces'

export type MultipleChoiceQuestionProps = {
    question: Question
    onSubmit?: (answer: Answer) => void
    readonly?: boolean
}

export const MultipleChoiceQuestion = (props: MultipleChoiceQuestionProps) => {
    const { question, readonly, onSubmit } = props

    const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

    if (!readonly) {
        if (onSubmit !== undefined) {
            const answer: Answer = {
                ofQuestion: question._id,
                type: question.type,
                options: selectedOptions,
            }
            onSubmit(answer)
        }
    }

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
