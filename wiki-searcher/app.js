const searchField = document.getElementById("search-field")
const resultsContainer = document.getElementById("search-results")

const wikiSearchResult = {}

function getSearchQuery(e) {
    const query = e.target.value
    sendSearch(query)
}

function sendSearch(search) {
    console.log("hello")
    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=${search}`)
    .then(data => data.json())
    .then((data) => {
        wikiSearchResult.currentSearch = data.query.search
        console.log(data.query.search)
        displaySearchResults(data.query.search)
        // window.location = `https://en.wikipedia.org/wiki/${search}`
    }).catch((error) => {
        console.log(error)
        })
}

function displaySearchResults(searchData) {
    searchData.map((result) => {
        //create header
        const titleText = document.createTextNode(result.title)
        const header = document.createElement("h2")
        
        //create description
        const descriptionText = document.createTextNode(result.snippet.replace(/<[^>]+>/g, ""))
        const paragraph = document.createElement("p")
        const container = document.createElement("div")

        header.appendChild(titleText)
        paragraph.appendChild(descriptionText)
        
        container.append(header, paragraph)
        container.className = "result-container"
        resultsContainer.append(container)
    })
}




searchField.addEventListener("change", getSearchQuery)