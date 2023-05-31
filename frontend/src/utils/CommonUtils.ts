export const inRange = (value: number, min: number, max: number) => min <= value && value <= max;

export const inPercent = (value: number, max: number) => Math.round(value / max * 100)

export const localDateTime = (dateTime: string) => {
    const serverDatetime = new Date(dateTime)
    const clientTimezoneOffset = new Date().getTimezoneOffset() // Convert minutes to milliseconds
    const clientDatetime = new Date(serverDatetime.getTime() - clientTimezoneOffset);
    return clientDatetime.toLocaleString()
}

export const redirect = (url: string) => {
    window.location.replace(url) 
}
