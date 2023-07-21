export const productsErrorIncompleteData = (product) => {
    return `One or more mandatory data was not entered

        * Required data: 
         -title : expected a string and received ${product.title},
         -description : expected a string and received ${product.description},
         -price : expected an integer and received ${product.price},
         -code: expected a string and received ${product.code},
         -status: expected a boolean and received ${product.status},
         -stock: expected an integer and received ${product.stock}
         ` 
};
export const productsErrorDuplicateCode = (product) => {
    return `The value of the code field is repeated in the database

        * Required data:      
        -code: Duplicate product code ${product.code}`
        
};
export const productsIdNotFound = (pid) => {
    return `The searched product was not found with the sent id

        * Required data:      
        -id ${pid} not found ,`
        
};