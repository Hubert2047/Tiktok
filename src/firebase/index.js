import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    increment,
    limit,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    startAfter,
    updateDoc,
    where,
    writeBatch,
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

//hubert
// const firebaseConfig = {
//     apiKey: 'AIzaSyBNkhTkG9qsvJfuGXnTo3c-naS_9L92OYM',
//     authDomain: 'tiktok-2da3a.firebaseapp.com',
//     projectId: 'tiktok-2da3a',
//     storageBucket: 'tiktok-2da3a.appspot.com',
//     messagingSenderId: '194147259918',
//     appId: '1:194147259918:web:60fdc3ed843f725b2cce5f',
//     measurementId: 'G-0N45C1N94Q',
// }

const firebaseConfig2 = {
    apiKey: 'AIzaSyBCfGW5iCGLfaPtNuR1wLiqP2CPv600Q4I',
    authDomain: 'tiktok-clone-0707.firebaseapp.com',
    projectId: 'tiktok-clone-0707',
    storageBucket: 'tiktok-clone-0707.appspot.com',
    messagingSenderId: '196448174114',
    appId: '1:196448174114:web:3a7586dfb8c12582bb4a7b',
    measurementId: 'G-XPFHRLSLK4',
}

// Initialize Firebase hubert
//provider
// doc(database,collection,keyvalue) database =getFireStore(app)
const firebaseApp = initializeApp(firebaseConfig2)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()
const storage = getStorage(firebaseApp)

// handle Login
const loginWithGoogle = async function () {
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            return result.user
        })
        .catch((error) => {
            throw new Error(error.message)
        })
}
const logOut = async function (callback) {
    try {
        signOut(auth)
            .then(() => {
                callback()
            })
            .catch((error) => {
                // An error happened.
            })
    } catch (error) {
        throw new Error(error.message)
    }
}
const updateUser = async function (updateUser, uid) {
    // console.log(updateUser)
    const updateUsertRef = doc(db, 'users', uid)
    try {
        await updateDoc(updateUsertRef, { ...updateUser })
    } catch (error) {
        throw new Error(error.message)
    }
}

//user
const searchUsers = async function (searchValue, type = 'less') {
    // console.log('run')
    let q = query(collection(db, 'users'), orderBy('uid'), orderBy('full_name'))
    try {
        const querySnapshot = await getDocs(q)
        const data = []
        querySnapshot.docs.forEach((doc) => {
            const user = { id: doc.id, ...doc.data() }
            if (user.full_name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
                data.push(user)
            }
        })
        let result
        if (type === 'less') {
            result = data.slice(0, 5)
        } else {
            result = data.slice(0, 10)
        }
        return result
    } catch (error) {
        throw new Error(error.message)
    }
}
const getUser = async function (uid) {
    const q = query(collection(db, 'users'), where('uid', '==', uid))
    try {
        const querySnapshot = await getDocs(q)
        if (querySnapshot.docs.length < 1) {
            return undefined
        }
        return { ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id }
    } catch (error) {
        throw new Error(error.message)
    }
}
const isExistUser = async function (uid) {
    try {
        const q = query(collection(db, 'users'), where('uid', '==', uid))

        const querySnapshot = await getDocs(q)
        if (querySnapshot.docs.length < 1) {
            return false
        }
        return true
    } catch (error) {
        throw new Error(error.message)
    }
}
const getUserRealyTime = async function (uid, callback) {
    try {
        onSnapshot(doc(db, 'users', uid), async (doc) => {
            const user = { ...doc.data(), id: doc.id }
            callback(user)
        })
    } catch (error) {
        throw new Error(error.message)
    }
}
const addUser = async function (user) {
    try {
        await setDoc(doc(db, 'users', user.uid), user)
    } catch (error) {
        throw new Error(error.message)
    }
    // console.log(user)
}
const updateFollowing = async function (
    currentUserId,
    updateCurrentUserFollowing,
    followingUserId,
    isFollowing,
    newNotification = {}
) {
    const updateUserFollowingtRef = doc(db, 'users', followingUserId)
    const updateCurrentUserRef = doc(db, 'users', currentUserId)
    try {
        const batch = writeBatch(db)
        //task 1 // update current user following
        batch.update(updateCurrentUserRef, { following: updateCurrentUserFollowing })

        //task 2 //update user followers
        batch.update(updateUserFollowingtRef, { followers: isFollowing ? increment(-1) : increment(1) })
        if (!isFollowing) {
            batch.set(doc(db, `users/${followingUserId}/notifications`, uuidv4()), newNotification)
        }

        // task 3 //send notificaion to following or delete it
        else {
            const q = query(
                collection(db, `users/${followingUserId}/notifications`),
                where('fromUid', '==', currentUserId),
                where('notificationType', '==', 'Followers')
            )
            const _notification = await getDocs(q)
            if (_notification.size > 0) {
                const oldNotificationId = _notification.docs[0].id
                batch.delete(doc(db, `users/${followingUserId}/notifications/${oldNotificationId}`))
            }
        }
        await batch.commit()
    } catch (err) {
        throw new Error(err.message)
    }
}
// const updateFollowingUserInNotification = async function (
//     currentUserId,
//     updateCurrentUserFollowing,
//     followingUserId,
//     isFollowing,
//     newNotification = {},
//     followId
// ) {
//     const updateUserFollowingtRef = doc(db, 'users', followingUserId)
//     const updateCurrentUserRef = doc(db, 'users', currentUserId)
//     try {
//         const batch = writeBatch(db)
//         //task 1  // update current user following
//         batch.update(updateCurrentUserRef, { following: updateCurrentUserFollowing })

