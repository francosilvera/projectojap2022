const ORDER_ASC_BY_COST  = "De menor a mayor";
const ORDER_DESC_BY_COST = "De mayor a menor";
const ORDER_BY_REL  = "Relevancia";
let currentSortCriterio  = undefined;
let minCost              = undefined;
let maxCost              = undefined;
let stringBusqueda = undefined;

function idProdcutInfo (id){
localStorage.setItem("prodID",id)
window.location= "product-info.html"
}

//array donde se cargarán los datos recibidos de la URL:
let productsArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let products = array[i];
        /*let nombreProductos = products.name.toLowerCase();
        let descripcionProductos = products.description.toLowerCase();
        (stringBusqueda == undefined) || ((nombreProductos.includes(stringBusqueda)) || (descripcionProductos.includes(stringBusqueda)))*/
        htmlContentToAppend += ` 
       
        <div onclick="idProdcutInfo(${products.id})"  class="list-group-item list-group-item-action cursor-active">
        
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="` + products.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <h4 class="card-title"><b>`+ products.name +`</b></h4>                  
                    <p><b>`+ products.currency + ` ` + products.cost + `</b></p>
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

function ordenarMayorProducts(productsArray){
    productsArray.sort( (a,b)=>{
        if (a.cost > b.cost){
         return 1;
        }
        if (a.cost < b.cost){
         return -1;
        }
        return 0;
     });
     showProductsList(ordenarMayorProducts)
   }
    
     
     function ordenarMenorProducts(productsArray){
        productsArray.products.sort((a,b) =>{
            if (a.cost > b.cost){
                return -1
            }  if (a.cost < b.cost){
                return 1
            } 
                return 0;
            
        });
        showProductsList(ordenarMenorProducts)
         }

        
function sortAndShowProducts(sortCriterio, productsArray){
    currentSortCriterio = sortCriterio;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriterio, currentProductsArray);

    //Muestro los productos ordenados según el criterio elegido
    showProductsList();
}
function filtroPrecio(array){
    let desde = parseInt (document.getElementById("filtroA").value);
    let hasta = parseInt (document.getElementById("filtroB").value);
    
    let filtroLista = array.filter(products => products.cost >= desde && products.cost <= hasta)
    showProductsList (filtroLista)
}


/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en productsArray.
-Por último, se llama a showproductsList() pasándole por parámetro productsArray.

*/
let id = localStorage.getItem("catID");

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL + id + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            showProductsList(productsArray);
        }
    });
});
document.getElementById("asc").addEventListener("click", function(){
    showProductsList(productsArray);
});

document.getElementById("indiceDesc").addEventListener("click", function(){
    showProductsList(productsArray);
});

document.getElementById("indiceRel").addEventListener("click", function(){
    sortAndShowProducts(ORDER_BY_REL);
});
    document.getElementById('filtroProd').addEventListener('click', ()=>{
        filtroPrecio(productsArray);
    });
    document.getElementById("filtroLimpio").addEventListener("click", function(){
        document.getElementById("filtroA").value = "";
        document.getElementById("filtroB").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList(productsArray);
    });
       /*document.getElementById("búsqueda-productos").addEventListener("keydown", function(e) {
            console.log(document.getElementById("búsqueda-productos").value);
            stringBusqueda = document.getElementById("búsqueda-productos").value.toLowerCase();
            showProductsList(productsArray);
        });*/
