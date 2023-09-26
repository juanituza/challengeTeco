document.addEventListener("DOMContentLoaded", function () {
  const deleteUser = document.getElementsByClassName("deleteUser");
  Array.from(deleteUser).forEach((button) => {
    button.addEventListener("click", async (event) => {
      console.log("Button clicked!");
      const userId = event.target.id;
      console.log(userId);

      const data = { userId: userId };
      console.log(data);

      const response = await fetch("/api/users/" + userId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.status === "success") {
        Swal.fire({
          title: "Successfully removed user",
          text: "The user was successfully deleted",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace("/admin");
          }
        });
      } else {
        console.error("Failed removed user.");
      }
    });
  });
});
