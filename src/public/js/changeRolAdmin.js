// Obtener todos los botones de cambio de rol
const changeRolButtons = document.querySelectorAll(".changeRol");

// Agregar manejadores de eventos a cada botón
changeRolButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    // Obtener el ID de usuario desde el atributo data
    const userId = event.target.dataset.userId;

    // Encontrar el select para el rol dentro del formulario del usuario
    const row = event.target.closest("tr");
    const roleSelect = row.querySelector(".roleSelect");

    // Obtener el rol seleccionado del elemento select
    const selectedRole = roleSelect.value;

    // Crear un objeto con el ID de usuario y el nuevo rol
    const data = { userId: userId, role: selectedRole };

    // Enviar una solicitud PUT para actualizar el rol del usuario
    try {
      const response = await fetch("/api/users/" + data.userId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
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
            Swal.fire(
              "Changed!",
              "Your role was successfully changed!",
              "success"
            ).then(() => {
              window.location.replace("/admin");
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: responseData.error,
        });
      }
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
    }
  });
});