//         //task 2 //update user followers
//         batch.update(updateUserFollowingtRef, { followers: isFollowing ? increment(-1) : increment(1) })

//         //task 3 //send notificaion to following or delete it
//         if (!isFollowing) {
//             batch.set(doc(db, `users/${followingUserId}/notifications`, uuidv4()), newNotification)
//         } else {
//             const q = query(
//                 collection(db, `users/${followingUserId}/notifications`),
//                 where('fromUid', '==', currentUserId),
//                 where('notificationType', '==', 'Followers')
//             )
//             const _notification = await getDocs(q)
//             if (_notification.size > 0) {
//                 const oldNotificationId = _notification.docs[0].id
//                 batch.delete(doc(db, `users/${followingUserId}/notifications/${oldNotificationId}`))
//             }
//         }
//         //task 4 //update notification read, isFriend statements
//         const notificationStateDoc = doc(db, `users/${currentUserId}/notifications`, followId)
//         batch.update(notificationStateDoc, {
//             isRead: true,
//         })
//         await batch.commit()
//     } catch (err) {
//         throw new Error(err.message)
//     }
// }
const updateUserLikes = async function (uid, updateLike) {
    try {
        const updateUserLiketRef = doc(db, 'users', uid)
        await updateDoc(updateUserLiketRef, { likes: updateLike })
    } catch (error) {
        throw new Error(error.message)
    }
}

//sidebar
const getSuggestFollowing = async function (currentUser, limitValue = 5) {
    let q
    // console.log('current', currentUser)
    if (currentUser?.uid) {
        q = query(
            collection(db, 'users'),
            where('uid', 'not-in', [...(currentUser?.following || []), currentUser.uid].slice(0, 10) || []),
            limit(limitValue)
        )
    } else {
        q = query(collection(db, 'users'), limit(limitValue))
    }
    try {
        const querySnapshot = await getDocs(q)
        if (querySnapshot.docs.size < 1) return
        const suggestFollowingData = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
        })
        return suggestFollowingData
    } catch (error) {
        throw new Error(error.message)
    }
}
const getFollowing = async function (followingArray) {
    if (followingArray?.length < 1) return
    const q = query(collection(db, 'users'), where('uid', 'in', followingArray))
    const querySnapshot = await getDocs(q)
    const followingData = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
    })
    return followingData
}
const updateFollower = async function (uid, updateCountFollower) {
    try {
        const updateFollowerRef = doc(db, 'users', uid)
        await updateDoc(updateFollowerRef, { followers: updateCountFollower })
    } catch (error) {
        throw new Error(error.message)
    }
}

