


export const insufficientStock = (product) => {
    return `One of the selected products does not have enough stock:

        * Required data: 
         The product ${product._id} /${product.title} ${product.description} does not have enough stock || sctok: ${product.stock},
        
         `;
         
};
export const emptyCart = (cart) => {
    return `Empty product cart:

        * Required data: 
         add products to ${cart},
        
         `
};
export const cartNotFound = (cid) => {
    return `Cart not found:

        * Required data: 
        cart not found with id ${cid},
        
         `
};
export const notProductAdd = (prod) => {
    return `Cart not found:

        * Required data: 
        you cannot add a product that belongs to your store${prod},
        
         `;
};
export const noProductInTheCart = (product) => {
    return `Product not found:

        * Required data: 
        product is not in the cart ${product},
        
         `
};
export const non_existent_product = (product) => {
    return `product id not found::

        * Required data: 
        product id not found,
        
         `;
};