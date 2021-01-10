
if( document.location.href === 'https://store.tcgplayer.com/admin/product/catalog' ) {

  var $ko = null;

;(function() {
  function script() {
    // your main code here
    console.log('Grues tcgplayer extension injected into catalog page');
    setTimeout( () => {
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

  console.log("Grue's tcgplayer extension loaded");
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