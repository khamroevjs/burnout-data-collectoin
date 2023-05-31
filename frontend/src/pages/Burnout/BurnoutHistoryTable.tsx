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
import {BurnoutResult} from "./models/BurnoutResult";

interface Props {
    results: BurnoutResult[];
}

const BurnoutHistoryTable = ({results}: Props) => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [result, setResult] = useState<BurnoutResult>(
        {date_time: "0000-00-00T00:00:00Z", exhaustion: 0, depersonalization: 0, reduction: 0, integral_index: 0})

    const showModal = (res: BurnoutResult) => {
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
                        <Tr position="relative">
                            <Th padding={0} colSpan={5} >
                                <Text textAlign="center" bg="gray.100" fontWeight="medium" fontSize="lg"
                                      color="gray.600" paddingY="2.5">
                                    История результатов</Text>
                            </Th>
                        </Tr>
                        <Tr>
                            <Th fontSize="sm">Время</Th>
                            <Th fontSize="sm">Эмоциональное истощение</Th>
                            <Th fontSize="sm">Деперсонализация</Th>
                            <Th fontSize="sm">Редукция профессионализма</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {results.map((res) => (
                            <Tr key={res.date_time}>
                                <Td>{localDateTime(res.date_time)}</Td>
                                <Td>{exhaustionLevel(res.exhaustion)}</Td>
                                <Td>{depersonalizationLevel(res.depersonalization)}</Td>
                                <Td>{reductionLevel(res.reduction)}</Td>
                                <Td><Button colorScheme="brand"
                                            onClick={() => showModal(res)}>Подробнее</Button></Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    {/*<ModalHeader>Modal Header</ModalHeader>*/}
                    <ModalCloseButton/>
                    <ModalBody>
                        <VStack>
                            <TableContainer rounded="md" width="3xl" bg="gray.700" marginTop="8"
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

export default BurnoutHistoryTable;
