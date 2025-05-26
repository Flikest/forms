import { 
    config, 
    DotenvConfigOutput 
} from "dotenv"

export function InitDotenvConfig(): string {
    const argv: string[] = process.argv

    if (!argv.includes("--watch")){
        return ".env.prod"
    }else{
        return ".env.local"
    }
}