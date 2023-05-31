import React from 'react';
import {Button, Text, VStack, Table, TableContainer, Tbody, Th, Thead, Tr, Td} from '@chakra-ui/react';
import {localDateTime} from "../../utils/CommonUtils";
import {redirect, useNavigate, useSearchParams} from "react-router-dom";
import {CopingResult} from "./models/CopingResult";

interface Props {
    result: CopingResult;
}

const CopingResultCard = ({result}: Props) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const quizId = searchParams.get('quiz_id')
    const redirectUrl = searchParams.get('redirect_url')
    return (
        <VStack marginY="6" marginX={{base: 4, lg: 10}}>
            <Text align="center" color="gray.600">
                Важно отметить, что тест на способы совладающего поведения не является диагностическим инструментом
                и не может заменить консультацию специалиста в области психологии или медицины. Однако,
                он может помочь обратить внимание на проблему и стать отправной точкой для дальнейших мер
                по улучшению психологического состояния и качества жизни.
            </Text>
            <TableContainer rounded="md" bg="gray.700" marginTop="12"
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
                            <Td colSpan={3}>{localDateTime(result.date_time)}</Td>
                        </Tr>
                        <Tr>
                            <Th></Th>
                            <Th>Сырые баллы</Th>
                            <Th>Т-баллы</Th>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Конфронтация</Td>
                            <Td>{result.confrontation}</Td>
                            <Td>{result.confrontation_tpoint}</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Дистанцирование</Td>
                            <Td>{result.distancing}</Td>
                            <Td>{result.distancing_tpoint}</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Самоконтроль</Td>
                            <Td>{result.self_control}</Td>
                            <Td>{result.self_control_tpoint}</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Поиск социальной поддержки</Td>
                            <Td>{result.seeking_social_support}</Td>
                            <Td>{result.seeking_social_support_tpoint}</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Принятие ответственности</Td>
                            <Td>{result.taking_responsibility}</Td>
                            <Td>{result.taking_responsibility_tpoint}</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Бегство-избегание</Td>
                            <Td>{result.escape_avoidance}</Td>
                            <Td>{result.escape_avoidance_tpoint}</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Планирование решения проблемы</Td>
                            <Td>{result.problem_solving_planning}</Td>
                            <Td>{result.problem_solving_planning_tpoint}</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Положительная переоценка</Td>
                            <Td>{result.positive_reassessment}</Td>
                            <Td>{result.positive_reassessment_tpoint}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            {!(quizId && redirectUrl) &&
                <Button colorScheme="brand" position="static" onClick={() => navigate('/coping')}>
                    Вернуться к началу
                </Button>}
            {(quizId && redirectUrl) &&
                <Button colorScheme="brand" position="static" onClick={() => redirect(redirectUrl)}>
                    Вернуться к опросу
                </Button>}
        </VStack>
    );
};

export default CopingResultCard;
