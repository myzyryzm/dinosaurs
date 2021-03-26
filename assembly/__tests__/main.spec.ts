/** @format */

import { storage, Context, u128 } from 'near-sdk-as'
import {
    createDinosaur,
    getDinosaursForOwner,
    getDinosaurById,
    getAllDinosaurs,
    deleteDinosaur,
} from '../main'
import { MAX_DINOS } from '../constants'

describe('Get Dinosaurs', () => {
    it('Should return an array of 1 dinosaur', () => {
        const dino = createDinosaur('reptar')
        expect(getDinosaursForOwner(dino.owner).length).toBe(
            1,
            'Should return an array of the dinosaur created above.'
        )
    })

    it('Should return a single dinosaur', () => {
        const dino = createDinosaur('reptar')
        expect(getDinosaurById(dino.id).id).toBe(
            dino.id,
            'Should return the same dinosaur that was created'
        )
    })

    it('Should return all the dinosaurs', () => {
        createDinosaur('reptar')
        createDinosaur('dr. zhivago')
        expect(getAllDinosaurs().length).toBe(
            2,
            'Should return the same dinosaur that was created'
        )
    })

    it('Should return up to ' + MAX_DINOS.toString() + ' dinosaurs', () => {
        for (let i = 0; i < MAX_DINOS + 2; i++) {
            createDinosaur(i.toString())
        }
        expect(getAllDinosaurs().length).toBe(
            MAX_DINOS,
            'Should return the same dinosaur that was created'
        )
    })
})

describe('Delete dinosaur', () => {
    it('Should return no dinosaurs after deleting the dinosaur', () => {
        const dino = createDinosaur('reptar')
        expect(getAllDinosaurs().length).toBe(
            1,
            'Should return the same dinosaur that was created'
        )
        deleteDinosaur(dino.id)
        expect(getAllDinosaurs().length).toBe(
            0,
            'Should return no dinosaurs after deletion'
        )
    })
})
