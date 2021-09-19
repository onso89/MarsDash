
let store = Immutable.Map({
    roverImages: '',
    apod: ''
})

// TODO render fn having a comp passed to app fn 
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    const newStore = store.merge(store, newState)
    // console.log(newStore.get('apod').get('image').toObject())
    return newStore
}

// const render = async (root, updateState) => {
//     root.innerHTML = App(updateState)
// }

const getImageOfTheDay = (state) => {
    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
}

const getRovers = (state) => {
    fetch(`http://localhost:3000/curiosity`)
        .then(res => res.json())
        .then(roverImages => updateStore(store, { roverImages }))
        .then(newStore => console.log(newStore.get('roverImages')))
}

getImageOfTheDay(store)
getRovers(store)

// listening for load event because page should load before any JS is called
// window.addEventListener('load', () => {
//     render(root, store)
// })

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.

// Example of a pure function that renders infomation requested from the backend

// ------------------------------------------------------  API CALLS



