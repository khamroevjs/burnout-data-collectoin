import {inRange} from "./CommonUtils";


export const strategyLevel = (value: number) => {
    if (inRange(value, 0, 39)) {
        return "Редкое"
    }
    if (inRange(value, 40, 60)) {
        return "Умеренное"
    }
    return "Выраженное"
}
