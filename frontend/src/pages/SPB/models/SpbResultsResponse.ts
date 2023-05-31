import {SpbResult} from "./SpbResult";

export interface SpbResultsResponse {
    total: number;
    page: number;
    size: number;
    data: SpbResult[];
}
