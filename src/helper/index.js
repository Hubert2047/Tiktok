/* eslint-disable react-hooks/rules-of-hooks */
export const convertTimeStampToDate = function (timeStamp) {
    if (!timeStamp) return
    const timeStampDate = new Date(timeStamp.seconds * 1000)
    const currentDate = new Date()
    const secondDifferent = Math.floor((currentDate - timeStampDate) / 1000)
    if (secondDifferent < 60) return `1s ago`

    const minuteDifferent = Math.floor((currentDate - timeStampDate) / 1000 / 60)
    if (minuteDifferent < 60) return `${minuteDifferent}m ago`

    const hourDifferent = Math.floor((currentDate - timeStampDate) / 1000 / 60 / 60)
    if (hourDifferent < 24) return `${hourDifferent}h ago`

    const dayDifferent = Math.floor((currentDate - timeStampDate) / 1000 / 60 / 60 / 24)
    if (dayDifferent < 7) return `${dayDifferent}d ago`

    return timeStampDate.toLocaleDateString()
}

export const formatCountNumber = function (countNumber) {
    const thousand = (countNumber / 1000).toFixed(1)
    const million = (countNumber / Math.pow(10, 6)).toFixed(1)
    if (thousand < 1) return `${countNumber}`
    if (million < 1) return `${thousand}K`
    return `${million} M`
}
