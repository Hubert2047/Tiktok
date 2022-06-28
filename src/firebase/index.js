import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import {
    addDoc,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
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
import { v4 as uuidv4 } from 'uuid'

const firebaseConfig = {
    apiKey: 'AIzaSyBNkhTkG9qsvJfuGXnTo3c-naS_9L92OYM',
    authDomain: 'tiktok-2da3a.firebaseapp.com',
    projectId: 'tiktok-2da3a',
    storageBucket: 'tiktok-2da3a.appspot.com',
    messagingSenderId: '194147259918',
    appId: '1:194147259918:web:60fdc3ed843f725b2cce5f',
    measurementId: 'G-0N45C1N94Q',
}

// Initialize Firebase
//provider
// doc(database,collection,keyvalue) database =getFireStore(app)
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()

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
    signOut(auth)
        .then(() => {
            callback()
        })
        .catch((error) => {
            // An error happened.
        })
}

//user
const searchUsers = async function (searchValue, type = 'less') {
    // console.log('run')
    let q = query(collection(db, 'users'), orderBy('full_name'))
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
    // onSnapshot(
    //     q,
    //     (querySnapshot) => {
    //         const data = []
    //         querySnapshot.docs.forEach((doc) => {
    //             const user = { id: doc.id, ...doc.data() }
    //             if (user.full_name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
    //                 data.push(user)
    //             }
    //         })
    //         let result
    //         if (type === 'less') {
    //             result = data.slice(0, 5)
    //         } else {
    //             result = data.slice(0, 10)
    //         }
    //         // console.log('firebase', data)
    //         callback(result)
    //     },
    //     (err) => {
    //         throw new Error(err.message)
    //     }
    // )
}
const getUser = async function (uid) {
    const q = query(collection(db, 'users'), where('uid', '==', uid))

    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length < 1) {
        return undefined
    }
    return { ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id }
}
const isExistUser = async function (uid) {
    const q = query(collection(db, 'users'), where('uid', '==', uid))

    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length < 1) {
        return false
    }
    return true
}
const getUserRealyTime = async function (uid, callback) {
    onSnapshot(doc(db, 'users', uid), async (doc) => {
        const user = { ...doc.data(), id: doc.id }
        callback(user)
    })
}
const addUser = async function (user) {
    // console.log(user)
    await setDoc(doc(db, 'users', user.uid), user)
}
const updateFollowing = async function (currentId, updateCurrentUserFollowing, followingUserId, updateCountFollower) {
    const updateUserFollowingtRef = doc(db, 'users', currentId)
    try {
        updateDoc(updateUserFollowingtRef, { following: updateCurrentUserFollowing })
        updateFollower(followingUserId, updateCountFollower)
    } catch (err) {
        throw new Error(err.message)
    }
}
const updateUserLikes = async function (uid, updateLike) {
    const updateUserLiketRef = doc(db, 'users', uid)
    await updateDoc(updateUserLiketRef, { likes: updateLike })
}

//sidebar
const getSuggestFollowing = async function (currentUser, limitValue = 5) {
    let q
    // console.log('current', currentUser)
    if (currentUser?.uid) {
        q = query(
            collection(db, 'users'),
            where('uid', 'not-in', [...(currentUser?.following || []), currentUser.uid] || []),
            limit(limitValue)
        )
    } else {
        q = query(collection(db, 'users'), limit(limitValue))
    }

    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.size < 1) return
    const suggestFollowingData = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
    })
    return suggestFollowingData
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
    const updateFollowerRef = doc(db, 'users', uid)
    await updateDoc(updateFollowerRef, { followers: updateCountFollower })
}

//post
const getPosts = function (callback, lastPost = 0) {
    if (typeof callback !== 'function') return
    const q = query(collection(db, 'posts'), orderBy('played'), startAfter(lastPost), limit(6))
    const users = [] //store all getUser Promise
    onSnapshot(
        q,
        async (querySnapshot) => {
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
            if (querySnapshot.size < 1) return []
            let posts = querySnapshot.docs.map((doc) => {
                users.push(getUser(doc.data().uid))
                return { ...doc.data(), id: doc.id }
            })
            const allUsers = await Promise.all(users)
            posts = posts.map((post) => {
                return { ...post, user: allUsers?.find((user) => user?.uid === post?.uid) }
            })
            const data = { posts, lastDoc }
            // console.log(data)
            callback(data)
        },
        (err) => {
            throw new Error(err.message)
        }
    )
}
const getPost = async function (postId) {
    const docRef = doc(db, 'posts', postId)
    const docSnap = await getDoc(docRef)
    const user = await getUser(docSnap.data().uid)
    return { ...docSnap.data(), id: docSnap.id, user: user }
}
//search post with an array
const searchPostByArray = async function (array = [], callback) {
    // console.log(array)
    const q = query(collection(db, 'posts'), where('id', 'in', array))
    const querySnapshot = await getDocs(q)
    try {
        console.log(querySnapshot.size)
        if (querySnapshot.size < 1) return []
        const posts = querySnapshot.docs?.map((doc) => {
            return { id: doc.id, ...doc.data() }
        })

        callback(posts)
    } catch (err) {
        throw new Error(err.message)
    }
}
//search post by user id
const searchPost = async function (uid) {
    try {
        const q = query(collection(db, 'posts'), where('uid', '==', uid))
        const querySnapshot = await getDocs(q)
        if (querySnapshot.size < 1) return []
        const posts = querySnapshot.docs?.map((doc) => {
            return { id: doc.id, ...doc.data() }
        })
        return posts
    } catch (err) {
        throw new Error(err.message)
    }
}
const updatePostLike = async function (postId, likes) {
    const updatePostLiketRef = doc(db, 'posts', postId)
    await updateDoc(updatePostLiketRef, { likes: likes })
}

