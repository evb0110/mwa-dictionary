import { mapValues } from 'es-toolkit'

const ASSETS_FOLDER = 'https://evb0110.github.io/static/'

class Asset {
    public link: string
    public size?: string
    public filename?: string

    constructor({
        filename,
        size,
    }: { filename: string
        size?: string }) {
        this.link = ASSETS_FOLDER + filename
        if (size) {
            this.size = size
            this.filename = filename
        }
    }

    static instantiate(obj: { filename: string
        size?: string }) {
        return new Asset(obj)
    }
}

export enum AssetName {
    turoyoVerbGlossaryHtml = 'turoyoVerbGlossaryHtml',
    urmiAbbreviationsPdf = 'urmiAbbreviationsPdf',
    urmiSymbolsPdf = 'urmiSymbolsPdf',
    maalulaCorpusJson = 'maalulaCorpusJson',
    turoyoCorpusJson = 'turoyoCorpusJson',
    turoyoNewCorpusJson = 'turoyoNewCorpusJson',
    turoyoDictsJson = 'turoyoDictsJson',
    maalulaDictsJson = 'maalulaDictsJson',
    urmiCorpusJson = 'urmiCorpusJson',
    urmiDictJson = 'urmiDictJson',
    maalulaPerfects = 'maalulaPerfects',
    maalulaVerbalRoots = 'maalulaVerbalRoots',
    calJson = 'calJson',
    syrJson = 'syrJson',
    pntJson = 'pntJson',
    potJson = 'potJson'
}

const assetsRaw = {
    [AssetName.turoyoVerbGlossaryHtml]: {
        filename: 'Turoyo_all_2024.html',
        size: '14.8Mb',
    },
    [AssetName.urmiAbbreviationsPdf]: { filename: 'urmi_abbreviations.pdf' },
    [AssetName.urmiSymbolsPdf]: { filename: 'urmi_table_of_symbols.pdf' },
    [AssetName.maalulaCorpusJson]: { filename: 'maalulaCorpus.json' },
    [AssetName.turoyoCorpusJson]: { filename: 'turoyoCorpus.json' },
    [AssetName.turoyoNewCorpusJson]: { filename: 'turoyoNewCorpus.json' },
    [AssetName.turoyoDictsJson]: { filename: 'turoyoDicts.json' },
    [AssetName.maalulaDictsJson]: { filename: 'maalulaDicts.json' },
    [AssetName.urmiCorpusJson]: { filename: 'urmiCorpus.json' },
    [AssetName.urmiDictJson]: { filename: 'urmiDict.json' },
    [AssetName.maalulaPerfects]: { filename: 'maalulaPerfects.json' },
    [AssetName.maalulaVerbalRoots]: { filename: 'maalulaVerbalRoots.json' },
    [AssetName.calJson]: { filename: 'cal.json' },
    [AssetName.syrJson]: { filename: 'syr.json' },
    [AssetName.pntJson]: { filename: 'pnt-wvoc.json' },
    [AssetName.potJson]: { filename: 'pot-wvoc.json' },
} as const

export const assets = mapValues(assetsRaw, value => Asset.instantiate(value))
