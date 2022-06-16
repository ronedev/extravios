const devBack = process.env.NEXT_PUBLIC_ENV_BACK === 'dev'
const devFront = process.env.NEXT_PUBLIC_ENV_FRONT === 'dev'

export const server = devBack
    ? 'http://localhost:8080'
    : 'https://api.example.com'

export const client = devFront
    ? 'http://localhost:3000'
    : 'https://client.example.com'