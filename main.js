const openCart = () => {
    document.querySelector('body').classList.toggle('active')
}

const produtos = [
    {
        nome: 'Prato 1', 
        preco: 800,
        url: 'img/1.png'
    },
    {
        nome: 'Prato 2', 
        preco: 900,
        url: 'img/2.png'
    },
    {
        nome: 'Prato 3', 
        preco: 750,
        url: 'img/3.png'
    }
]

const disporProdutos = (produtos) =>{
    produtos.forEach((element, index) =>{
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
            <h2> ${element.nome}</h2>
            <img src="${element.url}" alt="">
            <p>${element.preco}</p>
            <button type='button' data-action='adicionar-${index}'>Adicionar no carrinho</button>
        `
        document.querySelector('.produtos').appendChild(newDiv)
    })
} 

disporProdutos(produtos)

let itemsCarrinho = []

const quantidades = [
    {
        numero: 0
    },
    {
        numero: 0
    },
    {
        numero: 0
    }
]

const adicionarCarrinho = (index) =>{
    const itemNovo = produtos[index].nome
    quantidades[index].numero += 1 
    let quantidadePrato = quantidades[index].numero 
        if(!itemsCarrinho.includes(itemNovo) || itemsCarrinho == 1){
            const newCart = document.createElement('tr')
            newCart.classList.add(`item-${index}`)
            newCart.innerHTML = `
            <td class="imgTable"><img src="${produtos[index].url}" alt=""></td>
            <td>${produtos[index].nome}</td>
            <td class="precoTable">${produtos[index].preco}</td>
            <td class="quantidade-${index}">${quantidades[index].numero}</td>
            <td class="btnDeletar"><img src="img/icon/delete.png" alt="" onclick="deletar(${index})"></td>
        `
         document.querySelector('.produtosCarrinho>table>tbody').appendChild(newCart)
        } else if(itemsCarrinho.includes(itemNovo)){
            document.querySelector(`.quantidade-${index}`).innerHTML = `${quantidadePrato}`
        }
 
    document.getElementById('carrinho').classList.add('active')
    const cartItem = document.querySelectorAll(".precoTable")
    let cartPreco = []
    cartItem.forEach((precoCart)=>{
        Number(`${produtos[index].preco}`)
        cartPreco.push(produtos[index].preco)
    })
    itemsCarrinho.push(itemNovo)
    calculaTotal(index)
    document.querySelector('body').classList.add('active')
}

const calculaTotal = (index) =>{
    //const arrayPreco = Object.values(cartPreco)
    let soma = 0;
    for(let i = 0; i < itemsCarrinho.length; i++){
        soma += produtos[index].preco
    }
    document.getElementById('total').innerHTML = `Total: ${soma}`
}

const deletar = (index) =>{
    let tabela = document.querySelector('.produtosCarrinho>table>tbody')
    quantidades[index].numero -= 1 
    const itemEliminar = document.querySelector(`.item-${index}`)
    document.querySelector(`.quantidade-${index}`).innerHTML = `${quantidades[index].numero}`
    let eliminaCarrinho = itemsCarrinho.indexOf(produtos[index].nome) 
    itemsCarrinho.splice(index, 1)  
    if(quantidades[index].numero <= 0){
        itemEliminar.parentElement.removeChild(itemEliminar)
    } 
    calculaTotal(index)

    if(itemsCarrinho.length == 0){
        document.querySelector('body').classList.remove('active')
    }
}

const identicaBotao = () =>{
    if(event.target.type == 'button'){
        const [action, index] = event.target.dataset.action.split('-')
        adicionarCarrinho(index)
    }
}

document.querySelector('#btnConfirmar').onclick = () =>{
    alert('Infelizmente, não estamos fazendo entregas (o gás acabou ;-;)')
}

document.querySelector('.saco')
    .addEventListener('click', openCart)

document.querySelector('.produtos')
    .addEventListener('click', identicaBotao)

