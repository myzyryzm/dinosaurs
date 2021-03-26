/** @format */

import { context, PersistentMap } from 'near-sdk-as'

@nearBindgen
export class DinosaurList {
    constructor(public id: Array<string>) {}
}

@nearBindgen
export class Dinosaur {
    owner: string
    constructor(public id: string, public name: string) {
        this.owner = context.sender
    }
}

export const dinosaurs = new PersistentMap<Uint8Array, Dinosaur>('dinosaurs')

// key => ownerId; value => list of ids of dinosaurs
export const dinosaursByOwner = new PersistentMap<string, DinosaurList>(
    'dinosaursByOwner'
)

export const displayDinosaurs = new PersistentMap<string, DinosaurList>('show')
