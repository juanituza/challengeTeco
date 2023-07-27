export const insufficientStock = (product) => {
    return `One of the selected products does not have enough stock:

        * Required data: 
         The product ${product._id} /${product.title}   does not have enough stock || sctok: ${product.stock},
        
         `
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
export const noProductInTheCart = (product) => {
    return `Product not found:

        * Required data: 
        product is not in the cart ${product},
        
         `
};