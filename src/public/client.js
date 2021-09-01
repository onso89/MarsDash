
let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

let ex =  Immutable.Map({
    roverImages: ''
})

// let store = Immutable.Map({
//     user: { name: "Student" },
//     apod: '',
//     rovers: ['Curiosity', 'Opportunity', 'Spirit'],
// })

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

const Header = () =>{
    return `    
    <header class="header" role="banner">
        <a class="brand" href="#">MarsDash</a>
        <nav class="navbar">
        <ul class="nav-links">
            <li><a class="nav-link" href="#">about</a></li>
            <li><a class="nav-link" href="#">contact</a></li>
        </ul>
        </nav>
    </header>`
}
// create content
const App = (state) => {
    let { rovers, apod } = state

    return `
        ${Header()}
        <main>
            ${Greeting(store.user.name)}
            <section>
                <p>
                    Select one of the rovers to see photos from Mars
                </p>
                <div class="rovers-row">
                    <div class="rover-card">
                    </div>
                    <div class="rover-card">
                    <div class="rover-card">
                </div>
                ${ImageOfTheDay(apod)}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)

    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    // return data
}

