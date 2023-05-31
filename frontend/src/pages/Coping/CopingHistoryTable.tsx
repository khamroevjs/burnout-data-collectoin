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
import {CopingResult} from "./models/CopingResult";
import {strategyLevel} from "../../utils/CopingUtils";

interface Props {
    results: CopingResult[];
}

const CopingHistoryTable = ({results}: Props) => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [result, setResult] = useState<CopingResult>({
        date_time: "0000-00-00T00:00:00Z",
        confrontation: 0,
        distancing: 0,
        self_control: 0,
        seeking_social_support: 0,
        taking_responsibility: 0,
        escape_avoidance: 0,
        problem_solving_planning: 0,
        positive_reassessment: 0,
        confrontation_tpoint: 0,
        distancing_tpoint: 0,
        self_control_tpoint: 0,
        seeking_social_support_tpoint: 0,
        taking_responsibility_tpoint: 0,
        escape_avoidance_tpoint: 0,
        problem_solving_planning_tpoint: 0,
        positive_reassessment_tpoint: 0
    })

    const showModal = (res: CopingResult) => {
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
                        {/*<Tr>*/}
                        {/*    <Th padding={0} colSpan={6}>*/}
                        {/*        <Text textAlign="center" bg="gray.100" fontWeight="medium" fontSize="lg"*/}
                        {/*              color="gray.600" paddingY="2.5">*/}
                        {/*            История результатов</Text>*/}
                        {/*    </Th>*/}
                        {/*</Tr>*/}
                        <Tr>
                            {/*<Th bg={'gray.200'}></Th>*/}
                            <Th colSpan={7} textAlign={'center'} bg={'gray.200'}>Использование стратегии</Th>
                        </Tr>
                        <Tr>
                            <Th padding={2}>Время</Th>
                            <Th padding={2}>Конфронтация</Th>
                            <Th padding={2}>Дистанцирование</Th>
                            <Th padding={2}>Самоконтроль</Th>
                            <Th padding={2}>Поиск социальной поддержки</Th>
                            {/*<Th padding={2}>Принятие ответственности</Th>*/}
                            {/*<Th padding={2}>Бегство-избегание</Th>*/}
                            {/*<Th padding={2}>Планирование решения проблемы</Th>*/}
                            {/*<Th padding={2}>Положительная переоценка</Th>*/}
                            <Th padding={2}></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {results.map((res) => (
                            <Tr key={res.date_time}>
                                <Td padding={1}>{localDateTime(res.date_time)}</Td>
                                <Td padding={1}>{strategyLevel(res.confrontation_tpoint)}</Td>
                                <Td padding={1}>{strategyLevel(res.distancing_tpoint)}</Td>
                                <Td padding={1}>{strategyLevel(res.self_control_tpoint)}</Td>
                                <Td padding={1}>{strategyLevel(res.seeking_social_support_tpoint)}</Td>
                                {/*<Td padding={1}>{strategyLevel(res.taking_responsibility_tpoint)}</Td>*/}
                                {/*<Td padding={1}>{strategyLevel(res.escape_avoidance_tpoint)}</Td>*/}
                                {/*<Td padding={1}>{strategyLevel(res.problem_solving_planning_tpoint)}</Td>*/}
                                {/*<Td padding={1}>{strategyLevel(res.positive_reassessment_tpoint)}</Td>*/}
                                <Td padding={1}><Button colorScheme="brand"
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

export default CopingHistoryTable;
