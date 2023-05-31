import React from 'react';
import {Button, Heading, Text, Flex, Box, Stack, Textarea, Spacer, VStack} from "@chakra-ui/react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useNavigateParams} from "../../../hooks/useNavigateParams";
import {redirect} from "../../../utils/CommonUtils";

interface Props {
    title: string;
    intro: string;
    body: string;
    pathToNavigate: string;
}

const TestCard = ({title, intro, body, pathToNavigate}: Props) => {
    const [searchParams] = useSearchParams()
    const quizId = searchParams.get('quiz_id')
    const redirectUrl = searchParams.get('redirect_url')

    const navigate = useNavigateParams()

    return (
        <VStack marginTop="8" padding="4" align="center" width="full" maxW="2xl" spacing='6'
                mx="auto">
            <Heading textAlign="center">{title}</Heading>
            <VStack>
                <Button colorScheme="brand" position="static" width='150px'
                        onClick={() => navigate(pathToNavigate, searchParams.toString())}>Начать тест</Button>
                {(quizId && redirectUrl) &&
                <Button position="static" width='150px'
                        onClick={() => redirect(redirectUrl)}>Назад к опросу</Button>
                }
            </VStack>
            <Text>{intro}</Text>
            <Text>{body}</Text>
        </VStack>
    );
};

export default TestCard;
