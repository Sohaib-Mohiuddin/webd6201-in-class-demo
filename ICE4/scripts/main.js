(function () {

    function DisplayHome() {
        let randomButton = document.getElementById("RandomButton")
        randomButton.addEventListener("click", function() {
            location.href = 'projects.html'
        })

        let mainContent = document.getElementsByTagName("main")[0]
        mainContent.setAttribute("class", "container")
        
        // another way to access body
        documentBody = document.body

        let mainParagraph = document.createElement("p")
        mainParagraph.setAttribute("id", "MainParagraph")
        mainParagraph.setAttribute("class", "mt-3 container")

        // concatenation - '1' + '2' + '3'
        // interpolation - `${var_1}`
        let firstString = "This is a "
        let secondString = `${ firstString } main paragraph that we added through javascript and this is also on GitHub Pages`
        mainParagraph.textContent = secondString

        /**
         * textContent - changes text node
         * innerHTML - overwrites anything in the innerHTML of that element
         */

        // add after(append)
        mainContent.appendChild(mainParagraph) 
    }

    function DisplayProjects() {
        console.log("Projects Page")
    }

    function DisplayContacts() {
        console.log("Contact Us Page")

        let submitButton = document.getElementById("submitButton")
        let subscribeCheckbox = document.getElementById("subscribeCheckbox")

        submitButton.addEventListener("click", function(event) {
            event.preventDefault()
            if (subscribeCheckbox.checked) {
                console.log("The user has subscribed");
            }
        })
    }

    function DisplayContactList() {
        console.log("Contact List Page")
    }

    function DisplayReferences() {
        console.log("References Page")
    }
    
    function Start() {
        console.log("App Started Successfully!")

        switch (document.title) {
            case "Home - WEBD6201 Demo":
                DisplayHome()
                break
            case "Projects - WEBD6201 Demo":
                DisplayProjects()
                break
            case "Contact Us - WEBD6201 Demo":
                DisplayContacts()
                break
            case "Contact List - WEBD6201 Demo":
                DisplayContactList()
                break
            case "References - WEBD6201 Demo":
                DisplayReferences()
                break
        }
    }

    window.addEventListener("load", Start)
})()