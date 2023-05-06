

const socket = io();

socket.on('homeProduct', home => {
    const homeContent = document.getElementById('productsContent');
    let content = "";
    home.forEach(product => {
        content += `title : ${product.title} //  description: ${product.description} // code:${product.code} --- id: ${product.id} <br/>`
    });
    homeContent.innerHTML = content;
});
socket.on('products', data => {
    const finalContent = document.getElementById('productsContent');
    let content = "";
    data.forEach(product => {
        content += `${product.title} --- ${product.description} --- ${product.code} --- ${product.id} <br/>`
    });
    finalContent.innerHTML = content;
});


