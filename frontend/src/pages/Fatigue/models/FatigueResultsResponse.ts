import {FatigueResult} from "./FatigueResult";

export interface FatigueResultsResponse {
    total: number;
    page: number;
    size: number;
    data: FatigueResult[];
}
