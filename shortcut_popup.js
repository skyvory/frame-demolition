
function listenForClicks() {
  document.addEventListener("click", (e) => {

    
    function selectedSite(clickedButton) {
      return "dewey";
      switch (clickedButton) {
        case "Dewey":
          return "dewey";
      }
    }

 
    function launchShortcut(tabs) {
        let target_site = selectedSite(e.target.textContent);

        if(target_site === "dewey") {
          browser.tabs.create({
            url: "http://dewey.petra.ac.id/catalog/ft.php"
          });
        }

        window.close();
        
        // browser.tabs.sendMessage(tabs[0].id, {
        //   command: "dewey"
        // });
    }

    function cancel(tabs) {
      window.close();
      
        // browser.tabs.sendMessage(tabs[0].id, {
        //   command: "reset",
        // });
    }



    if (e.target.classList.contains("site")) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(launchShortcut);
    }
    else if (e.target.classList.contains("cancel")) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(cancel)
    }
  });
}


// browser.tabs.executeScript({ file: "execute_shortcut.js" })
//   .then(listenForClicks);
listenForClicks();