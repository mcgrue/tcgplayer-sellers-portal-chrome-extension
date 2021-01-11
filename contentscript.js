function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}


if( document.location.href.startsWith("https://store.tcgplayer.com/admin/product/manage") ) {
;(function() {
  function script() {
    // your main code here
    console.log('Grues tcgplayer extension injected into card page');
    setTimeout( () => {
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      //// PUT CARD PAGE STUFF HERE
      
      document.body.style.backgroundColor = 'pink';
      $('input[value="Match"]').remove();

      var newSearch = $("<input name=SearchValue></input>");
      var form = $("<form method=get action=https://store.tcgplayer.com/admin/product/catalog><input type=hidden name=CategoryId value=1 <!--MTG Category-->></form>");
      form.append(newSearch);

      $($("#rightSide > div > div:nth-child(5)")[0]).append(form);

      $('span').each(function(){
          var span = $(this);
          if ($(span).data().bind === "formatCurrency: lowestPrice") {
              console.log('got one');

              var price = parseFloat(span.context.innerText);
              var shipping = 0.0;

              if( span[0].parentElement.children.length === 3 && $(span[0].parentElement.children[2]).data().bind === "formatCurrency: lowestShipping" ) {
                shipping = parseFloat($(span[0].parentElement.children[2]).html());
              }

              var lowest = price + shipping - 0.01;
              lowest = lowest.toFixed(2);

              var newButton = $("<button value=''>" + lowest + "</button>");

              if( lowest < 1.5 ) {
                newButton.css('color', 'red');
              }
 
              var priceInputElement = $($(span[0].parentElement.parentElement.parentElement.parentElement.children[4]).find("input"))[0];
              var quantityInputElement = $($(span[0].parentElement.parentElement.parentElement.parentElement.children[5]).find("input"))[0];

              newButton.click(
                () => {
                  ko.contextFor(priceInputElement).$data.newPrice(lowest);

                  if( !quantityInputElement.value || quantityInputElement.value === "0" ) {
                    quantityInputElement.focus();
                    $(quantityInputElement).on('keypress', (e)=>{
                      if(e.which == 13) {
                          if(parseInt(quantityInputElement.value) > 0) {
                            ko.contextFor($('input[value="Save"]')[0]).$data.saveProducts();
                          }
                      }
                    });
                  } else {
                    ko.contextFor($('input[value="Save"]')[0]).$data.saveProducts();  
                  }
                }
              );

              $(span[0].parentElement).append(newButton);
          }
      });

      /// END CARD PAGE STUFF
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////

    }, 100 );
  }

  function inject(fn) {
    const script = document.createElement('script')
    script.text = `(${fn.toString()})();`
    document.documentElement.appendChild(script)
  }

  inject(script);
})();

  console.log("Grue's tcgplayer extension loaded for Card Page");
}





if( document.location.href.startsWith('https://store.tcgplayer.com/admin/product/catalog') ) {

;(function() {
  function script() {
    // your main code here
    console.log('Grues tcgplayer extension injected into catalog page');
    setTimeout( () => {
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      //// PUT CATALOG PAGE STUFF HERE
      document.body.style.backgroundColor = 'pink';
      
      var oldName = localStorage.getItem('product-catalog-oldSearch');
      var getSearchMode = findGetParameter("SearchValue");
      if(oldName && !getSearchMode) {
        ko.contextFor(document.getElementById("SearchValue")).$root.ProductName(oldName);
      } 
      ko.contextFor(document.getElementById("CategoryId")).$root.ProductLine(1);
      ko.contextFor(document.getElementById("SearchValue")).$root.doSearch();
      

      document.getElementById("SearchValue").addEventListener('input', function(evt) {
          localStorage.setItem('product-catalog-oldSearch', this.value);
      })

      document.body.style.backgroundColor = 'orange';

      /// END CATALOG PAGE STUFF
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////

    }, 100 );
  }

  function inject(fn) {
    const script = document.createElement('script')
    script.text = `(${fn.toString()})();`
    document.documentElement.appendChild(script)
  }

  inject(script);
  console.log("done 1");
})();

  console.log("Grue's tcgplayer extension loaded for Catalog Page");
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'hello!') {
      console.log(request.url) // new url is now in content scripts!
    }
});



// THIS PAGE IS IN VUE.
//
// if( document.location.href === 'https://store.tcgplayer.com/admin/orders/orderlist' ) {
// ;(function() {
//   function script() {
//     // your main code here
//     console.log('Grues tcgplayer extension injected into orderlist page');
//     setTimeout( () => {
//       /////////////////////////////////////////////////
//       /////////////////////////////////////////////////
//       /////////////////////////////////////////////////
//       //// PUT ORDERLIST PAGE STUFF HERE
      
//       document.body.style.backgroundColor = 'red';

//       var uselessCheckbox = $("#rightSide > div > div:nth-child(4) > div > span > div > div.widget-content > div > div.table-wrapper > table > thead > tr > th.checkbox-cell > label > span.check");
//       uselessCheckbox.parent();
//       var newButton = $("<button>x</button>");

//       newButton.click( () => {
//         $('tr').each(function(){
//             var tr = $($(this).context);

//             /// that ugly green
//             if( tr.css('background-color') === "rgb(210, 233, 212)" ) {
//               var check = $($(tr).find(":checkbox")[0]);
//               check.prop( "checked", true );
//               check.prop( "value", "true" );
//               tr.addClass('is-checked');
//             }
//         } ) 
//       } );

//       uselessCheckbox.parent().append(newButton);
//       uselessCheckbox.remove();

//       document.body.style.backgroundColor = 'green';

//       /// END ORDERLIST PAGE STUFF
//       /////////////////////////////////////////////////
//       /////////////////////////////////////////////////
//       /////////////////////////////////////////////////

//     }, 100 );
//   }

//   function inject(fn) {
//     const script = document.createElement('script')
//     script.text = `(${fn.toString()})();`
//     document.documentElement.appendChild(script)
//   }

//   inject(script);
// })();

//   console.log("Grue's tcgplayer extension loaded for Orderlist Page");
// }



