import {BurnoutResult} from "./BurnoutResult";

export interface BurnoutAnswersResponse {
    token: string;
    respondent_id: number;
    result: BurnoutResult;
}
