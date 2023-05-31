import React, {useEffect} from 'react';
import BurnoutService from "../../services/BurnoutService";
import TestCard from "../../common/components/TestCard/TestCard";
import BurnoutHistoryTable from "./BurnoutHistoryTable";
import Pagination from "../../common/components/Pagination/Pagination";
import {BURNOUT_TITLE, BURNOUT_INTRO, BURNOUT_BODY} from "../../data/Burnout/Text";
import {Box, Flex, Spacer} from "@chakra-ui/react";
import {BurnoutResult} from "./models/BurnoutResult";
import {useSearchParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import RespondentService from "../../services/RespondentService";
import {COOKIE_MAX_AGE} from "../../data/CookieConfig";

const Burnout = () => {
    const [cookies, setCookie] = useCookies(["token", "respondent_id"])
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, _] = React.useState(6);
    const [total, setTotal] = React.useState(1);
    const [results, setResults] = React.useState<BurnoutResult[]>([]);

    const [searchParams] = useSearchParams()
    const quizId = searchParams.get('quiz_id')
    const redirectUrl = searchParams.get('redirect_url')

    useEffect(() => {
        if (!cookies.token) {
            RespondentService.createUser().then((response) => {
                setCookie("token", response.data.token, {maxAge: COOKIE_MAX_AGE})
                setCookie("respondent_id", response.data.respondent_id, {maxAge: COOKIE_MAX_AGE})
            })
        }
    }, []);

    useEffect(() => {
        if (cookies.token === null) {
            return
        }
        BurnoutService.getResults(cookies.token, currentPage, pageSize).then((response) => {
            setResults(response.data.data)
            setTotal(response.data.total)
        })
    }, [currentPage]);

    return (
        <Box>
            <TestCard title={BURNOUT_TITLE} intro={BURNOUT_INTRO} body={BURNOUT_BODY} pathToNavigate={"/burnout/test"}/>
            {!(quizId && redirectUrl) && (results.length > 0) &&
                <Box>
                    <BurnoutHistoryTable results={results}/>
                    <Spacer marginY="8"/>
                    <Flex alignItems="center" justifyContent="center" direction="column">
                        <Pagination currentPage={currentPage} pageSize={pageSize} total={total}
                                    onChange={(page) => setCurrentPage(page!)}/>
                    </Flex>
                </Box>}
        </Box>
    );
};

export default Burnout;
