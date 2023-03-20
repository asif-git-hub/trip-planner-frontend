export function getEnvVar(paramName: string): string {
    const value = process.env[paramName]
    if (value) {
        return value
    } else {
        throw new Error(`Environment variable ${paramName} not found`)
    }
}