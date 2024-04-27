export interface IUser {
    id: number
    status: boolean
    firstName: string
    lastName?: string
    email: string
}

export interface AuthenticationStrategy {
    authenticate(username: string, password: string): boolean;
}