//post
const addPost = async function (newPost) {
    try {
        await setDoc(doc(db, 'posts', newPost.id), newPost)
    } catch (error) {
        throw new Error(error.message)
    }
}
const deletePost = async function (postId) {
    //also Delete comment
    try {
        await deleteDoc(doc(db, 'posts', postId))
        //handle delete comment belong to post
        //implement
    } catch (error) {
        throw new Error(error.message)
    }
}
const updatePost = async function (postid, newPost) {
    try {
        // console.log({ ...newPost })
        const updatePostRef = doc(db, 'posts', postid)
        await updateDoc(updatePostRef, { ...newPost })
    } catch (error) {
        throw new Error(error.message)
    }
}
const getPosts = async function (callback, lastPost = -1) {
    if (typeof callback !== 'function') return
    const q = query(
        collection(db, 'posts'),
        orderBy('played'),
        orderBy('createdAt', 'desc'),
        startAfter(lastPost),
        limit(10)
    )

    const users = [] //store all getUser Promise

    //not realtime

    const querySnapshot = await getDocs(q)
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
    if (querySnapshot.size < 1) return callback({})

    let posts = querySnapshot.docs.map((doc) => {
        users.push(getUser(doc.data().uid))
        return { ...doc.data(), id: doc.id }
    })
    const allUsers = await Promise.all(users)
    //get users create post
    posts = posts.map((post) => {
        return { ...post, user: allUsers?.find((user) => user?.uid === post?.uid) }
    })
    const data = { posts, lastDoc }
    // console.log(posts)
    callback(data)

    //realtime
    // onSnapshot(
    //     q,
    //     async (querySnapshot) => {
    //         const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
    //         if (querySnapshot.size < 1)  callback({})
    //         let posts = querySnapshot.docs.map((doc) => {
    //             users.push(getUser(doc.data().uid))
    //             return { ...doc.data(), id: doc.id }
    //         })
    //         const allUsers = await Promise.all(users)
    //         //get user create post
    //         posts = posts.map((post) => {
    //             return { ...post, user: allUsers?.find((user) => user?.uid === post?.uid) }
    //         })
    //         const data = { posts, lastDoc }
    //         // console.log('data', data)
    //         // console.log(lastDoc.data())
    //         callback(data)
    //     },
    //     (err) => {
    //         throw new Error(err.message)
    //     }
    // )
}
const getPost = async function (postId) {
    try {
        const docRef = doc(db, 'posts', postId)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) return false
        const user = await getUser(docSnap.data().uid)
        return { ...docSnap.data(), id: docSnap.id, user: user }
    } catch (error) {
        throw new Error(error.message)
    }
}
const getUserPosts = async function (uid) {
    try {
        const q = query(collection(db, 'posts'), where('uid', '==', uid))
        const querySnapshot = await getDocs(q)
        if (querySnapshot.size < 1) return []
        const userPromise = []
        const posts = querySnapshot.docs?.map((doc) => {
            userPromise.push(getUser(doc.data().uid))
            return { id: doc.id, ...doc.data() }
        })
        const users = await Promise.all(userPromise)
        const data = posts.map((post) => {
            const postUser = users.find((user) => user.uid === post.uid)
            return { ...post, postUser: postUser }
        })
        // console.log(data)
        return data
    } catch (err) {
        throw new Error(err.message)
    }
}
//search post with an array
const searchPostByArray = async function (array = [], callback) {
    // console.log(array)
    const q = query(collection(db, 'posts'), where('id', 'in', array))
    const querySnapshot = await getDocs(q)
    try {
        // console.log(querySnapshot.size)
        const usersPromise = []
        if (querySnapshot.size < 1) return []
        const posts = querySnapshot.docs?.map((doc) => {
            usersPromise.push(getUser(doc.data().uid))
            return { id: doc.id, ...doc.data() }
        })
        const users = await Promise.all(usersPromise)
        const data = posts.map((post) => {
            return { ...post, user: users.find((user) => user.uid === post.uid) }
        })

        callback(data)
    } catch (err) {
        throw new Error(err.message)
    }
}
//search post by user id
const searchPost = async function (uid) {
    try {
        const usersPromise = []
        const q = query(collection(db, 'posts'), where('uid', '==', uid))
        const querySnapshot = await getDocs(q)
        if (querySnapshot.size < 1) return []
        const posts = querySnapshot.docs?.map((doc) => {
            usersPromise.push(getUser(doc.data().uid))
            return { id: doc.id, ...doc.data() }
        })
        const users = await Promise.all(usersPromise)
        const data = posts.map((post) => {
            return { ...post, user: users.find((user) => user.uid === post.uid) }
        })
        return data
    } catch (err) {
        throw new Error(err.message)
    }
}
const handlePostLike = async function (currentUser, post, updateLikes, isLikedPost, notifications) {
    const batch = writeBatch(db)
    const updatePostLiketRef = doc(db, 'posts', post.id)
    const currentUserRef = doc(db, 'users', currentUser.uid)
    //update user like
    try {
        batch.update(currentUserRef, {
            likes: updateLikes,
        })
        //update post like
        batch.update(updatePostLiketRef, {
            likes: isLikedPost ? increment(-1) : increment(1),
        })
        // update notification
        if (currentUser.uid !== post.uid) {
            //send notification to user of the post
            if (!isLikedPost) {
                batch.set(doc(db, `users/${post.uid}/notifications`, uuidv4()), notifications)
            } else {
                // delete notification
                const q = query(
                    collection(db, `users/${post.uid}/notifications`),
                    where('fromUid', '==', currentUser.uid),
                    where('notificationType', '==', 'Likes'),
                    where('likeType', '==', 'video')
                )
                const _notification = await getDocs(q)
                if (_notification?.size > 0) {
                    const oldNotificationId = _notification.docs[0].id
                    batch.delete(doc(db, `users/${post.uid}/notifications/${oldNotificationId}`))
                }
            }
        }

        await batch.commit()
    } catch (error) {
        throw new Error(error.message)
    }
}

