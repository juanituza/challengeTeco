const roleForm = document.getElementById("rolForm");

roleForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const roleSelect = document.getElementById("roleSelect");
  const selectedRole = roleSelect.value;
    console.log(selectedRole);
  const response = await fetch("/api/users/role", {
    method: "PUT",
    body: JSON.stringify({ role: selectedRole }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  const responseData = await response.json();
  console.log(responseData);
  if (responseData.status === "success") {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change my role!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Changed!", "Your role was successfully changed!", "success")
        .then(() => {
            window.location.replace("/");
          });
      }
    });
    // Swal.fire({
    //   title: "Successfully logged in",
    //   text: "You will be redirected to the product page",
    //   icon: "success",
    //   showCancelButton: false,
    //   confirmButtonText: "OK",
    // })
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     window.location.replace("/");
    //   }
    // });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: responseData.error,
    });
  }
});
