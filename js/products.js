//array donde se cargarán los datos recibidos:
let productsArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let products = array[i];
        
        htmlContentToAppend += `
        <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="` + products.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${products.name} -  ${products.currency} ${products.cost}</h4>
                        <small class="text-muted">${products.soldCount} artículos</small>
                        
                        
                    </div>
                    <p class="mb-1">${products.description}</p>
                </div>
            </div>
        </div>
        `
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend; 
    }
}


/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en productsArray.
-Por último, se llama a showproductsList() pasándole por parámetro productsArray.

*/

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(AUTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            showProductsList(productsArray);
        }
    });
});