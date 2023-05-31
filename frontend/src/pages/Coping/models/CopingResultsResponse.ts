import {CopingResult} from "./CopingResult";

export interface CopingResultsResponse {
    total: number;
    page: number;
    size: number;
    data: CopingResult[];
}
