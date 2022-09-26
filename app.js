const cards = document.getElementById("card-dinamicas");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded',()=>{
    fetchAPI()
})

const loadingAPI = estado => {
    const loading = document.querySelector('#spinner');
    if(estado){
        loading.classList.remove('hidden')
    } else {
        loading.classList.add('hidden')
    }
}

const fetchAPI = async () => {
    // console.log('Esperando datos de API')
    try {
        loadingAPI(true);
        const res = await fetch('https://rickandmortyapi.com/api/character');
        const data = await res.json();
        mostrarCard(data);
    } catch (error) {
        console.log(error);
    } finally {
        loadingAPI(false);
    }
};

const mostrarCard = data => {
    data.results.forEach(item => {
        // console.log(item);
        const clone = templateCard.cloneNode(true);
        clone.getElementById("card-title").textContent = item.name;
        clone.getElementById("card-p").textContent = item.species;
        clone.getElementById("img").setAttribute("src", item.image)
        fragment.appendChild(clone);
                
    })

    cards.appendChild(fragment);
}

