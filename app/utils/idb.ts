import { openDB } from 'idb'

function isIndexedDBAvailable(): boolean {
    return typeof window !== 'undefined' && 'indexedDB' in window
}

class IDBInstance {
    private upgradeQueuePromise: Promise<void> = Promise.resolve()

    constructor(public readonly dbName: string) {}

    private async getVersion() {
        if (!isIndexedDBAvailable()) {
            return 1
        }

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName)
            request.onsuccess = () => {
                const db = request.result
                const version = db.version
                db.close()
                resolve(version)
            }
            request.onerror = () => reject(request.error)
        }).catch(() => 1) as Promise<number>
    }

    private async _openDBRaw(storeName: string) {
        if (!isIndexedDBAvailable()) {
            throw new Error('IndexedDB is not available')
        }

        let db: Awaited<ReturnType<typeof openDB>> = await openDB(this.dbName)
        if (db.objectStoreNames.contains(storeName)) {
            db.close()
            db = await openDB(this.dbName)
            return db
        }

        db.close()

        const currentVersion = await this.getVersion()
        const newVersion = currentVersion + 1

        return openDB(this.dbName, newVersion, {
            upgrade(upgradeDb) {
                if (!upgradeDb.objectStoreNames.contains(storeName)) {
                    upgradeDb.createObjectStore(storeName)
                }
            },
        })
    }

    private async _openDB(storeName: string) {
        if (!isIndexedDBAvailable()) {
            throw new Error('IndexedDB is not available')
        }

        this.upgradeQueuePromise = this.upgradeQueuePromise.then(() => this._openDBRaw(storeName)).then(() => {})
        await this.upgradeQueuePromise
        return openDB(this.dbName)
    }

    public async set(storeName: string, key: string, value: unknown) {
        if (!isIndexedDBAvailable()) {
            return
        }

        const db = await this._openDB(storeName)
        const tx = db.transaction(storeName, 'readwrite')
        await tx.store.put(value, key)
        await tx.done
    }

    public async get(storeName: string, key: string) {
        if (!isIndexedDBAvailable()) {
            return undefined
        }

        const db = await this._openDB(storeName)
        const tx = db.transaction(storeName, 'readonly')
        const result = await tx.store.get(key)
        await tx.done
        return result
    }
}

const IDBMap = new Map<string, IDBInstance>()

function getDB(dbName: string): IDBInstance {
    if (!IDBMap.has(dbName)) {
        IDBMap.set(dbName, new IDBInstance(dbName))
    }
    return IDBMap.get(dbName)!
}

export async function idbGet(dbName: string, storeName: string, key: string) {
    if (!isIndexedDBAvailable()) {
        return undefined
    }

    try {
        return getDB(dbName).get(storeName, key)
    } catch (error) {
        console.error(`[IDB] Error getting from ${dbName}/${storeName}/${key}:`, error)
        return undefined
    }
}

export async function idbSet(dbName: string, storeName: string, key: string, value: unknown) {
    if (!isIndexedDBAvailable()) {
        return
    }

    try {
        await getDB(dbName).set(storeName, key, value)
    } catch (error) {
        console.error(`[IDB] Error setting to ${dbName}/${storeName}/${key}:`, error)
    }
}
