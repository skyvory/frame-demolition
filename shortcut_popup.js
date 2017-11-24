
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
    }

    function cancel(tabs) {
      window.close();
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

listenForClicks();