import React from 'react';
import {Button, Text, VStack, Table, TableContainer, Tbody, Th, Thead, Tr, Td} from '@chakra-ui/react';
import {localDateTime, redirect} from "../../utils/CommonUtils";
import {useNavigate, useSearchParams} from "react-router-dom";
import {SpbResult} from "./models/SpbResult";
import {irrationalAttitude} from "../../utils/SpbUtils";

interface Props {
    result: SpbResult;
}

const SpbResultCard = ({result}: Props) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const quizId = searchParams.get('quiz_id')
    const redirectUrl = searchParams.get('redirect_url')
    return (
        <VStack marginY="6" marginX={{base: 4, lg: 10}}>
            <Text align="center" color="gray.600">
                Важно отметить, что тест на профессиональное выгорание не является диагностическим инструментом
                и не может заменить консультацию специалиста в области психологии или медицины. Однако,
                он может помочь обратить внимание на проблему и стать отправной точкой для дальнейших мер
                по улучшению психологического состояния и качества жизни.
            </Text>
            <TableContainer rounded="md"  bg="gray.700" marginTop="12"
                            border="2px" borderColor="gray.200">
                <Table bg="white">
                    <Thead>
                        <Tr>
                            <Th padding={0} colSpan={5}>
                                <Text textAlign="center" bg="gray.100" fontWeight="medium" fontSize="lg"
                                      color="gray.600" paddingY="2.5">Ваш результат</Text>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td fontWeight="medium">Время</Td>
                            <Td colSpan={3} textAlign="center">{localDateTime(result.date_time)}</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Катастрофизация</Td>
                            <Td>{result.catastrophizing}</Td>
                            <Td>{irrationalAttitude(result.catastrophizing)}</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Долженствование в отношении себя</Td>
                            <Td>{result.duty_to_self}</Td>
                            <Td>{irrationalAttitude(result.duty_to_self)}</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Долженствование в отношении других</Td>
                            <Td>{result.duty_to_others}</Td>
                            <Td>{irrationalAttitude(result.duty_to_others)}</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Самооценка</Td>
                            <Td>{result.self_esteem}</Td>
                            <Td>{irrationalAttitude(result.self_esteem)}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            {!(quizId && redirectUrl) &&
                <Button colorScheme="brand" position="static" onClick={() => navigate('/spb')}>
                    Вернуться к началу
                </Button>}
            {(quizId && redirectUrl) &&
                <Button colorScheme="brand" position="static" onClick={() => redirect(redirectUrl)}>
                    Вернуться к опросу
                </Button>}
        </VStack>
    );
};

export default SpbResultCard;
