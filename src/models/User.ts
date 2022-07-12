export interface User {
    uid: string
    full_name: string
    nickname: string
    avatar: string
    followers: number
    following: Array<string>
    likes: Array<string>
    isLive: boolean
    tick: boolean
}
