import { env } from 'process'

import { ApiError, ApiResponse } from '../types'

async function readBody(response: Response) {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json()
    }

    const contentLength = response.headers.get('content-length')
    if (contentLength && parseInt(contentLength) === 0) {
        return {}
    }

    return response.blob().then((data) => {
        return { body: data }
    })
}

function joinUrl(base: string | undefined, url: string) {
    if (!base) {
        console.error('No BACKEND_URL provided')
        return url
    }
    return base + url
}

interface AuthRequirements {
    noAuth?: boolean
    token?: string
}

async function getAuthorization(options: AuthRequirements): Promise<HeadersInit> {
    const shouldAuth = options.noAuth !== true
    if (!shouldAuth) {
        return {}
    }

    if (options.token) {
        return {
            Authorization: `Bearer ${options.token}`,
        }
    }

    return {}
}

/*
 * Fetch data from the backend
 * Requires AuthRequirements to config how to authenticate (no auth or provide token)
 * Uses get cookies from the request if nothing is provided
 */
export async function api<T>(
    url: string,
    options?: RequestInit & AuthRequirements,
): Promise<ApiResponse<T>> {
    var requestUrl = joinUrl(env.BACKEND_URL, url)
    let authorization = await getAuthorization(options ?? {})
    options = {
        ...options,
        headers: {
            ...authorization,
            ...options?.headers,
        },
    }

    let response: Response
    try {
        response = await fetch(requestUrl, options)
    } catch (error) {
        return {
            error: {
                code: 500,
                message: 'Network error',
                data: new Object(error).toString(),
            },
        }
    }

    if (!response.ok) {
        const error = {
            code: response.status,
            message: response.statusText,
        } as ApiError

        if (response.status < 500) {
            const body = await readBody(response)
            error.data = body
        }
        return { error }
    }

    const body = await readBody(response)
    return { data: body as T }
}

/**
 * Fetch data from the backend
 * Assumes the body is JSON
 * Uses get cookies from the request if nothing is provided
 */
export async function jsonApi<T>(
    method: 'PUT' | 'POST',
    url: string,
    body: any,
    options?: RequestInit & AuthRequirements,
): Promise<ApiResponse<T>> {
    return api<T>(url, {
        ...options,
        method: method,
        headers: {
            ...options?.headers,
            'Content-Type': 'application/json',
        },
        body: body && JSON.stringify(body),
    })
}
