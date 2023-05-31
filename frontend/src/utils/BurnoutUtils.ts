import {inRange} from "./CommonUtils";


export const exhaustionLevel = (value: number): string => {
    if (inRange(value, 0, 15)) {
        return "Низкий уровень"
    }
    if (inRange(value, 16, 24)) {
        return "Средний уровень"
    }
    return "Высокий уровень"
}

export const depersonalizationLevel = (value: number): string => {
    if (inRange(value, 0, 5)) {
        return "Низкий уровень"
    }
    if (inRange(value, 6, 10)) {
        return "Средний уровень"
    }
    return "Высокий уровень"
}

export const reductionLevel = (value: number): string => {
    if (inRange(value, 0, 30)) {
        return "Высокий уровень"
    }
    if (inRange(value, 31, 36)) {
        return "Средний уровень"
    }
    return "Низкий уровень"
}
