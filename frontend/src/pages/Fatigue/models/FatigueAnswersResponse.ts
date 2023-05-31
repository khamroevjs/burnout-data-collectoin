import {FatigueResult} from "./FatigueResult";

export interface FatigueAnswersResponse {
    token: string;
    respondent_id: number;
    result: FatigueResult;
}
