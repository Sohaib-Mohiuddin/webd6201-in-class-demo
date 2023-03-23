(function () {

    /**
     * This function uses AJAX to open a connection to the server and returns 
     * a data payload to the callback function
     *
     * @param {string} method
     * @param {string} url
     * @param {Function} callback
     */
    function AjaxRequest(method: string, url: string, callback: Function) {
        // AJAX
        // instantiate the XHR Object
        let XHR = new XMLHttpRequest()

        // add event listener for readystatechange
        XHR.addEventListener("readystatechange", () => {
            if (XHR.readyState === 4 && XHR.status === 200) {
                if (typeof callback === 'function') {
                    callback(XHR.responseText)
                } else {
                    console.error("ERROR: callback is not a function")
                }
            }
        })

        // connect and get data
        XHR.open(method, url)

        // send request to server to await response
        XHR.send()
    }

    /**
     * Load the static header 
     *
     * @param {HTML} html_data
     */
    function LoadHeader(): Function {
        $.get('./Views/components/header.html', function(html_data) {
            $('#navigationBar').html(html_data)

            document.title = router.ActiveLink.substring(0, 2).toUpperCase() + router.ActiveLink.substring(2)
            $(`li>a:contains(${ document.title })`).addClass('active')

            CheckLogin()
        })
        
        return new Function()
    }

    /**
     * This function loads content
     * @returs {void}
     */
    function LoadContent(): Function {
        let pageName = router.ActiveLink
        console.log(pageName);
        $.get(`./Views/content/${ pageName }.html`, function(html_data) {
            $('main').html(html_data)

            ActiveLinkCallBack()
        })

        return new Function()
    }

    /**
     * This function loads footer
     * @returns {void}
     */
    function LoadFooter(): Function {
        $.get('./Views/components/footer.html', function(html_data) {
            $('footer').html(html_data)
        })

        return new Function()
    }

    function DisplayHome(): Function {
        $("#RandomButton").on("click", function() {
            location.href = '/contact'
        })

        // concatenation - '1' + '2' + '3'
        // interpolation - `${var_1}`
        let firstString = "This is a "
        let secondString = `${ firstString } main paragraph that we added through javascript and this is also on GitHub Pages`

        $("main").addClass("container").append(`<p id="MainParagraph" class="mt-3 container">${ secondString }</p>`)

        return new Function()
    }

    function DisplayProjects(): Function {
        console.log("Projects Page")

        return new Function()
    }

    function AddContact(fullName: string, contactNumber: string, emailAddress: string) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress)
        if (contact.serialize()) {
            let key = contact.Name.substring(0, 1) + Date.now()
            localStorage.setItem(key, contact.serialize() as string)
        }
    }

    function ValidateInput(inputFieldID: string, regularExpression: RegExp, exception: string) {
        let messageArea = $('#messageArea').hide()

        $('#' + inputFieldID).on("blur", function() {
            let inputText = $(this).val() as string

            if (!regularExpression.test(inputText)) {
                // failure to match full name with regex

                $(this).trigger("focus").trigger("select")

                messageArea.addClass("alert alert-danger").text(exception).show()
            } else {
                // success in matching full name with regex

                messageArea.removeAttr("class").hide()
            }
        })
    }

    function ContactFormValidate(): void {
        let emailAddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-][\D]{2,10}$/g
        let fullNamePattern = /^([A-Z][a-z]{1,25})((\s|,|-)([A-Z][a-z]{1,25}))*(\s|-|,)*([A-Z][a-z]{1,25})*$/g

        ValidateInput("fullName", fullNamePattern, "Please enter a valid Full name which means a capitalized first name and capitalized last name")
        ValidateInput("emailAddress", emailAddressPattern, "Please enter a valid Email Address")
    }

    function DisplayContacts(): Function {
        console.log("Contact Us Page")

        ContactFormValidate()

        let submitButton = document.getElementById("submitButton") as HTMLElement
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement

        submitButton.addEventListener("click", function() {
            if (subscribeCheckbox.checked) {
                let fullName = document.forms[0].fullName.value
                let contactNumber = document.forms[0].contactNumber.value
                let emailAddress = document.forms[0].emailAddress.value

                // If user subscribes, store the contact in localStorage
                let contact = new core.Contact(fullName, contactNumber, emailAddress)

                if (contact.serialize()) {
                    let key = contact.Name.substring(0,1) + Date.now()
                    localStorage.setItem(key, contact.serialize() as string)
                }
            }
        })

        return new Function()
    }

    function DisplayContactList(): Function {
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList") as HTMLElement // Our contact list in the table of the contact-list page

            let data = "" // Add data to this variable. Append deserialized data from localStorage to data
            let keys = Object.keys(localStorage) // Return a String Array of keys

            let index = 1 // Count number of keys

            // for every key in the keys collection
            for (const key of keys) {
                let contactData = localStorage.getItem(key) as string // Get localStorage data value related to the key
                let contact = new core.Contact("", "", "")
                
                contact.deserialize(contactData)

                // Inject repeatable row into the contactList
                data += `<tr>
                    <th scope="row" class="text-center">${ index }</th>
                    <td class="text-center">${ contact.Name }</td>
                    <td class="text-center">${ contact.ContactNumber }</td>
                    <td class="text-center">${ contact.EmailAddress }</td>
                    <td class="text-center"><button value="${ key }" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>&nbsp; Edit</button></td>
                    <td class="text-center"><button value="${ key }" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i>&nbsp; Delete</button></td>
                </tr>
                `
                
                index++
            }

            contactList.innerHTML = data

            $("button.delete").on("click", function() {
                if (confirm("Are you sure you want to delete this?"))
                    localStorage.removeItem($(this).val() as string)

                location.href = '/contact-list'
            })

            $("button.edit").on("click", function() {
                location.href = '/edit#' + $(this).val()
            })
        }

        $("#addButton").on("click", () => {
            location.href = '/edit#Add'
        })

        return new Function()
    }

    function DisplayEditPage(): Function {
        ContactFormValidate()
        let page = location.hash.substring(1)

        switch(page) {
            case "Add":
                {
                    $("#welcome").text("WEBD6201 Demo Add Contact")

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`)

                    $("#editButton").on("click", (event) => {
                        event.preventDefault()

                        let fullName = document.forms[0].fullName.value
                        let contactNumber = document.forms[0].contactNumber.value
                        let emailAddress = document.forms[0].emailAddress.value

                        // Get form information (name, contact number, email address)
                        AddContact(fullName, contactNumber, emailAddress)

                        // redirect to contact-list
                        location.href = '/contact-list'
                    })
                }
                break
            default:
                {
                    // get contact info from localStorage
                    let contact = new core.Contact("", "", "")
                    contact.deserialize(localStorage.getItem(page) as string)

                    // display contact info in edit form
                    $("#fullName").val(contact.Name)
                    $("#contactNumber").val(contact.ContactNumber)
                    $("#emailAddress").val(contact.EmailAddress)

                    // when edit button is pressed, update the contact
                    $("#editButton").on("click", (event) => {
                        event.preventDefault()

                        // get all changes from the form
                        contact.Name = $("#fullName").val() as string
                        contact.ContactNumber = $("#contactNumber").val() as string
                        contact.EmailAddress = $("#emailAddress").val() as string

                        // replace the changes in localStorage
                        localStorage.setItem(page, contact.serialize() as string)

                        // go back to contact-list.html
                        location.href = '/contact-list'
                    })
                }
                break
        }

        return new Function()
    }

    function DisplayReferences(): Function {
        console.log("References Page")

        return new Function()
    }

    function DisplayLoginPage(): Function {
        console.log("Login Page")

        let messageArea = $('#messageArea')
        messageArea.hide()

        $('#loginButton').on('click', function() {
            let success = false

            // create an empty user object
            let newUser = new core.User()

            // use JQuery to load users.json file and read over it
            $.get('./Data/users.json', function(data) {
                // iterate over every user in the users.json file... for loop
                for (const user of data.users) {
                    // check if the username and password match the user data

                    let username = document.forms[0].username.value
                    let password = document.forms[0].password.value

                    // passed in from users.json
                    if (username == user.Username && password == user.Password) {
                        newUser.fromJSON(user)
                        success = true
                        break
                    }
                }

                // if username and password matched (success = true) -> perform the login sequence
                if (success) {
                    // add user to sessionStorage
                    sessionStorage.setItem('user', newUser.serialize() as string)

                    // hide any error messages
                    // missing a part of this code
                    messageArea.removeAttr('class').hide()

                    // redirect the user to the secure area of our website - contact-list.html
                    location.href = '/contact-list'
                } else {
                    // display the error message
                    $('#username').trigger('focus').trigger('select')
                    messageArea.addClass('alert alert-danger').text('Error: Invalid Login Credentials.. Username/Password Mismatch').show()
                }
            })

            
        })

        $('#cancelButton').on('click', function() {
            // clear the form
            document.forms[0].reset()

            // return to home page
            location.href = '/home'
        })

        return new Function()
    }

    function CheckLogin(): void {
        // if the user is logged in, then
        if (sessionStorage.getItem("user")) {
            // switch the login button to logout
            $('#login').html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            )

            $('#logout').on('click', function() {
                // perform logout
                sessionStorage.clear()

                // redirect to login.html
                location.href = '/login'
            })
        }
    }
    
    function DisplayRegisterPage(): Function {
        console.log("Registration Page")

        return new Function()
    }

    function Display404Page(): Function {
        console.log("404 Page")

        return new Function()
    }

    /**
     * @returns {Function}
     */
    function ActiveLinkCallBack(): Function {
        console.log(`ActiveLinkCallBack - ${ router.ActiveLink }`)
        switch (router.ActiveLink) {
            case "home": return DisplayHome()
            case "projects": return DisplayProjects()
            case "contact": return DisplayContacts()
            case "contact-list": return DisplayContactList()
            case "references": return DisplayReferences()
            case "edit": return DisplayEditPage()
            case "login": return DisplayLoginPage()
            case "register": return DisplayRegisterPage()
            case "404": return Display404Page()
            default:
                console.error(`Error: Callback does not Exist... ${ router.ActiveLink }`)
                return new Function()
        }
    }
    
    function Start() {
        console.log("App Started Successfully!")

        // AjaxRequest("GET", "./static/header.html", LoadHeader)
        LoadHeader()

        LoadContent()

        LoadFooter()

        /* switch (document.title) {
            case "Home":
                DisplayHome()
                break
            case "Projects":
                DisplayProjects()
                break
            case "Contact Us":
                DisplayContacts()
                break
            case "Contact List":
                DisplayContactList()
                break
            case "References":
                DisplayReferences()
                break
            case "Edit":
                DisplayEditPage()
                break
            case "Login":
                DisplayLoginPage()
                break
            case "Register":
                DisplayRegisterPage()
                break
        } */
        

    }

    window.addEventListener("load", Start)
})()