//comment
const getCommentCount = async function (postId, callback) {
    // console.log(postId)
    let q = query(collection(db, 'comments'), where('postId', '==', postId))
    // try {
    //     const querySnapshot = await getDocs(q)
    //     const comments = querySnapshot.docs.map((doc) => {
    //         return { id: doc.id, ...doc.data() }
    //     })
    //     return comments
    // } catch (error) {
    //     throw new Error(error.message)
    // }
    onSnapshot(
        q,
        async (querySnapshot) => {
            callback(querySnapshot.size)
        },
        (err) => {
            throw new Error(err.message)
        }
    )
}
const getCommentNotRealTime = async function (postId) {
    const q = query(collection(db, 'comments'), where('postId', '==', postId))
    try {
        const querySnapshot = await getDocs(q)
        const comments = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
        })
        return comments
    } catch (error) {
        throw new Error(error.message)
    }
}
const getComments = async function ({ postId, callback, parentId = 'null' }) {
    if (typeof callback !== 'function') return
    let q = query(
        collection(db, 'comments'),
        where('postId', '==', postId),
        where('parentId', '==', parentId),
        orderBy('createdAt')
    )
    onSnapshot(
        q,
        async (querySnapshot) => {
            if (querySnapshot.size < 1) return callback([])
            const comments = []
            const getUserFunc = [] //get all user information then merge  to comments
            querySnapshot.docs.forEach((doc) => {
                getUserFunc.push(getUser(doc.data().uid))
                comments.push({ id: doc.id, ...doc.data() })
            })
            const users = await Promise.all(getUserFunc)
            const data = comments?.map((comment) => {
                return { ...comment, user: users?.find((user) => user?.uid === comment?.uid) }
            })
            callback(data)
        },
        (err) => {
            throw new Error(err.message)
        }
    )
}
const updateCommentLikes = async (currentUser, commentId, likes, notificationToUid, newNotification, isLiked) => {
    const batch = writeBatch(db)

    const updateCommentRef = doc(db, 'comments', commentId)
    try {
        batch.update(updateCommentRef, {
            likes: likes,
        })

        //add
        if (currentUser.uid !== notificationToUid) {
            if (!isLiked) {
                batch.set(doc(db, `users/${notificationToUid}/notifications`, newNotification.id), newNotification)
            } else {
                const q = query(
                    collection(db, `users/${notificationToUid}/notifications`),
                    where('fromUid', '==', currentUser.uid),
                    where('notificationType', '==', 'Likes')
                )
                const _notification = await getDocs(q)
                if (_notification?.size > 0) {
                    const oldNotificationId = _notification.docs[0].id
                    batch.delete(doc(db, `users/${notificationToUid}/notifications/${oldNotificationId}`))
                }
            }
        }

        await batch.commit()
    } catch (error) {
        throw new Error(error.message)
    }
}
const addComment = async function (currentUser, notificationToUid, comment, newNotification) {
    try {
        // console.log(_comment)
        const batch = writeBatch(db)
        //save comment
        batch.set(doc(db, 'comments', comment.id), comment)
        // send notification to user of current video
        if (currentUser.uid !== notificationToUid)
            batch.set(doc(db, `users/${notificationToUid}/notifications`, newNotification.id), newNotification)
        await batch.commit()
    } catch (err) {
        throw new Error(err.message)
    }
}
const deleteComment = async function (commentId) {
    try {
        await deleteDoc(doc(db, 'comments', commentId))
    } catch (error) {
        throw new Error(error.message)
    }
}

