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
const responseData = await response.json();

if (responseData.status === "success"){
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
       Swal.fire({
         icon: "error",
         title: "Oops...",
         text: responseData.error,
       });




}








    // if (response.ok) {
    //   Swal.fire({
    //     title: "Successfully",
    //     text: "Your purchase was successful",
    //     icon: "success",
    //     showCancelButton: false,
    //     confirmButtonText: "OK",
    //   })
    //     .then((result) => {
    //       if (result.isConfirmed) {
    //         window.location.replace("/ticketId");
    //       }
    //     });
    // } else {
    //    Swal.fire({
    //      icon: "error",
    //      title: "Oops...",
    //      text: response.error,
    //    });
    // }
  });
});
