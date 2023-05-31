export const irrationalAttitude = (value: number): string => {
    if (value < 30) {
        return "Выраженное наличине"
    }

    if (value <= 45) {
        return "Наличине"
    }

    return "Отсутствие"
}
