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
    if (dayDifferent < 30) return `${dayDifferent}d ago`
    const monthDifferent = Math.floor((currentDate - timeStampDate) / 1000 / 60 / 60 / 24 / 30)
    if (monthDifferent < 12) return `${dayDifferent}month ago`

    return timeStampDate.toLocaleDateString()
}
export const formatTimeNotification = function (timeStamp) {
    if (!timeStamp) return
    const timeStampDate = new Date(timeStamp.seconds * 1000)
    const currentDate = new Date()
    const secondDifferent = Math.floor((currentDate - timeStampDate) / 1000)
    if (secondDifferent < 60) return `1s `

    const minuteDifferent = Math.floor((currentDate - timeStampDate) / 1000 / 60)
    if (minuteDifferent < 60) return `${minuteDifferent}m `

    const hourDifferent = Math.floor((currentDate - timeStampDate) / 1000 / 60 / 60)
    if (hourDifferent < 24) return `${hourDifferent}h `

    const dayDifferent = Math.floor((currentDate - timeStampDate) / 1000 / 60 / 60 / 24)
    if (dayDifferent < 7) return `${dayDifferent}d `
    const weekDifferent = Math.floor((currentDate - timeStampDate) / 1000 / 60 / 60 / 24 / 7)
    if (weekDifferent < 52) return `${weekDifferent}w `

    return timeStampDate.toLocaleDateString()
}
export const formatMessageTime = function (timeStamp) {
    if (!timeStamp) return
    const isMoreThanOneDay = new Date().getDate() - new Date(timeStamp.seconds * 1000).getDate()
    if (!isMoreThanOneDay) {
        return new Date(timeStamp * 1000).toLocaleTimeString()
    }
    return new Date(timeStamp.seconds * 1000).toLocaleString()
}

export const formatCountNumber = function (countNumber) {
    if (!countNumber) return 0
    const thousand = (countNumber / 1000).toFixed(1)
    const million = (countNumber / Math.pow(10, 6)).toFixed(1)
    if (thousand < 1) return `${countNumber}`
    if (million < 1) return `${thousand}K`
    return `${million} M`
}
