console.log('hola');

const socket = io();

socket.on('products' , data =>{
    const finalContent = document.getElementById('productsContent');
    let content ="";
    data.forEach(product => {
        content += `${product.title} --- ${product.description} --- ${product.code} --- ${product.id} <br/>`
    });
    finalContent.innerHTML = content;
});


