$(document).ready(function () {
  // Desvincula los eventos de clic previamente vinculados (para evitar duplicación)
  $(".btn-minus").off("click");
  $(".btn-plus").off("click");
  $(".btn-accept").off("click");

  // Manejar el botón "Menos"
  $(".btn-minus").on("click", function () {
    var quantityInput = $(this).closest(".input-group").find(".form-control");
    var currentQuantity = parseInt(quantityInput.val());
    if (currentQuantity > 0) {
      currentQuantity--;
      quantityInput.val(currentQuantity);
    }
  });

  // Manejar el botón "Más"
  $(".btn-plus").on("click", function () {
    var quantityInput = $(this).closest(".input-group").find(".form-control");
    var currentQuantity = parseInt(quantityInput.val());
    currentQuantity++;
    quantityInput.val(currentQuantity);
  });

  // Manejar el botón "Guardar"
  $(".btn-accept").on("click", function () {
    var cid = $(this).data("cid");
    var pid = $(this).data("pid");
    var quantityInput = $(this).closest(".input-group").find(".form-control");
    var quantity = parseInt(quantityInput.val());

    $.ajax({
      type: "PUT",
      url: "/api/carts/" + cid + "/products/" + pid,
      data: JSON.stringify({ quantity: quantity }),
      contentType: "application/json",
      success: function (response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "The product quantity has been changed",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: function (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oops... Could not modify, try later",
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  });
});
