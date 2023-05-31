import {BurnoutResult} from "./BurnoutResult";

export interface BurnoutResultsResponse {
    total: number;
    page: number;
    size: number;
    data: BurnoutResult[];
}
