

const socket = io();

socket.on('homeProduct', home => {
    const homeContent = document.getElementById('productsContent');
    let content = "";
    home.forEach(product => {

        content += `<div class="col-3 card shadow center m-3">
                        <h3 class="text-center" style="color:red"> Product:${product.id}</h3>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"> title : ${product.title}</li> 
                            <li class="list-group-item"> description : ${product.description} </li> 
                            <li class="list-group-item"> code : ${product.code} </li>
                            <li class="list-group-item"> stock :  ${product.stock} </li>
                        </ul>
                    </div>`
        // title : ${product.title} //  description: ${product.description} // code:${product.code} --- id: ${product.id} <br/>
    });
    homeContent.innerHTML = content;
});
socket.on('products', data => {
    const finalContent = document.getElementById('productsContent');
    let content = "";
    data.forEach(product => {
        content += `<div class="col-6 card shadow m-3">
                        <h3 class="text-center" style="color:red"> Product:${product.id}</h3>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"> title : ${product.title}</li> 
                            <li class="list-group-item"> description : ${product.description} </li> 
                            <li class="list-group-item"> code : ${product.code} </li>
                            <li class="list-group-item"> stock :  ${product.stock} </li>
                        </ul>
                    </div>`
    });
    finalContent.innerHTML = content;
});


