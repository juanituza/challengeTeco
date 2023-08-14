const addProduct = document.getElementsByClassName("ButtonProduct");

Array.from(addProduct).forEach((button) => {
  button.addEventListener("click", async (event) => {
    const productId = event.target.id;
    const data = { productId: productId };
    // fetch("api/carts/:pid"),
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   };
     
       const response = await fetch("api/carts/" + productId, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
       });

       if (response.ok) {
          Swal.fire({
            title: "Successfully",
            text: "The product was added to your cart",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        //   .then((result) => {
        //     if (result.isConfirmed) {
        //       window.location.replace("/cartsID");
        //     }
        //   });
       } else {
         console.error("Failed to add product to cart.");
       }
     
  });
});

// const addToCart = () => {};

// document.addEventListener("DOMContentLoaded", function () {
//   const addToCartButtons = document.querySelectorAll(".add-to-cart");

//   addProduct.forEach((button) => {
//     button.addEventListener("click", function () {
//       const productId = this.getAttribute("data-product-id");
//       addToCart(productId);
//     });
//   });

//   function addToCart(productId) {
//     fetch(`/api/carts/${productId}`, {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer YOUR_JWT_TOKEN", // Reemplaza con tu token JWT
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Manejar la respuesta del servidor si es necesario
//         console.log(data);
//       })
//       .catch((error) => {
//         // Manejar errores
//         console.error("Error:", error);
//       });
//   }
// });
