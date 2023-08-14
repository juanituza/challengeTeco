const deleteProduct = document.getElementsByClassName("deleteProd");

Array.from(deleteProduct).forEach((button) => {
  button.addEventListener("click", async (event) => {
    const productId = event.target.id.toString();
    console.log(productId);
    const data = { productId: productId };
    

    const response = await fetch("/api/carts/products/" + productId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.status === "success") {
      Swal.fire({
        title: "Successfully removed product",
        text: "The product will be removed from your cart",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("/cartsID");
        }
      });
    } else {
      console.error("Failed to add product to cart.");
    }
  });
});
