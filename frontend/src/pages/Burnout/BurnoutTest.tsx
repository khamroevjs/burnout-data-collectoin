import React from 'react';
import Test from "../../common/components/Test/Test";
import {BURNOUT_QUESTIONS} from "../../data/Burnout/Questions";
import BurnoutResultCard from "./BurnoutResultCard";
import BurnoutService from "../../services/BurnoutService";
import {BurnoutResult} from "./models/BurnoutResult";
import {useSearchParams} from "react-router-dom";
import {BurnoutAnswersResponse} from "./models/BurnoutAnswersResponse";
import {AxiosResponse} from "axios";
import {useCookies} from "react-cookie";

const BurnoutTest = () => {
    const [cookies, setCookie] = useCookies(["token", "respondent_id"])
    const [showResults, setShowResults] = React.useState(false)
    const [result, setResult] = React.useState<BurnoutResult>({
        date_time: "0000-00-00T00:00:00Z",
        exhaustion: 0,
        depersonalization: 0,
        reduction: 0,
        integral_index: 0
    })

    const [searchParams] = useSearchParams()
    const submitAnswer = async (answers: number[]) => {
        const quizId = searchParams.get('quiz_id')
        const redirectUrl = searchParams.get('redirect_url')
        let response: AxiosResponse<BurnoutAnswersResponse>
        if (quizId !== null && redirectUrl !== null) {
            response = await BurnoutService.postAnswers(cookies.token, quizId, answers)
        } else {
            response = await BurnoutService.postAnswers(cookies.token, null, answers)
        }
        setResult(response.data.result)
        setShowResults(true)
    }

    return (
        <>
            {!showResults && <Test questions={BURNOUT_QUESTIONS} previousPage="/burnout" submitAnswers={submitAnswer}/>}
            {showResults && <BurnoutResultCard result={result}/>}
        </>
    );
};

export default BurnoutTest;
