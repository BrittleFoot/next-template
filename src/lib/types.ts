export type Body = {
    body: Blob
}

export class ApiError extends Error {
    code: number
    data: any

    constructor(code: number, status: string, data?: any) {
        super(status)
        this.code = code
        this.data = data
    }

    toObject(): ApiErrorData {
        return {
            code: this.code,
            message: this.message,
            data: this.data,
        }
    }
}

export type Ok<T> = {
    error?: undefined
    data: T
}

export type Error<T> = {
    data?: undefined
    error: T
}

export type Result<TRes, TErr> = Ok<TRes> | Error<TErr>

export interface ApiErrorData {
    code: number
    message: string
    data?: any
}

export type ApiResponse<T> = Result<T, ApiErrorData>
