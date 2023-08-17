const form = document.getElementById("loginForm")


// console.log(document.cookie);
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    const response = await fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        },
    });


    const responseData = await response.json();
    if (responseData.status === "success"){
        Swal.fire({
            title: 'Successfully logged in',
            text: 'You will be redirected to the product page',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace('/products');
            }
        });
    }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: responseData.error,
        })
    }
    
})

