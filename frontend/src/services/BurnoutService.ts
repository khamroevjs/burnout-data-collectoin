import axios from "axios";
import {BurnoutResultsResponse} from "../pages/Burnout/models/BurnoutResultsResponse";
import {BurnoutAnswersResponse} from "../pages/Burnout/models/BurnoutAnswersResponse";


export default class BurnoutService {

    private static GET_RESULTS_PATH = "/api/burnout/v1/results";
    private static POST_ANSWERS_PATH = "/api/burnout/v1/answers"

    static async getResults(token: string, currentPage = 0, pageSize = 10) {

        const config = {
            params: {
                token: token,
                page: currentPage - 1,
                size: pageSize
            }
        }
        return await axios.get<BurnoutResultsResponse>(this.GET_RESULTS_PATH, config);
    }

    static async postAnswers(token: string | null, quizId: string | null, answers: number[]) {

        const data: any = {answers: answers};
        if (token != null) {
            data.token = token;
        }
        if (quizId != null) {
            data.quiz_id = parseInt(quizId);
        }
        return await axios.post<BurnoutAnswersResponse>(this.POST_ANSWERS_PATH, data)
    }
}

