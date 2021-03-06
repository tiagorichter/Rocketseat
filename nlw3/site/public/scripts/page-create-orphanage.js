const map = L.map('mapid').setView([-26.1100481,-49.8046244], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

/* Criar icone */
const icon = L.icon({
    iconUrl: ".//images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

//create and add marker
let marker;

map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    
    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;
    // remove icon
    marker && map.removeLayer(marker)

    //add icon layer
    marker = L.marker([lat, lng], {icon}).addTo(map)
})

//photo addiction
function addPhotoField() {
    //pegar o container de fotos #images
    const container = document.querySelector('#images')
    
    //pegar o container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload')
    
    // realizar o clone da última imagem adicionada.
    const newFieldContainer = fieldsContainer[fieldsContainer.length-1].cloneNode(true)
    
    //verificar se o campo está vazio, se sim, não adicionar ao container de imagens
    const input = newFieldContainer.children[0]

    if(input.value == ""){
        return              //sai da função
    }
    
    //limpar o campo antes de adicionar ao container de imagens
    input.value = ""
    
    // adicionar o clone ao container de #images  
    container.appendChild(newFieldContainer)
}

function deleteField(event){
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length <= 1){
        //limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    //deletar o campo
    span.parentNode.remove();
}

// Selecionar sim ou não
function toggleSelect(event) {
    //retirar a classe active dos botões
    document.querySelectorAll('.button-select button')
    .forEach(function(button){   //forEach(button => button.classList.remove('active'))
        button.classList.remove('active')
    })

    //colocar a classe active no botão clicado
    const button = event.currentTarget
    button.classList.add('active')    

    //atualizar input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends]')
    
    //verificar se sim ou não
    input.value = button.dataset.value
}
