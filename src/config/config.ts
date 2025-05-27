export function InitDotenvConfig(): string {
    const argv: string[] = process.argv

    if (argv.includes("--watch")){
        return ".env.local"
    }else{
        return ".env.prod"
    }
}