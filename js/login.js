function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}
/* Codigo de login.html*/
function logeado(){

    let correoLog = document.getElementById('correoForm').value; 
    let passLog = document.getElementById('passForm').value;
// creamos las variables para correo y contraseña
    if (!correoLog){ 
    return showAlertError() 
        }
    if (!passLog){
        return showAlertError()
    } // y decimos si no hay datos en los campos solicitados, saldra una alerta
    else{
        window.location.href= "index.html" // Cuando los datos son correcto me redirige a la pestaña index.html
        localStorage.setItem('correoForm', correoLog) // setItem crea una key y lo guarda en localstorage
        localStorage.setItem('passForm', passLog)   // setItem crea una key y lo guarda en localstorage
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('botIng').addEventListener('click', function(){
        logeado()
        })
    })