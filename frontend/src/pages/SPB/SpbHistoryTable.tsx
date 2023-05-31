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
import {localDateTime} from "../../utils/CommonUtils";
import {SpbResult} from "./models/SpbResult";
import {irrationalAttitude} from "../../utils/SpbUtils";

interface Props {
    results: SpbResult[];
}

const SpbHistoryTable = ({results}: Props) => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [result, setResult] = useState<SpbResult>({
        date_time: "0000-00-00T00:00:00Z",
        catastrophizing: 0,
        duty_to_self: 0,
        duty_to_others: 0,
        low_frustration_tolerance: 0,
        self_esteem: 0
    })

    const showModal = (res: SpbResult) => {
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
                            <Th padding={0} colSpan={7}>
                                <Text textAlign="center" bg="gray.100" fontWeight="medium" fontSize="lg"
                                      color="gray.600" paddingY="2.5">
                                    История результатов</Text>
                            </Th>
                        </Tr>
                        <Tr>
                            <Th fontSize="sm">Время</Th>
                            <Th fontSize="sm">Катастрофизация</Th>
                            <Th fontSize="sm">Долженствование в отношении себя</Th>
                            <Th fontSize="sm">Долженствование в отношении других</Th>
                            <Th fontSize="sm">Низкая фрустрационная толерантность</Th>
                            <Th fontSize="sm">Самооценка</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {results.map((res) => (
                            <Tr key={res.date_time}>
                                <Td>{res.date_time}</Td>
                                <Td>{res.catastrophizing}</Td>
                                <Td>{res.duty_to_self}</Td>
                                <Td>{res.duty_to_others}</Td>
                                <Td>{res.low_frustration_tolerance}</Td>
                                <Td>{res.self_esteem}</Td>
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

export default SpbHistoryTable;
