import React from 'react';
import {Button, Text, VStack, Table, TableContainer, Tbody, Th, Thead, Tr, Td} from '@chakra-ui/react';
import {depersonalizationLevel, exhaustionLevel, reductionLevel} from "../../utils/BurnoutUtils";
import {inPercent, localDateTime, redirect} from "../../utils/CommonUtils";
import CustomProgress from "../../common/components/CustomProgress/CustomProgress";
import {useNavigate, useSearchParams} from "react-router-dom";
import {BurnoutResult} from "./models/BurnoutResult";

interface Props {
    result: BurnoutResult;
}

const BurnoutResultCard = ({result}: Props) => {
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
                            <Td colSpan={3} textAlign="center">{localDateTime(result.date_time)}</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Эмоциональное истощение</Td>
                            <Td paddingY="3">
                                <CustomProgress value={result.exhaustion} max={54}/>
                            </Td>
                            <Td>{exhaustionLevel(result.exhaustion)}</Td>
                            <Td>{inPercent(result.exhaustion, 54)}%</Td>
                        </Tr>
                        <Tr><Td fontWeight="medium">Деперсонализация</Td>
                            <Td paddingY="3">
                                <CustomProgress value={result.depersonalization} max={30}/>
                            </Td>
                            <Td>{depersonalizationLevel(result.depersonalization)}</Td>
                            <Td>{inPercent(result.depersonalization, 30)}%</Td>
                        </Tr>
                        <Tr><Td fontWeight="medium">Редукция профессионализма</Td>
                            <Td paddingY="3">
                                <CustomProgress value={result.reduction} max={48}/>
                            </Td>
                            <Td>{reductionLevel(result.reduction)}</Td>
                            <Td>{Math.round((1 - result.reduction / 48) * 100)}%</Td>
                        </Tr>
                        <Tr><Td fontWeight="medium">Интегральный индекс выгорания</Td>
                            <Td paddingY="3">
                                <CustomProgress value={result.integral_index} max={1}/>
                            </Td>
                            <Td></Td>
                            <Td>{inPercent(result.integral_index, 1)}%</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            {!(quizId && redirectUrl) &&
                <Button colorScheme="brand" position="static" onClick={() => navigate('/burnout')}>
                    Вернуться к началу
                </Button>}
            {(quizId && redirectUrl) &&
                <Button colorScheme="brand" position="static" onClick={() => redirect(redirectUrl)}>
                    Вернуться к опросу
                </Button>}
        </VStack>
    );
};

export default BurnoutResultCard;
