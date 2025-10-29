export type TDict<T = unknown> = Record<string, T>

export interface IDict {
    key: string
    title: string
    isChosen: boolean
}