// messages

const addChat = async function (currentUser, friendUid, msg) {
    const fromDoc = `users/${currentUser.uid}/chats`
    const toDoc = `users/${friendUid}/chats`
    const batch = writeBatch(db)
    try {
        const id = uuidv4()
        //save to current user
        batch.set(doc(db, fromDoc, friendUid), {
            isFriendSending: false,
            createdAt: new Date(),
            lastTime: new Date(),
            friendUid: friendUid,
            messages: [
                {
                    id: id,
                    createdAt: new Date(),
                    fromUid: currentUser.uid,
                    content: msg,
                    isRead: false,
                    likes: [],
                },
            ],
        })
        batch.set(doc(db, toDoc, currentUser.uid), {
            isFriendSending: false,
            createdAt: new Date(),
            lastTime: new Date(),
            friendUid: currentUser.uid,
            messages: [
                {
                    id: id,
                    createdAt: new Date(),
                    fromUid: currentUser.uid,
                    content: msg,
                    isRead: false,
                    likes: [],
                },
            ],
        }) //save to friend chat
        await batch.commit()
    } catch (err) {
        throw new Error(err.message)
    }
}
const removeMessage = async function (currentUser, friendUid, msg) {
    const removeMessageRef = doc(db, `users/${currentUser.uid}/chats`, friendUid)
    try {
        await updateDoc(removeMessageRef, {
            messages: arrayRemove(msg),
        })
    } catch (error) {
        throw new Error(error.message)
    }
}
const isFriendSendingMessage = async function (currentUser, friendUid) {
    if (!currentUser.uid || !friendUid) return false
    const currentUserDoc = doc(db, `users/${currentUser.uid}/chats`, friendUid)
    try {
        const friend = await getDoc(currentUserDoc)
        if (friend?.data() < 1) {
            return false
        }
        return friend?.data()?.isFriendSending || false
    } catch (error) {
        throw new Error(error.message)
    }
}
const updateSendingMessageState = async function (currentUser, friendUid, state) {
    const friendDoc = doc(db, `users/${friendUid}/chats`, currentUser.uid)
    try {
        await updateDoc(friendDoc, {
            isFriendSending: state,
        })
    } catch (err) {
        throw new Error(err.messages)
    }
}
const unSendMessage = async function (currentUser, friendUid, unSendMsg) {
    const fromDoc = doc(db, `users/${currentUser.uid}/chats`, friendUid)
    const toDoc = doc(db, `users/${friendUid}/chats`, currentUser.uid)
    const batch = writeBatch(db)
    const data = await Promise.all([getDoc(fromDoc), getDoc(toDoc)])
    const fromMessages = data[0].data().messages.map((message) => {
        if (message.id === unSendMsg.id) {
            return { ...message, content: `${currentUser.full_name} unsend a message`, isUnsended: true }
        }
        return message
    })
    const toMessages = data[1].data().messages.map((message) => {
        if (message.id === unSendMsg.id) {
            return { ...message, content: `${currentUser.full_name} unsend a message`, isUnsended: true }
        }
        return message
    })
    try {
        batch.update(fromDoc, {
            messages: fromMessages,
        })
        batch.update(toDoc, {
            unReadMsg: unSendMsg.isRead ? increment(0) : increment(-1),
            messages: toMessages,
        })

        await batch.commit()
    } catch (error) {
        throw new Error(error.message)
    }
}
const getChats = async function (currentUser, callback) {
    if (typeof callback !== 'function' || !currentUser?.uid) return
    const q = query(collection(db, `users/${currentUser.uid}/chats`), orderBy('lastTime'))
    const getFriendChatPromiseFunc = [] //store all getUser Promise
    // console.log('run')

    onSnapshot(
        q,
        async (querySnapshot) => {
            if (querySnapshot.size < 1) return callback([])
            // console.log('run')
            const chats = querySnapshot.docs.map((doc) => {
                getFriendChatPromiseFunc.push(getUser(doc.data()?.friendUid))
                return { ...doc.data(), id: doc.id }
            })
            const friendsInfor = await Promise.all(getFriendChatPromiseFunc)
            const data = chats.map((chat) => {
                return { ...chat, friendChat: friendsInfor.find((friend) => friend.uid === chat.friendUid) }
            })
            // console.log('chat', data)
            callback(data.reverse())
        },
        (err) => {
            throw new Error(err.message)
        }
    )
}
const likeMessage = async function (currentUser, friendUid, updateMsg) {
    const currentUserDoc = doc(db, `users/${currentUser.uid}/chats`, friendUid)
    const friendDoc = doc(db, `users/${friendUid}/chats`, currentUser.uid)
    const data = await Promise.all([getDoc(currentUserDoc), getDoc(friendDoc)])
    if (data?.length < 1) return
    const currentUserMessages = data[0].data().messages.map((msg) => {
        if (msg.id === updateMsg.id) {
            return updateMsg
        }
        return msg
    })

    const friendMessages = data[1].data().messages.map((msg) => {
        if (msg.id === updateMsg.id) {
            return updateMsg
        }
        return msg
    })
    try {
        const batch = writeBatch(db)

        batch.update(currentUserDoc, {
            messages: currentUserMessages,
        })
        batch.update(friendDoc, {
            messages: friendMessages,
        })

        await batch.commit()
    } catch (error) {
        throw new Error(error.message)
    }
    // console.log(friendMessages)
}
const getLikeMessageUserInfor = async function (users) {
    if (users?.length < 1) return
    const q = query(collection(db, 'users'), where('uid', 'in', users))
    try {
        const querySnapshot = await getDocs(q)
        if (querySnapshot.docs.length < 1) {
            return []
        }
        const data = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
        })
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}
const getUnReadMessages = async function (currentUser, callback) {
    if (typeof callback !== 'function' || !currentUser?.uid) return
    const q = query(collection(db, `users/${currentUser.uid}/chats`), orderBy('lastTime'))
    onSnapshot(
        q,
        async (querySnapshot) => {
            if (querySnapshot.size < 1) return callback(0)
            const data = querySnapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
            const unReadMsgCount = data.reduce((prevValue, current) => prevValue + current.unReadMsg, 0)
            callback(unReadMsgCount)
        },
        (err) => {
            throw new Error(err.message)
        }
    )
}
const updateReadMessageState = async function (currentUser, friendUid) {
    const fromDoc = doc(db, `users/${currentUser.uid}/chats`, friendUid)
    const toDoc = doc(db, `users/${friendUid}/chats`, currentUser.uid)
    const batch = writeBatch(db)
    const data = await Promise.all([getDoc(fromDoc), getDoc(toDoc)])
    if (data.length < 2) return
    // update isread message to True state
    const fromMessages = data[0].data().messages.map((msg) => {
        if (!msg.isRead) {
            return { ...msg, isRead: true }
        }
        return msg
    })
    const toMessages = data[1].data().messages.map((msg) => {
        if (!msg.isRead) {
            return { ...msg, isRead: true }
        }
        return msg
    })
    try {
        batch.update(fromDoc, {
            unReadMsg: 0,
            messages: fromMessages,
        })
        batch.update(toDoc, {
            unReadMsg: 0,
            messages: toMessages,
        })

        await batch.commit()
    } catch (error) {
        throw new Error(error.message)
    }

    // console.log(fromMessages, toMessages)
}
const addMessage = async function (currentUser, friendUid, newMessage) {
    // console.log('run')
    const fromDoc = doc(db, `users/${currentUser.uid}/chats`, friendUid)
    const toDoc = doc(db, `users/${friendUid}/chats`, currentUser.uid)
    const batch = writeBatch(db)

    try {
        // console.log(message)

        batch.update(fromDoc, {
            lastTime: new Date(),
            messages: arrayUnion(newMessage),
        })
        batch.update(toDoc, {
            unReadMsg: increment(1),
            lastTime: new Date(),
            messages: arrayUnion(newMessage),
        })

        await batch.commit()
    } catch (err) {
        throw new Error(err.message)
    }
}

