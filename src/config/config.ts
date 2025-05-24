import { error } from "console"
import { AnyARecord } from "dns"
import { readFileSync } from "fs"
import { Timestamp } from "rxjs"
import { parse } from "yaml"

export type AppConfig = {
    env_path: string
    http_server: {
        port: number
        timeout: number
    }
}


export function InitConfig (isLocal: boolean): any{
    let yamlContent: string
    switch (isLocal) {
        case true:
            yamlContent = readFileSync("config/local.yaml", "utf8")
            return parse(yamlContent)
        case false:
            yamlContent = readFileSync("config/prod.yaml", "utf8")
            return parse(yamlContent)
        default:
            return new Error("argument not passed")
    }
}