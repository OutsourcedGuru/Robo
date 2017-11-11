// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true,
    domCache: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("deviceready");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
    console.log('onPageInit for about page');
})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        console.log('Global pageInit handler with if statement');
        // myApp.alert()
    }
})

$$('.gettingStartedVideos').on('click', function () {
    document.getElementById('videosLeft').style.display = 'block';
    document.getElementById('mainLeft').style.display = 'none';
});   

$$('.gettingStartedVideosClose').on('click', function () {
    document.getElementById('videosLeft').style.display = 'none';
    document.getElementById('mainLeft').style.display = 'block';
});

$$('.printer01').on('click', function () {
    mainView.router.loadPage('printer01.html');
});

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    console.log('pageInit with selector for about');
})