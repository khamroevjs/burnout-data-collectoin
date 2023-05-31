import React from 'react';
import {
    Button,
    Text,
    Flex,
    useColorModeValue as mode,
    VStack,
    CloseButton
} from '@chakra-ui/react'
import {useNavigate, useSearchParams} from "react-router-dom";
import {useNavigateParams} from "../../../hooks/useNavigateParams";

interface Props {
    questions: Question[];
    previousPage: string;
    submitAnswers: (answers: number[]) => void;
}

const Test = ({questions, previousPage, submitAnswers}: Props) => {
    const [answers, setAnswers] = React.useState<number[]>([])
    const [index, setIndex] = React.useState(0)
    const [searchParams] = useSearchParams()
    const navigate = useNavigateParams()

    const nextQuestion = async (index: number, value: number) => {
        answers[index] = value
        setAnswers(answers)
        if (index + 1 >= questions.length) {
            submitAnswers(answers)
            return
        }
        setIndex(index + 1);
    }
    const prevQuestion = () => {
        if (index === 0) {
            navigate(previousPage, searchParams.toString())
        }
        setIndex(index - 1);
    }

    return (
        <Flex direction="column">
            <Flex justifyContent="space-between" alignItems="center" paddingTop="4" paddingX={{base: 4, md: 6}}>
                <Text fontSize="2xl" fontWeight="medium">{index + 1} / {questions.length}</Text>
                <CloseButton size="lg" borderWidth="2px" onClick={() => navigate(previousPage, searchParams.toString())}/>
            </Flex>
            <VStack align="start" fontWeight="medium" spacing={{base: 3, sm: 4}} mx="auto" maxW="3xl"
                    width="full"
                    paddingX="4">
                {/*p={{base: 4, sm: 6, md: 8}}*/}
                <Text fontSize="2xl">{questions[index].text}</Text>
                {questions[index].options.map((option) =>
                    <Button
                        key={option.value}
                        onClick={() => nextQuestion(index, option.value)}
                        maxW="xl" mx="auto" width="full" justifyContent="start"
                        rounded="lg"
                        fontSize="lg"
                        paddingX="7"
                        bg="white"
                        position="static"
                        borderWidth="2px"
                        _hover={{bg: mode('gray.300', 'whiteAlpha.200')}}
                        height="50px">{option.text}</Button>)}

                <Button position="static" onClick={prevQuestion} colorScheme="brand" rounded="lg" height="46px"
                        width="100px">Назад</Button>

            </VStack>
        </Flex>
    );
};

export default Test;
