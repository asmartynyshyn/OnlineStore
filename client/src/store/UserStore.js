import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._userId = 0
        this._user = {}
        this._role = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setRole(role) {
        this._role = role
    }
    setUserId(userId) {
        this._userId = userId
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get role() {
        return this._role
    }
    get userId() {
        return this._userId
    }
}
