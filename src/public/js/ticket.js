const ticket = document.getElementsByClassName("purchase");

Array.from(ticket).forEach((button) => {
  button.addEventListener("click", async () => {
    
    const response = await fetch("/api/tickets/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });

    if (response.ok) {
      Swal.fire({
        title: "Successfully",
        text: "Your purchase was successful",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
        .then((result) => {
          if (result.isConfirmed) {
            window.location.replace("/ticketId");
          }
        });
    } else {
      console.error("Failed to add product to cart.");
    }
  });
});
