/** @format */

import { context, base64, math } from 'near-sdk-as'
import {
    Dinosaur,
    DinosaurList,
    dinosaurs,
    dinosaursByOwner,
    displayDinosaurs,
} from './models'
import { ID_DIGITS, MAX_DINOS } from './constants'

/*******************/
/* CHANGE METHODS */
/*****************/

/**
 * Creates a dinosaur with a specified name and assigns its owner as the account id of the transaction sender.
 * @param name
 */
export function createDinosaur(name: string): Dinosaur {
    const id = base64.encode(math.randomBuffer(ID_DIGITS))
    const dino = new Dinosaur(id, name)
    addDinosaur(id, dino, context.sender, true)
    return dino
}

/**
 * Deletes a dinosaur with a specified id.
 * @param id
 */
export function deleteDinosaur(id: string): void {
    const dino = getDinosaurById(id)
    assert(
        dino.owner == context.sender,
        'This dinosaur does not belong to ' + context.sender
    )
    removeDinosaurFromOwner(dino.owner, id)
    deleteGlobalDinosaur(id)
    dinosaurs.delete(base64.decode(id))
}

/**
 * Transfers a dinosaur with specified id from the sender to a newOwner.
 * @param newOwner
 * @param id
 */
export function transferDinosaur(newOwner: string, id: string): void {
    const dino = getDinosaurById(id)
    assert(
        dino.owner == context.sender,
        'This dinosaur does not belong to ' + context.sender
    )
    removeDinosaurFromOwner(dino.owner, id)
    dino.owner = newOwner
    addDinosaur(id, dino, newOwner, false)
}

/*****************/
/* VIEW METHODS */
/****************/

/**
 * Gets the list of dinosaurs for a specified account.
 * @param owner
 * @returns
 */
export function getDinosaursForOwner(owner: string): Dinosaur[] {
    const ownerDinosaurs = getDinosaurIdsForOwner(owner)
    let dinoList = new Array<Dinosaur>()
    for (let i = 0; i < ownerDinosaurs.length; i++) {
        const id = base64.decode(ownerDinosaurs[i])
        if (dinosaurs.contains(id)) {
            dinoList.push(dinosaurs.getSome(id))
        }
    }
    return dinoList
}

/**
 * Gets a dinosaur by a specified id.
 * @param id
 * @returns
 */
export function getDinosaurById(id: string): Dinosaur {
    const dna = base64.decode(id)
    return dinosaurs.getSome(dna)
}

/**
 * Gets all dinosaurs up to a limit of MAX_DINOS
 * @returns
 */
export function getAllDinosaurs(): Dinosaur[] {
    const globalDinos = getGlobalDinosaurs().reverse()
    const numberOfDinos = min(MAX_DINOS, globalDinos.length)
    const result = new Array<Dinosaur>(numberOfDinos)
    for (let i = 0; i < numberOfDinos; i++) {
        if (dinosaurs.contains(base64.decode(globalDinos[i]))) {
            result[i] = getDinosaurById(globalDinos[i])
        }
    }
    return result
}

/*************/
/* Internal */
/************/

/**
 * Gets all the dinosaur ids for a specified owner
 * @param owner
 * @returns
 */
function getDinosaurIdsForOwner(owner: string): Array<string> {
    const dinosaurIdList = dinosaursByOwner.get(owner)
    return !dinosaurIdList ? new Array<string>() : dinosaurIdList.id
}

/**
 * Removes a dinosaur from an owner
 * @param owner
 * @param id
 */
function removeDinosaurFromOwner(owner: string, id: string): void {
    const dinoIds = getDinosaurIdsForOwner(owner)
    for (let i = 0; i < dinoIds.length; i++) {
        if (id == dinoIds[i]) {
            dinoIds.splice(i, 1)
            break
        }
    }
    dinosaursByOwner.set(owner, new DinosaurList(dinoIds))
}

/**
 * Adds a dinosaur to the dinosaurs list; adds the dinosaur id to display dinosaurs list and then adds the dinosaur the Adds a dinosaur id to the specified owner's DinosaurList (i.e. list of dinosaur ids)
 * @param owner
 * @param id
 */
function addDinosaur(
    id: string,
    dino: Dinosaur,
    owner: string,
    addToGlobal: boolean
): void {
    dinosaurs.set(base64.decode(id), dino)
    if (addToGlobal) {
        setGlobalDinosaurs(dino.id)
    }
    const dinoIds = getDinosaurIdsForOwner(owner)
    dinoIds.push(id)
    dinosaursByOwner.set(owner, new DinosaurList(dinoIds))
}

/**
 * Gets all the ids of the dinosaurs.
 * @returns
 */
function getGlobalDinosaurs(): Array<string> {
    let dinosaurList = displayDinosaurs.get('all')
    if (!dinosaurList) {
        return new Array<string>()
    }
    return dinosaurList.id
}

/**
 * Updates the global dinosaurs.
 * @param id
 */
function setGlobalDinosaurs(id: string): void {
    const globalDinos = getGlobalDinosaurs()
    globalDinos.push(id)
    const dinos = new DinosaurList(globalDinos)
    displayDinosaurs.set('all', dinos)
}

/**
 * Deletes a dinosaur from the display dinosaurs list with a given id.
 * @param id
 */
function deleteGlobalDinosaur(id: string): void {
    const globalIds = getGlobalDinosaurs()
    for (let i = 0; i < globalIds.length; i++) {
        if (id == globalIds[i]) {
            globalIds.splice(i, 1)
            break
        }
    }
    displayDinosaurs.set('all', new DinosaurList(globalIds))
}
