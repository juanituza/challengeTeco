const addProduct = document.getElementsByClassName("ButtonProduct");

Array.from(addProduct).forEach((button) => {
  button.addEventListener("click", async (event) => {
    const productId = event.target.id;
    const data = { productId: productId };
    const response = await fetch("api/carts/" + productId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (responseData.status === "success") {
      Swal.fire({
        title: "Successfully",
        text: "The product was added to your cart",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: responseData.error,
      });
    }
  });
});
