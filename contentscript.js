
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

if( document.location.href === 'https://store.tcgplayer.com/admin/product/catalog' ) {

;(function() {
  function script() {
    // your main code here
    console.log('Grues tcgplayer extension injected into catalog page');
    setTimeout( () => {
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      //// PUT CATALOG PAGE STUFF HERE
      
      var oldName = localStorage.getItem('product-catalog-oldSearch');

      if(oldName) {
        ko.contextFor(document.getElementById("SearchValue")).$root.ProductName(oldName);
      } 
      ko.contextFor(document.getElementById("CategoryId")).$root.ProductLine(1);
      ko.contextFor(document.getElementById("SearchValue")).$root.doSearch();
      

      document.getElementById("SearchValue").addEventListener('input', function(evt) {
          localStorage.setItem('product-catalog-oldSearch', this.value);
      })

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

if( document.location.href === 'https://store.tcgplayer.com/admin/orders/orderlist' ) {
  document.body.style.backgroundColor = 'orange';
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'hello!') {
      console.log(request.url) // new url is now in content scripts!
    }
});