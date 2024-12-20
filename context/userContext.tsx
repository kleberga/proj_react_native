import { createContext, ReactElement, useReducer, useState } from 'react'

interface User {
    email: string,
    token: string,
    status: boolean,
    message: string
}

export enum UserActionType{
    LOGIN, LOGOUT, ERROR
}

interface UserReducerAction{
    type: UserActionType,
    user: User
}

export const UserContext = createContext<User | null>(null)

export const UserDispatchContext = createContext<any>(null)

export default function UserProvider({children} : {children: ReactElement}){

    const [user, dispatch] = useReducer(UserReducer, initialUser)

    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

function UserReducer(user: User, {type, user: userAuth} : UserReducerAction){
    switch(type){
        case UserActionType.LOGIN:
            return {
                ...userAuth,
                status: true, 
                message: 'Autenticado com sucesso.'
            }
        case UserActionType.LOGOUT:
            return {
                ...userAuth,
                token: '', 
                status: false, 
                message: ''
            }
        case UserActionType.ERROR:
            return {
                ...userAuth,
                token: '', 
                status: false, 
                message: 'Erro ao efetuar login.'
            }
        default: {
            throw new Error('Erro desconhecido ao efetuar login')
        }
    }
}

const initialUser = {
    email: '',
    token: '',
    status: false,
    message: ''
}