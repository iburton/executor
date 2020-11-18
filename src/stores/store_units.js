/**
 * @overview Store holding unit information
 * @author Ira Burton <ira.burton+gh@gmail.com>*
 */

import { writable, derived } from 'svelte/store'
import { Firestore } from '../config/firebase'

const FirebaseUnits = Firestore.collection('units')

const store = writable({})

const unitStoreStructured = derived(store, ($unitStore) => {
  const sourceUnits = Object.values($unitStore).sort((a, b) => a.name > b.name)
  const parents = sourceUnits.filter((unit) => unit.parent == null)
  const children = sourceUnits.filter((unit) => unit.parent != null)
  let structure = {}

  parents.forEach((unit) => {
    structure[unit.id] = unit
    structure[unit.id].children = []
  })

  children.forEach((unit) => {
    if (structure[unit.parent] != null) {
      const ch = structure[unit.parent].children
      ch.push(unit)
      ch.sort((a, b) => (a.name < b.name ? -1 : 1))
      structure[unit.parent].children = ch
    }
  })

  structure = Object.values(structure).sort((a, b) => (a.name < b.name ? -1 : 1))

  return structure
})

const setKey = (key, value) => store.update((m) => {
  const newm = m
  newm[key] = value
  return newm
})

const clearStore = () => store.set({})

const deleteKey = (key) => store.update((m) => {
  const newm = m
  delete newm[key]
  return newm
})

const unitStore = () => {
  const { subscribe } = store

  // This method will keep the local svelte store updated with current data from the Firestore DB
  const updater = () => {
    const unsubscribe = FirebaseUnits.where('active', '==', true)
      .onSnapshot(
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const newDoc = change.doc.data()
            newDoc.id = change.doc.id
            if (change.type === 'added') { setKey(newDoc.id, newDoc) }
            if (change.type === 'modified') { setKey(newDoc.id, newDoc) }
            if (change.type === 'removed') { deleteKey(newDoc.id) }
          })
        },
        // Handle the case where we are not logged in
        () => clearStore(),
      )
    return unsubscribe
  }

  const structured = unitStoreStructured

  const add = (unitInfo) => {
    const unit = unitInfo
    delete unit.id
    return FirebaseUnits.add(unit)
  }

  const update = (unitId, unitInfo) => {
    const unit = unitInfo
    delete unit.id
    return FirebaseUnits.doc(unitId).update(unit)
  }

  const remove = (unitId) => FirebaseUnits.doc(unitId).delete()

  const findOne = (unitId) => FirebaseUnits.doc(unitId).get()

  const findAll = (active = true, orderBy = 'name') => FirebaseUnits.where('active', '==', active).orderBy(orderBy)

  return Object.freeze({
    subscribe,
    add,
    update,
    remove,
    findOne,
    findAll,
    structured,
    updater,
  })
}

const UnitStore = unitStore()

export default UnitStore
