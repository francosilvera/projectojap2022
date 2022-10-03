document.addEventListener("DOMContentLoaded", ()=>{
    let email = localStorage.getItem("correoForm") // solicitamos los datos a localstorage.
    if (email == null){ 
        alert ("No se ha ingresado en el sistema, por favor ingrese sus datos");
        location.href ="login.html"; // preguntamos si no hay nadie ingresado, lo redirigimos a la pestaña login para que ingrese los datoos
    } else{
        document.getElementById("correoForm").innerHTML = email;
    }
})

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
  
  
   
});