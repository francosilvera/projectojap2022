let infoProductArray = []
var product = {};
let commentsProd = [];

function showImages(){

    let htmlContentToAppend = "";

    for(let i = 0; i < infoProductArray.images.length; i++){
        let productImages = infoProductArray.images[i];
        htmlContentToAppend += `
        <img src="` + productImages + `" alt="product image" class="img-thumbnail float-right img-fluid">
        `
        document.getElementById("productImages").innerHTML = htmlContentToAppend;
    }
}
function showEstrellas(cantEstrellas){
    let htmlContentToAppend = "";
    
    for(let i = 0; i < cantEstrellas; i++){
        htmlContentToAppend += ` <span class="fa fa-star checked"></span> `
    }
    for(let i = cantEstrellas; i < 5; i++){
        htmlContentToAppend += ` <span class="fa fa-star"></span>  `
    }
    return htmlContentToAppend;
}

function showComments(comentariosProductos){
    let htmlContentToAppend = "";
    
    for(let i = 0; i < comentariosProductos.length; i++){
        let comments = comentariosProductos[i];

        htmlContentToAppend += `
        <div class="card">
              <div class="card-header">
               `+ comments.user +' / '+ ` `+comments.dateTime+` ` +' / '+ showEstrellas(comments.score) +`
              </div>
              <div class="card-body">
                <div class="mb-0">
                  <p>`+ comments.description +`</p>
                </div>
              </div>
            </div>
        
        `

    document.getElementById("cajaComentarios").innerHTML = htmlContentToAppend;
    }
}
/* Desafiate*/
function saveComment() {
  
    let commentText = document.getElementById("descripcion-comentario").value;
    let scoreNumber = document.getElementById("puntaje").value;

    if (commentText === "" || isNaN(scoreNumber)) {
        alert("Debe llenar un comentario y puntaje");
    } else {
       
        let comentario = {
            description: commentText,
            dateTime: actualDate,
            score: scoreNumber,
            user: localStorage.getItem("correoForm")
        }
        
        commentsProd.push(comentario);
        
        showComment();
    }
}
function showComment() {
    let html = ""
    for (let i = commentsProd.length - 1; i >= 0; i--) {
        let comentario = commentsProd[i];
        html += ` 
        <div class= "card deck mt-4" >
         <div class="card-body">
                    <h5 class="card-title">  ${comentario.user}</h5>
                    <p class="card-text">${comentario.description}</p>
                    <p class="card-text"> ${showEstrellas(comentario.score)}</p>
                    <h6 class="card-subtitle mb-2 text-muted">${comentario.dateTime}</h6>
                    
             </div>      
        </div>`

    }

    document.getElementById("comentarios").innerHTML = html;
    document.getElementById("formulario").reset(); 
}
function showRelatedProducts(){
    let prodRelated = infoProductArray.relatedProducts;
    

    for(let i = 0; i < prodRelated.length; i++){

        let htmlContent = '';

        htmlContent += `
        <div
                <div class="card border " onclick="idProdcutInfo(${infoProductArray.relatedProducts[i].id})">
                    <img src="${prodRelated[i].image}" class="card-img" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${prodRelated[i].name}</h5>
                    </div>
                </div>
        </div>`
        
    document.getElementById("prodRelated").innerHTML += htmlContent;
    }
}
       
      
    


let idComentProd = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE

let idProdInfo=PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(idProdInfo).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            infoProductArray = resultObj.data;

            let productName  = document.getElementById("productName");
            let productDescription = document.getElementById("productDescription");
            let productCost = document.getElementById("productCost");
            let productCount = document.getElementById("productSoldCount");
            let productCategory = document.getElementById("productCategory");
        
            productName.innerHTML = infoProductArray.name;
            productDescription.innerHTML = infoProductArray.description;
            productCount.innerHTML = infoProductArray.soldCount;
            productCost.innerHTML = infoProductArray.currency +' '+ infoProductArray.cost;
            productCategory.innerHTML = infoProductArray.category;
            
            
           
           
            showImages(infoProductArray.images);
            showRelatedProducts(infoProductArray)
            
        }
    });
    getJSONData(idComentProd).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productComentarios = resultObj.data;
            showComments(productComentarios);
        }
    });
    document.addEventListener("DOMContentLoaded", function (e) {
        getJSONData(idComentProd).then(function (resultado) {
            if (resultado.status === "ok") {
                commentsProd = resultado.data;
                // muestra los comentarios
                showComment(commentsProd);
            }
    
        });
        ;
    
});
 });

/*Fecha y hora*/
let today = new Date(),
        day = today.getDate(),
        month = today.getMonth() + 1,
        year = today.getFullYear(),
        hour = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    let actualDate = (`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`);