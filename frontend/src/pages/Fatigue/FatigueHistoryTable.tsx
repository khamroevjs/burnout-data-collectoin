import React, {useState} from 'react';
import {
    Table,
    TableContainer,
    Button,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Modal,
    useDisclosure, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, VStack,
} from "@chakra-ui/react";
import {depersonalizationLevel, exhaustionLevel, reductionLevel} from "../../utils/BurnoutUtils";
import CustomProgress from "../../common/components/CustomProgress/CustomProgress";
import {inPercent, localDateTime} from "../../utils/CommonUtils";
import {FatigueResult} from "./models/FatigueResult";
import {fatigueIndexLevel} from "../../utils/FatigueUtils";

interface Props {
    results: FatigueResult[];
}

const FatigueHistoryTable = ({results}: Props) => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [result, setResult] = useState<FatigueResult>({
            date_time: "0000-00-00T00:00:00Z",
            fatigue_index: 0,
            physical_discomfort: 0,
            cognitive_discomfort: 0,
            emotional_violation: 0,
            motivation_decrease: 0
        })

    const showModal = (res: FatigueResult) => {
        setResult(res)
        onOpen()
    }
    
    return (
        <>
            <TableContainer rounded="md" marginX={{base: 4, lg: 10}} marginTop="12"
                // style={{boxShadow: '0px 0px 15px rgba(0,0,0,0.3)'}}
                            border="2px" borderColor="gray.200">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th padding={0} colSpan={3}>
                                <Text textAlign="center" bg="gray.100" fontWeight="medium" fontSize="lg"
                                      color="gray.600" paddingY="2.5">
                                    История результатов</Text>
                            </Th>
                        </Tr>
                        <Tr>
                            <Th fontSize="sm">Время</Th>
                            <Th fontSize="sm">Степень развития хронического утомления</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {results.map((res) => (
                            <Tr key={res.date_time}>
                                <Td>{localDateTime(res.date_time)}</Td>
                                <Td>{fatigueIndexLevel(res.fatigue_index)}</Td>
                                <Td><Button colorScheme="brand"
                                            onClick={() => showModal(res)}>Подробнее</Button></Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Modal isOpen={isOpen} size="6xl" onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    {/*<ModalHeader>Modal Header</ModalHeader>*/}
                    <ModalCloseButton/>
                    <ModalBody>
                        <VStack>
                            <TableContainer rounded="md"  bg="gray.700" marginTop="8"
                                            border="2px" borderColor="gray.200">
                                <Table bg="white">
                                    <Thead>
                                        <Tr>
                                            <Th padding={0} colSpan={3}>
                                                <Text textAlign="center" bg="gray.100" fontWeight="medium" fontSize="lg"
                                                      color="gray.600" paddingY="2.5">Ваш результат</Text>
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    {/*TODO check the table*/}
                                    <Tbody>
                                        <Tr>
                                            <Td fontWeight="medium">Время</Td>
                                            <Td colSpan={3} paddingX={1}
                                                textAlign="center">{localDateTime(result.date_time)}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td fontWeight="medium">Степень развития</Td>
                                            <Td colSpan={3} paddingX={1}
                                                textAlign="center">{fatigueIndexLevel(result.fatigue_index)}</Td>
                                        </Tr>
                                        <Tr><Td fontWeight="medium">ИХРУ</Td>
                                            <Td paddingY="3" paddingX={1}>
                                                <CustomProgress value={result.fatigue_index} max={72}/>
                                            </Td>
                                            <Td>{inPercent(result.fatigue_index, 72)}%</Td>
                                        </Tr>
                                        <Tr><Td fontWeight="medium">Симптомы физического дискомфорта</Td>
                                            <Td paddingY="3" paddingX={1}>
                                                <CustomProgress value={result.physical_discomfort} max={30}/>
                                            </Td>
                                            <Td>{inPercent(result.physical_discomfort, 30)}%</Td>
                                        </Tr>
                                        <Tr><Td fontWeight="medium">Снижение общего самочувствия и когнитивный дискомфорт</Td>
                                            <Td paddingY="3" paddingX={1}>
                                                <CustomProgress value={result.cognitive_discomfort} max={20}/>
                                            </Td>
                                            <Td>{inPercent(result.cognitive_discomfort, 20)}%</Td>
                                        </Tr>
                                        <Tr><Td fontWeight="medium">Нарушения в эмоционально-аффективной сфере</Td>
                                            <Td paddingY="3" paddingX={1}>
                                                <CustomProgress value={result.emotional_violation} max={12}/>
                                            </Td>
                                            <Td>{inPercent(result.emotional_violation, 12)}%</Td>
                                        </Tr>
                                        <Tr><Td fontWeight="medium">Снижение мотивации и изменения в сфере социального общения</Td>
                                            <Td paddingY="3" paddingX={1}>
                                                <CustomProgress value={result.motivation_decrease} max={10}/>
                                            </Td>
                                            <Td>{inPercent(result.motivation_decrease, 10)}%</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default FatigueHistoryTable;
