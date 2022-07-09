import { v4 as uuidv4 } from 'uuid'
import { handlePostLike, updateFollowing } from '~/firebase'
import { notification } from '~/staticData'
/* eslint-disable react-hooks/rules-of-hooks */
export const windowHeight = function () {
    const doc = document.documentElement
    doc.style.setProperty('--window-height', `${window.innerHeight}px`)
    console.log(window.innerHeight)
}
export const formatVideoTime = function (seconds) {
    if (seconds < 10) return `00:0${seconds}`
    if (seconds < 60) return `00:${seconds}`
    const minutes = seconds / 60
    const minuteMod = seconds % 60
    if (minutes < 10) {
        if (minuteMod < 10) return `0${minutes}:0${minuteMod}`
        else return `0${minutes}:${minuteMod}`
    }
    if (minutes > 10) {
        if (minuteMod < 10) return `${minutes}:0${minuteMod}`
        else return `${minutes}:${minuteMod}`
    }
    return ''
}
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
    if (secondDifferent < 60) return `1s ago`

    const minuteDifferent = Math.floor((currentDate - timeStampDate) / 1000 / 60)
    if (minuteDifferent < 60) return `${minuteDifferent}m ago`

    const hourDifferent = Math.floor((currentDate - timeStampDate) / 1000 / 60 / 60)
    if (hourDifferent < 24) return `${hourDifferent}h ago`

    const dayDifferent = Math.floor((currentDate - timeStampDate) / 1000 / 60 / 60 / 24)
    if (dayDifferent < 7) return `${dayDifferent}d ago`
    const weekDifferent = Math.floor((currentDate - timeStampDate) / 1000 / 60 / 60 / 24 / 7)
    if (weekDifferent < 52) return `${weekDifferent}w ago`

    return timeStampDate.toLocaleDateString()
}
export const formatMessageTime = function (timeStamp) {
    if (!timeStamp) return
    const isMoreThanOneDay = new Date().getDate() - new Date(timeStamp.seconds * 1000).getDate()
    if (!isMoreThanOneDay) {
        return new Date(timeStamp * 1000).toLocaleTimeString()
    }
    return new Date(timeStamp.seconds * 1000).toLocaleDateString()
}

export const formatCountNumber = function (countNumber) {
    if (!countNumber) return 0
    const thousand = (countNumber / 1000).toFixed(1)
    const million = (countNumber / Math.pow(10, 6)).toFixed(1)
    if (thousand < 1) return `${countNumber}`
    if (million < 1) return `${thousand}K`
    return `${million} M`
}

export const handleFollowingUser = async function (currentUser, followingUser, isFollowing) {
    if (!currentUser.uid) {
        return {
            showLogin: true,
            isFollowing: isFollowing,
        }
    }
    if (currentUser.uid === followingUser.uid) return
    const newNotification = {
        id: uuidv4(),
        createdAt: new Date(),
        fromUid: currentUser.uid,
        notificationType: notification.constain.FOLLOWERS,
        isRead: false,
    }
    let updateUserFollowing = []
    if (isFollowing) {
        updateUserFollowing = currentUser.following.filter((follow) => follow !== followingUser.uid) //delete current use
    } else {
        updateUserFollowing = [...(currentUser.following || []), followingUser.uid] //add current user
    }
    try {
        await updateFollowing(currentUser.uid, updateUserFollowing, followingUser.id, isFollowing, newNotification)
        return {
            isFollowing: !isFollowing,
        }
    } catch (e) {
        throw new Error(e.message)
    }
}

export const handleLikePost = async function (currentUser, post, isLikedPost) {
    if (!currentUser.uid) {
        return {
            showLogin: true,
            isLikedPost: isLikedPost,
        }
    }
    let updateUserLikePost
    const newNotification = {
        id: uuidv4(),
        createdAt: new Date(),
        notificationType: notification.constain.LIKES,
        fromUid: currentUser.uid,
        postId: post.id,
        likeType: 'video',
        poster: post.poster,
        createPostBy: post.uid,
        isRead: false,
    }
    if (isLikedPost) {
        updateUserLikePost = currentUser?.likes?.filter((like) => like !== post.id)
    } else {
        updateUserLikePost = [...(currentUser?.likes || []), post.id]
    }

    try {
        await handlePostLike(currentUser, post, updateUserLikePost, isLikedPost, newNotification)
        return {
            isLikedPost: !isLikedPost,
            value: isLikedPost ? -1 : 1,
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
export const goBackHome = function () {}
