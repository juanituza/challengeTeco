export const insufficientStock = (product) => {
    return `One of the selected products does not have enough stock:

        * Required data: 
         The product ${product._id} /${product.title}   does not have enough stock || sctok: ${product.stock},
        
         `
};