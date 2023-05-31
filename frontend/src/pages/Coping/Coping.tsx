import React, {useEffect} from 'react';
import {CopingResult} from "./models/CopingResult";
import {Box, Flex, Spacer} from "@chakra-ui/react";
import TestCard from "../../common/components/TestCard/TestCard";
import Pagination from "../../common/components/Pagination/Pagination";
import {COPING_BODY, COPING_INTRO, COPING_TITLE} from "../../data/Coping/Text";
import CopingHistoryTable from "./CopingHistoryTable";
import CopingService from "../../services/CopingService";
import {useSearchParams} from "react-router-dom";
import {useCookies} from "react-cookie";

const Coping = () => {
    const [cookies] = useCookies(["token", "respondent_id"])
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, _] = React.useState(6);
    const [total, setTotal] = React.useState(1);
    const [results, setResults] = React.useState<CopingResult[]>([]);
    const [searchParams] = useSearchParams()
    const quizId = searchParams.get('quiz_id')
    const redirectUrl = searchParams.get('redirect_url')

    useEffect(() => {
        if (cookies.token === null) {
            return
        }
        CopingService.getResults(cookies.token, currentPage, pageSize).then((response) => {
            setResults(response.data.data)
            setTotal(response.data.total)
        })
    }, [currentPage]);
    
    return (
        <Box>
            <TestCard title={COPING_TITLE} intro={COPING_INTRO} body={COPING_BODY} pathToNavigate={"/coping/test"}/>
            {!(quizId && redirectUrl) && (results.length > 0) &&
                <Box>
                    <CopingHistoryTable results={results}/>
                    <Spacer marginY="8"/>
                    <Flex alignItems="center" justifyContent="center" direction="column">
                        <Pagination currentPage={currentPage} pageSize={pageSize} total={total}
                                    onChange={(page) => setCurrentPage(page!)}/>
                    </Flex>
                </Box>}
        </Box>
    );
};

export default Coping;