//notifications
const getNotifications = async function (currentUser, callback) {
    // console.log(currentUser)
    if (typeof callback !== 'function' || !currentUser?.uid) return
    const q = query(
        collection(db, `users/${currentUser.uid}/notifications`),
        orderBy('isRead'),
        orderBy('createdAt', 'desc'),
        limit(20)
    )
    const getUserPromiseFunc = [] //store all getUser Promise

    onSnapshot(
        q,
        async (querySnapshot) => {
            if (querySnapshot.size < 1) return callback([])
            // console.log('run')
            const notifications = querySnapshot.docs.map((doc) => {
                getUserPromiseFunc.push(getUser(doc.data()?.fromUid))
                return { ...doc.data(), id: doc.id }
            })
            const Users = await Promise.all(getUserPromiseFunc)
            const data = notifications.map((notification) => {
                return { ...notification, fromUser: Users.find((user) => user.uid === notification.fromUid) }
            })
            // console.log('notification', data)
            callback(data)
        },
        (err) => {
            throw new Error(err.message)
        }
    )
}
// const getNewNotification = async function (currentUser, callback) {
//     if (typeof callback !== 'function' || !currentUser?.uid) return
//     const q = query(
//         collection(db, `users/${currentUser.uid}/notifications`),
//         orderBy('isRead'),
//         orderBy('createdAt', 'desc'),
//         limit(1)
//     )

