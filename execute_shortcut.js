(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;


  browser.runtime.onMessage.addListener((message) => {
    
    if (message.command === "dewey") {
      console.log("Open Dewey");
    } else if (message.command === "cancel") {
    }
  });

})();