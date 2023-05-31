import React from 'react';
import Test from "../../common/components/Test/Test";
import {FatigueResult} from "./models/FatigueResult";
import FatigueService from "../../services/FatigueService";
import FatigueResultCard from "./FatigueResultCard";
import {FATIGUE_QUESTIONS} from "../../data/Fatigue/Questions";
import {useSearchParams} from "react-router-dom";
import {AxiosResponse} from "axios";
import {FatigueAnswersResponse} from "./models/FatigueAnswersResponse";
import {useCookies} from "react-cookie";

const FatigueTest = () => {
    const [cookies, setCookie] = useCookies(["token", "respondent_id"])
    const [showResults, setShowResults] = React.useState(false)
    const [result, setResult] = React.useState<FatigueResult>({
        date_time: "0000-00-00T00:00:00Z",
        fatigue_index: 0,
        physical_discomfort: 0,
        cognitive_discomfort: 0,
        emotional_violation: 0,
        motivation_decrease: 0
    })

    const [searchParams] = useSearchParams()
    const submitAnswer = async (answers: number[]) => {
        const quizId = searchParams.get('quiz_id')
        const redirectUrl = searchParams.get('redirect_url')
        let response: AxiosResponse<FatigueAnswersResponse>
        if (quizId !== null && redirectUrl !== null) {
            response = await FatigueService.postAnswers(cookies.token, quizId, answers)
        } else {
            response = await FatigueService.postAnswers(cookies.token, null, answers)
        }
        setResult(response.data.result)
        setShowResults(true)
    }

    return (
        <>
            {!showResults && <Test questions={FATIGUE_QUESTIONS} previousPage="/fatigue" submitAnswers={submitAnswer}/>}
            {showResults && <FatigueResultCard result={result}/>}
        </>
    );
};

export default FatigueTest;