//     onSnapshot(
//         q,
//         async (querySnapshot) => {
//             if (querySnapshot.size < 1) return callback(null)
//             const notification = { ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0] }
//             const user = await getUser(notification?.fromUid)
//             if (!user.uid) return callback(null)
//             const data = { ...notification, fromUser: user }
//             console.log(data)
//             callback(data)
//         },
//         (err) => {
//             throw new Error(err.message)
//         }
//     )
// }
const addNotifications = async function (toUid, newNotifications) {
    try {
        // console.log(_comment)
        await addDoc(collection(db, `users/${toUid}/notifications`), newNotifications)
    } catch (err) {
        throw new Error(err.message)
    }
}
const getNotificationCount = async function getNotificationCount(currentUser, callback) {
    if (typeof callback !== 'function' || !currentUser?.uid) return
    const q = query(
        collection(db, `users/${currentUser.uid}/notifications`),
        where('isRead', '==', false),
        orderBy('createdAt')
    )
    onSnapshot(
        q,
        async (querySnapshot) => {
            callback(querySnapshot?.size || 0)
        },
        (err) => {
            throw new Error(err.message)
        }
    )
}
const updateNotificationReadState = async function (currentUser, notificationId) {
    const notificationStateDoc = doc(db, `users/${currentUser.uid}/notifications`, notificationId)
    try {
        await updateDoc(notificationStateDoc, {
            isRead: true,
        })
    } catch (err) {
        throw new Error(err.message)
    }
}

//upload file

const uploadFile = async function (stringUrl, fileRef) {
    const storageRef = ref(storage, fileRef)
    return uploadString(storageRef, stringUrl, 'data_url').then((snapshot) => {
        return getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
                return downloadURL
            })
            .catch((err) => {
                throw new Error(err.message)
            })
    })
}
const uploadFileProgress = async function (url, locateRef, loadFunc) {
    const storage = getStorage()
    const storageRef = ref(storage, locateRef)

    const uploadTask = uploadString(storageRef, url, 'data_url')
    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            loadFunc(progress)
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused')
                    break
                case 'running':
                    console.log('Upload is running')
                    break
                default:
            }
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // callback(downloadURL)
                console.log(downloadURL)
            })
        }
    )
}

export {
    db,
    loginWithGoogle,
    logOut,
    searchUsers,
    isExistUser,
    getUser,
    getUserRealyTime,
    addUser,
    updateUser,
    updateUserLikes,
    updateFollowing,
    getSuggestFollowing,
    getFollowing,
    updateFollower,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    addPost,
    getUserPosts,
    searchPostByArray,
    handlePostLike,
    searchPost,
    getComments,
    getCommentNotRealTime,
    addComment,
    deleteComment,
    getCommentCount,
    updateCommentLikes,
    getChats,
    addChat,
    addMessage,
    updateReadMessageState,
    getUnReadMessages,
    removeMessage,
    unSendMessage,
    likeMessage,
    getLikeMessageUserInfor,
    isFriendSendingMessage,
    updateSendingMessageState,
    getNotifications,
    getNotificationCount,
    // getNewNotification,
    addNotifications,
    updateNotificationReadState,
    uploadFile,
    uploadFileProgress,
}
