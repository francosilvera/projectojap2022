let articlesCart =[];
let precio = 0;

document.addEventListener("DOMContentLoaded", function() {
    fetch(CART_INFO_URL + 25801 + EXT_TYPE)
    .then(resp => resp.json())
    .then(data =>{
      
      articlesCart = data;
      showArticles(articlesCart);
      
    })
  })

  

  function subtotal() {
    let currency = articlesCart.articles[0].currency
    let cantidadArtic = document.getElementById("cantArticulo").value
   

    document.getElementById("subtotal").innerHTML =  currency + " " + precio * cantidadArtic
} 
      


  function showArticles() {
    precio = articlesCart.articles[0].unitCost

    let htmlContentToAppend = `
          <tr>
            <th >
                <img class="img-thumbnail" width=90px src="${articlesCart.articles[0].image}"/>
            </th>
            <td>${articlesCart.articles[0].name}</td>
            <td>${articlesCart.articles[0].currency} ${precio}</td>
            <td>
                <div class="col-4">
                <input class="text-center" type="number" id="cantArticulo" value="1" min="1" max="10" onchange="subtotal()">
                </div>
           </td>
            <td id="subtotal">${articlesCart.articles[0].currency} ${precio}</td>
          </tr>
    `
document.getElementById("tableCart").innerHTML = htmlContentToAppend;
}