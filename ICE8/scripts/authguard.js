(function() {
    // check if user is logged in
    if (!sessionStorage.getItem("user")) {
        // redirect the user to login.html
        location.href = 'login.html'
    }
})()