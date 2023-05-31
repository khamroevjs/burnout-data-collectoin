import React from 'react';
import {Button, Text, VStack, Table, TableContainer, Tbody, Th, Thead, Tr, Td} from '@chakra-ui/react';
import {inPercent, localDateTime, redirect} from "../../utils/CommonUtils";
import CustomProgress from "../../common/components/CustomProgress/CustomProgress";
import {useNavigate, useSearchParams} from "react-router-dom";
import {FatigueResult} from "./models/FatigueResult";
import {fatigueIndexLevel} from "../../utils/FatigueUtils";

interface Props {
    result: FatigueResult;
}

const FatigueResultCard = ({result}: Props) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const quizId = searchParams.get('quiz_id')
    const redirectUrl = searchParams.get('redirect_url')
    return (
        <VStack marginY="6" marginX={{base: 4, lg: 10}}>
            <Text align="center" color="gray.600">
                Важно отметить, что тест на хроническое утомление не является диагностическим инструментом
                и не может заменить консультацию специалиста в области психологии или медицины. Однако,
                он может помочь обратить внимание на проблему и стать отправной точкой для дальнейших мер
                по улучшению психологического состояния и качества жизни.
            </Text>
            <TableContainer overflowX={"scroll"} rounded="md" bg="gray.700" marginTop="12"
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
                            <Td colSpan={3}
                                textAlign="center">{localDateTime(result.date_time)}</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="medium">Степень развития</Td>
                            <Td colSpan={3}
                                textAlign="center">{fatigueIndexLevel(result.fatigue_index)}</Td>
                        </Tr>
                        <Tr><Td fontWeight="medium">ИХРУ</Td>
                            <Td paddingY="3">
                                <CustomProgress value={result.fatigue_index} max={72}/>
                            </Td>
                            <Td>{inPercent(result.fatigue_index, 72)}%</Td>
                        </Tr>
                        <Tr><Td fontWeight="medium">Симптомы физического дискомфорта</Td>
                            <Td paddingY="3">
                                <CustomProgress value={result.physical_discomfort} max={30}/>
                            </Td>
                            <Td>{inPercent(result.physical_discomfort, 30)}%</Td>
                        </Tr>
                        <Tr><Td fontWeight="medium">Снижение общего самочувствия и когнитивный дискомфорт</Td>
                            <Td paddingY="3">
                                <CustomProgress value={result.cognitive_discomfort} max={20}/>
                            </Td>
                            <Td>{inPercent(result.cognitive_discomfort, 20)}%</Td>
                        </Tr>
                        <Tr><Td fontWeight="medium">Нарушения в эмоционально-аффективной сфере</Td>
                            <Td paddingY="3">
                                <CustomProgress value={result.emotional_violation} max={12}/>
                            </Td>
                            <Td>{inPercent(result.emotional_violation, 12)}%</Td>
                        </Tr>
                        <Tr><Td fontWeight="medium">Снижение мотивации и изменения в сфере социального общения</Td>
                            <Td paddingY="3">
                                <CustomProgress value={result.motivation_decrease} max={10}/>
                            </Td>
                            <Td>{inPercent(result.motivation_decrease, 10)}%</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            {!(quizId && redirectUrl) &&
                <Button colorScheme="brand" position="static" onClick={() => navigate('/fatigue')}>
                    Вернуться к началу
                </Button>}
            {(quizId && redirectUrl) &&
                <Button colorScheme="brand" position="static" onClick={() => redirect(redirectUrl)}>
                    Вернуться к опросу
                </Button>}
        </VStack>
    );
};

export default FatigueResultCard;