//comment
const getCommentCount = async function (postId, callback) {
    // console.log(postId)
    let q = query(collection(db, 'comments'), where('postId', '==', postId))
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

    const querySnapshot = await getDocs(q)
    const comments = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
    })
    return comments
}
const getComments = async function ({ postId, callback, parentId, lastDocComment, commentLimit }) {
    if (typeof callback !== 'function') return
    let q = query(
        collection(db, 'comments'),
        where('postId', '==', postId),
        where('parentId', '==', parentId),
        orderBy('createdAt'),
        startAfter(lastDocComment),
        limit(commentLimit)
    )
    if (commentLimit === 'all') {
        q = query(
            collection(db, 'comments'),
            where('postId', '==', postId),
            where('parentId', '==', parentId),
            orderBy('createdAt'),
            startAfter(lastDocComment)
        )
    }
    onSnapshot(
        q,
        async (querySnapshot) => {
            const data = []
            const getUserFunc = []
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
            querySnapshot.docs.forEach((doc) => {
                getUserFunc.push(getUser(doc.data().uid))
                data.push({ id: doc.id, ...doc.data() })
            })
            const users = await Promise.all(getUserFunc)
            const comments = data?.map((item) => {
                return { ...item, user: users?.find((user) => user?.uid === item?.uid) }
            })
            // console.log(comments)
            callback({ comments, lastDoc })
        },
        (err) => {
            throw new Error(err.message)
        }
    )
}
const updateCommentLikes = async (commentId, likes) => {
    const updateCommentRef = doc(db, 'comments', commentId)
    await updateDoc(updateCommentRef, { likes: likes })
}
const addComment = async function (comment) {
    try {
        // console.log(_comment)
        await addDoc(collection(db, 'comments'), comment)
    } catch (err) {
        throw new Error(err.message)
    }
}
const deleteComment = async function (commentId) {
    await deleteDoc(doc(db, 'comments', commentId))
}

// messages

const addChat = async function (currentUser, friendUid, msg) {
    const fromDoc = `users/${currentUser.uid}/chats`
    const toDoc = `users/${friendUid}/chats`
    const batch = writeBatch(db)
    try {
        await Promise.all([
            batch.set(doc(db, fromDoc, friendUid), {
                createdAt: new Date(),
                lastTime: new Date(),
                friendUid: friendUid,
                messages: [
                    {
                        id: uuidv4(),
                        createdAt: new Date(),
                        fromUid: currentUser.uid,
                        content: msg,
                        isRead: false,
                    },
                ],
            }), //save to current user
            batch.set(doc(db, toDoc, currentUser.uid), {
                createdAt: new Date(),
                lastTime: new Date(),
                friendUid: currentUser.uid,
                messages: [
                    {
                        id: uuidv4(),
                        createdAt: new Date(),
                        fromUid: currentUser.uid,
                        content: msg,
                        isRead: false,
                    },
                ],
            }), //save to friend chat
        ])
        await batch.commit()
    } catch (err) {
        throw new Error(err.message)
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
    await Promise.all([
        batch.update(fromDoc, {
            messages: fromMessages,
        }),
        batch.update(toDoc, {
            messages: toMessages,
        }),
    ])
    await batch.commit()

    // console.log(fromMessages, toMessages)
}
const addMessage = async function (currentUser, friendUid, newMessage) {
    // console.log('run')
    const fromDoc = doc(db, `users/${currentUser.uid}/chats`, friendUid)
    const toDoc = doc(db, `users/${friendUid}/chats`, currentUser.uid)
    const batch = writeBatch(db)

    try {
        // console.log(message)
        await Promise.all([
            batch.update(fromDoc, {
                lastTime: new Date(),
                messages: arrayUnion(newMessage),
            }),
            batch.update(toDoc, {
                lastTime: new Date(),
                messages: arrayUnion(newMessage),
            }),
        ])
        await batch.commit()
    } catch (err) {
        throw new Error(err.message)
    }
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
    updateUserLikes,
    updateFollowing,
    getSuggestFollowing,
    getFollowing,
    updateFollower,
    getPosts,
    getPost,
    searchPostByArray,
    updatePostLike,
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
}
