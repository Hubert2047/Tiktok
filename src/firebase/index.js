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
    serverTimestamp,
    startAfter,
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
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

const googleProvider = new GoogleAuthProvider()

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
// doc(database,collection,keyvalue) database =getFireStore(app)
const getUser = async function (uid) {
    const q = query(collection(db, 'users'), where('uid', '==', uid))

    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length < 1) {
        return undefined
    }
    return { ...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id }
}

const addUser = async function (user) {
    await addDoc(doc(db, 'users'), user)
}

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
    const q = query(collection(db, 'users'), where('uid', 'in', followingArray))
    const querySnapshot = await getDocs(q)
    const followingData = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
    })
    return followingData
}

const getPosts = async function (lastPost = 0) {
    const q = query(collection(db, 'posts'), orderBy('createdAt'), startAfter(lastPost), limit(5))
    const users = [] //store all getUser Promise
    try {
        const querySnapshot = await getDocs(q)
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
        if (querySnapshot.size < 1) return []
        let posts = querySnapshot.docs.map((doc) => {
            users.push(getUser(doc.data().uid))
            return { ...doc.data(), id: doc.id }
        })
        const allUsers = await Promise.all(users)
        posts = posts.map((post) => {
            return { ...post, user: allUsers.find((user) => user.uid === post.uid) }
        })
        return { posts, lastDoc }
    } catch (err) {
        console.error(err.message)
    }
}
const getPost = async function (postId) {
    const docRef = doc(db, 'posts', postId)
    const docSnap = await getDoc(docRef)
    const user = await getUser(docSnap.data().uid)
    return { ...docSnap.data(), id: docSnap.id, user: user }
}
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
const getComments = async function (postId, callback, parentId = 'null') {
    try {
        const q = query(
            collection(db, 'comments'),
            where('postId', '==', postId),
            where('parentId', '==', parentId),
            limit(2)
        )
        onSnapshot(q, async (querySnapshot) => {
            const data = []
            const getUserFunc = []
            querySnapshot.docs.forEach((doc) => {
                getUserFunc.push(getUser(doc.data().uid))
                data.push({ id: doc.id, ...doc.data() })
            })
            const users = await Promise.all(getUserFunc)
            const comments = data?.map((item) => {
                return { ...item, user: users.find((user) => user.uid === item.uid) }
            })
            callback(comments)
        })
    } catch (err) {
        throw new Error(err.message)
    }
}
const addComment = async function (comment) {
    try {
        const _comment = { ...comment, createdAt: serverTimestamp() }
        console.log(_comment)
        await addDoc(collection(db, 'comments'), _comment)
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
    addUser,
    getSuggestFollowing,
    getFollowing,
    getPosts,
    getPost,
    searchPost,
    getComments,
    addComment,
    deleteComment,
}
