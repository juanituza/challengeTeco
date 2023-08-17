

const form2 = document.getElementById("github");
console.log(form2);


form2.addEventListener("submit", async (event) => {
  event.preventDefault();
  //   const data = new FormData(form2);
  //   console.log(data);
  //   const obj = {};
  //   data.forEach((value, key) => (obj[key] = value));

  const response = await fetch("/api/sessions/github", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  const responseData = await response.json();
  if (responseData.status === "success") {
    Swal.fire({
      title: "Successfully logged in",
      text: "You will be redirected to the product page",
      icon: "success",
      showCancelButton: false,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.replace("/products");
      }
    });
  }
});
