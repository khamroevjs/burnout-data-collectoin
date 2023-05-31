import {SpbResult} from "./SpbResult";

export interface SpbAnswersResponse {
    token: string;
    respondent_id: number;
    result: SpbResult;
}
