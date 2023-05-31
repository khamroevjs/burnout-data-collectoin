import {CopingResult} from "./CopingResult";

export interface CopingAnswersResponse {
    token: string;
    respondent_id: number;
    result: CopingResult;
}
