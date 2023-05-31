import axios from "axios";
import {Respondent} from "../common/models/Respondent";


export default class RespondentService {
    private static RESPONDENT_PATH = "/api/gateway/v1/respondent"

    static async createUser() {
        return await axios.post<Respondent>(this.RESPONDENT_PATH)
    }

    static async getId(token: string) {
        const config = {
            params: {
                token: token,
            }
        }
        return await axios.get<number>(this.RESPONDENT_PATH, config)
    }
}