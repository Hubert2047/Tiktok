import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import {
    addDoc,
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
    startAfter,
    updateDoc,
    where,
} from 'firebase/firestore'

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
const getUser = async function (uid) {
    const q = query(collection(db, 'users'), where('uid', '==', uid))

    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length < 1) {
        return undefined
    }
    return { ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id }
}
const getUserRealyTime = async function (uid, callback) {
    onSnapshot(doc(db, 'users', uid), (doc) => {
        const user = { ...doc.data(), id: doc.id }
        callback(user)
    })
}
const addUser = async function (user) {
    await addDoc(doc(db, 'users'), user)
}
const updateFollowing = async function (uid, updateFollowing) {
    const updateUserFollowingtRef = doc(db, 'users', uid)
    await updateDoc(updateUserFollowingtRef, { following: updateFollowing })
}
const updateUserLikes = async function (uid, updateLike) {
    const updateUserLiketRef = doc(db, 'users', uid)
    await updateDoc(updateUserLiketRef, { likes: updateLike })
}

//sidebar
const getSuggestFollowing = async function (currentUserId = '', type) {
    let q
    switch (type) {
        case 'less':
            q = query(collection(db, 'users'), where('uid', '!=', currentUserId), limit(5))
            break
        case 'more':
            q = query(collection(db, 'users'), where('uid', '!=', currentUserId), limit(10))
            break
        default:
            return
    }

    const querySnapshot = await getDocs(q)
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

//post
const getPosts = function (callback, lastPost = 0) {
    if (typeof callback !== 'function') return
    const q = query(collection(db, 'posts'), orderBy('played'), startAfter(lastPost), limit(5))
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
    console.log(array)
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
export {
    db,
    loginWithGoogle,
    logOut,
    getUser,
    getUserRealyTime,
    addUser,
    updateUserLikes,
    updateFollowing,
    getSuggestFollowing,
    getFollowing,
    getPosts,
    getPost,
    searchPostByArray,
    updatePostLike,
    searchPost,
    getComments,
    addComment,
    deleteComment,
    getCommentCount,
    updateCommentLikes,
}
