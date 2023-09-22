// const form = document.getElementById("createProduct");
// console.log(form);
// form.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   const data = new FormData(form);
//   console.log(data);
//   const obj = {};
//   data.forEach((value, key) => (obj[key] = value));
//   console.log(obj);
  
//   const response = await fetch("/api/products/createProducts", {
//     method: "POST",
//     body: data,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const responseData = await response.json();
//   if (responseData.status === "success") {
//     Swal.fire({
//       title: "Successful registration",
//       text: "You will be redirected to the login",
//       icon: "success",
//       showCancelButton: false,
//       confirmButtonText: "OK",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         window.location.replace("/products");
//       }
//     });
//   } else {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: responseData.error,
//     });
//   }
// });


const form = document.getElementById("createProduct");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = new FormData(form);


    const response = await fetch("/api/products/createProducts", {
      method: "POST",
      body: data,
    });

    const responseData = await response.json();
          if (responseData.status === "success") {
        Swal.fire({
          title: "Successful creation",
          text: "You will be redirected to shop",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace("/products");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: responseData.error,
        });
      }
    });
