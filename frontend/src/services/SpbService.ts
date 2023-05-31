import axios from "axios";
import {SpbResultsResponse} from "../pages/SPB/models/SpbResultsResponse";
import {SpbAnswersResponse} from "../pages/SPB/models/SpbAnswersResponse";

export default class SpbService {
    private static GET_RESULTS_PATH = "/api/spb/v1/results"
    private static POST_ANSWERS_PATH = "/api/spb/v1/answers"

    static async getResults(token: string | null, currentPage = 0, pageSize = 10) {
        const config = {
            params: {
                token: token,
                page: currentPage - 1,
                size: pageSize
            }
        }
        return await axios.get<SpbResultsResponse>(this.GET_RESULTS_PATH, config);
    }

    static async postAnswers(token: string | null, quizId: string | null, answers: number[]) {
        const data: any = {answers: answers};
        if (token !== null) {
            data.token = token;
        }
        if (quizId !== null) {
            data.quiz_id = parseInt(quizId);
        }
        return await axios.post<SpbAnswersResponse>(this.POST_ANSWERS_PATH, data)
    }
}
