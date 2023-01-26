(function () {

    function DisplayButton() {
        let randomButton = document.getElementById("RandomButton")
        randomButton.addEventListener("click", function() {
            location.href = '/webd6201-w23/webd6201-in-class-demo/projects.html'
        })

        let mainContent = document.getElementsByTagName("main")[0]
        
        // another way to access body
        // documentBody = document.body

        let mainParagraph = document.createElement("p")
        mainParagraph.setAttribute("id", "MainParagraph")
        mainParagraph.setAttribute("class", "mt-3")

        // concatenation - '1' + '2' + '3'
        // interpolation - `${var_1}`
        let firstString = "This is a main paragraph that we added through javascript"
        // let secondString = `${ firstString } main paragraph that we added through javascript`
        mainParagraph.textContent = firstString

        /**
         * textContent - changes text node
         * innerHTML - overwrites anything in the innerHTML of that element
         */

        // add after(append)
        mainContent.appendChild(mainParagraph) 
    }
    
    function Start() {
        console.log("App Started!")

        switch (document.title) {
            case "Home - WEBD6201 Demo":
                DisplayButton()
                break
            case "Projects - WEBD6201 Demo":
                DisplayButton()
                break
        }
    }

    window.addEventListener("load", Start)
})()