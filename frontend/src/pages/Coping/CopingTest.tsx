import React from 'react';
import Test from "../../common/components/Test/Test";
import {CopingResult} from "./models/CopingResult";
import CopingResultCard from "./CopingResultCard";
import CopingService from "../../services/CopingService";
import {COPING_QUESTIONS} from "../../data/Coping/Questions";
import {useSearchParams} from "react-router-dom";
import {AxiosResponse} from "axios";
import {CopingAnswersResponse} from "./models/CopingAnswersResponse";
import {useCookies} from "react-cookie";

const CopingTest = () => {
    const [cookies, setCookie] = useCookies(["token", "respondent_id"])
    const [showResults, setShowResults] = React.useState(false)
    const [result, setResult] = React.useState<CopingResult>({
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
    const [searchParams] = useSearchParams()
    const submitAnswer = async (answers: number[]) => {
        const quizId = searchParams.get('quiz_id')
        const redirectUrl = searchParams.get('redirect_url')
        let response: AxiosResponse<CopingAnswersResponse>
        if (quizId !== null && redirectUrl !== null) {
            response = await CopingService.postAnswers(cookies.token, quizId, answers)
        } else {
            response = await CopingService.postAnswers(cookies.token, null, answers)
        }
        setResult(response.data.result)
        setShowResults(true)
    }

    return (
        <>
            {!showResults && <Test questions={COPING_QUESTIONS} previousPage="/coping" submitAnswers={submitAnswer}/>}
            {showResults && <CopingResultCard result={result}/>}
        </>
    );
};

export default CopingTest;
