import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  Tooltip,
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { useState } from "react"

type OptionType = {
  value: string
  lable: string
}

type QuestionAnswer = {
  lable: string
  correct: boolean
}

const options: OptionType[] = [
  { value: "multiple-choice", lable: "Multiple choice" },
  { value: "single-choice", lable: "Single choice" },
  { value: "complete", lable: "Complete" },
  { value: "match", lable: "Match" },
]

const Editor = () => {
  const [currentQuestionType, setQuestionType] = useState<OptionType["value"]>(options[0].value)
  const [questionText, setQuestionText] = useState<string>("")
  const [answers, setAnswers] = useState<QuestionAnswer[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<string>("")

  const handleChange = (newType: OptionType["value"]): void => {
    setQuestionType(newType)
    console.log(newType)
  }

  const addNewAnswer = (): void => {
    setCurrentAnswer("")
    setAnswers((state) => [{ lable: currentAnswer, correct: true }, ...state])
  }

  const deleteAnswer = (index: number): void => {
    setAnswers((state) => state.filter((value, i) => i !== index))
  }

  const toggleCorrect = (index: number): void => {
    setAnswers((oldState) => {
      const newState = [...oldState]
      newState[index].correct = !newState[index].correct
      console.log(newState)
      return newState
    })
  }

  return (
    <Container maxW={"container.xl"} mt='10'>
      <Heading mb='8' color='gray.600'>
        Create a new question
      </Heading>
      <FormControl>
        <FormLabel>Question type</FormLabel>
        <Select
          placeholder='Select question type'
          variant={"filled"}
          onChange={(option) => handleChange(option.target.value)}
        >
          {options.map((option) => (
            <option value={option.value}>{option.lable}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl mt={6}>
        <FormLabel>Question</FormLabel>
        <Textarea
          placeholder="What's the capital of France?"
          variant={"filled"}
          onChange={(e) => setQuestionText(e.target.value)}
          value={questionText}
        ></Textarea>
      </FormControl>

      <Text mt={6}>Add answers</Text>
      <Flex>
        <Input
          variant={"filled"}
          flex='9'
          mr={6}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          value={currentAnswer}
          onKeyDown={(e) => {
            if (e.key === "Enter") addNewAnswer()
          }}
        />
        <Button flex='1' colorScheme={"teal"} onClick={addNewAnswer}>
          Add
        </Button>
      </Flex>

      <Text mt={6} mb={2}>
        Answers
      </Text>
      <Box mb={10}>
        {answers.length !== 0 ? (
          <Stack gap={2}>
            {answers.map(({ lable, correct }, i) => (
              <Flex w='full'>
                <Box
                  bgColor={correct ? "green.400" : "gray.100"}
                  border={"1px"}
                  borderColor={correct ? "green.600" : "gray.100"}
                  py='2'
                  px='4'
                  rounded={"md"}
                  flex={1}
                  mr={4}
                  onClick={() => {
                    toggleCorrect(i), console.log(i)
                  }}
                >
                  <Text color={"gray.800"}>{lable}</Text>
                </Box>
                <IconButton
                  colorScheme={"red"}
                  aria-label='delete this answer'
                  icon={<DeleteIcon />}
                  onClick={() => deleteAnswer(i)}
                />
              </Flex>
            ))}
          </Stack>
        ) : (
          <Heading textAlign={"center"} color={"gray.500"}>
            Add answers and mark the correct ones
          </Heading>
        )}
      </Box>
      <Flex gap={6} justifyContent={"space-between"}>
        <Button flex={1} colorScheme='red'>
          Delete
        </Button>
        <Tooltip label='Idk'>
          <Button flex={1} colorScheme='green' disabled>
            Create
          </Button>
        </Tooltip>
      </Flex>
    </Container>
  )
}

export default Editor
