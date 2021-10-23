import {Dispatch} from "redux";
import {profileApi, usersApi} from "../api/api";

const initialState: initialStateTypeofProfile = {
    posts: [
        {message: 'Hi, how are you?', like: 5},
        {message: 'It\'s my first post', like: 2}
    ],
    profile: null,
    status: ''
}
export type initialStateTypeofProfile = {
    posts: Array<postType>
    profile: profileType | null
    status: string
}
export type profileType = {
    userId: number
    aboutMe: string,
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    photos: {
        small: string | null
        large: null | string
    }
}
type contactsType = {
    facebook: null | string
    website: null | string,
    vk: null | string
    twitter: null | string
    instagram: null | string
    youtube: null | string
    github: null | string
    mainLink: null | string
}
export type postType = {
    message: string
    like: number
}
type actionsTypes = ReturnType<typeof AddPost> | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>

export const AddPost = (newPost: string) => {
    return {
        type: 'ADD-POST',
        newPost,
    } as const
}

export const setUserProfile = (profile: profileType) => {
    return {
        type: 'SET-USER-PROFILE',
        profile
    } as const
}
export const getUserProfile = (userId: string) => (dispatch: Dispatch) => {
    usersApi.getProfile(userId).then(data => {
        dispatch(setUserProfile(data))
    })
}

export const setStatus = (status: string) => {
    return {
        type: 'SET-USER-STATUS',
        status
    } as const
}
export const getUserStatus = (userId: string) => (dispatch: Dispatch) => {
    profileApi.getStatus(userId).then(response=>{
        dispatch(setStatus(response.data))
    })
}
export const updateUserStatus = (status: string) => (dispatch: Dispatch) => {
    profileApi.updateStatus(status).then(response=>{
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}


const ProfileReducer = (state: initialStateTypeofProfile = initialState, action: actionsTypes): initialStateTypeofProfile => {
    switch (action.type) {
        case "ADD-POST":
            const NewPost = {
                message: action.newPost,
                like: 0
            }
            return {
                ...state,
                posts: [NewPost, ...state.posts],
            }
        case "SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "SET-USER-STATUS":
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }

}
export default ProfileReducer