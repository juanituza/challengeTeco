const form = document.getElementById("registerForm")


form.addEventListener('submit',async (event)=>{
    event.preventDefault();
    const data = new FormData(form);

    const obj={};

    data.forEach((value,key)=>obj[key] = value);
    const response = await fetch('/api/sessions/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })

    const responseData = await response.json()
    if (responseData.status === "success") {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 5500
        })
        window.location.replace('/login');
    }
   
   
})