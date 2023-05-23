

const socket = io();

socket.on('homeProduct', home => {
    const homeContent = document.getElementById('productsContent');
    let content = "";
    home.forEach(product => {

        content += `<div class="col-6 card  shadow center m-3" style="max-width: 20rem">
                        <h3 class="text-center" style="color:blue"> Product:${product.id}</h3>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"> title : ${product.title}</li> 
                            <li class="list-group-item"> description : ${product.description} </li> 
                            <li class="list-group-item"> code : ${product.code} </li>
                            <li class="list-group-item"> stock :  ${product.stock} </li>
                        </ul>
                        
                    </div>
                    <button class="col-6  mx-3 mb-5  center btn btn-danger" type="submit" style="max-width: 20rem" id="${product.id}">Eliminar producto</button>`
        // title : ${product.title} //  description: ${product.description} // code:${product.code} --- id: ${product.id} <br/>
    });
    homeContent.innerHTML = content;
});
socket.on('->', data => {
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


