export type TDict<T = unknown> = Record<string, T>

export enum ELanguage {
    turoyo = 'turoyo',
    urmi = 'urmi',
    maalula = 'maalula'
}

export enum ETranslationLanguage {
    Swedish = 'Swedish',
    German = 'German'
}

export interface IDict {
    key: string
    title: string
    isChosen: boolean
    translationLanguage?: ETranslationLanguage
}
