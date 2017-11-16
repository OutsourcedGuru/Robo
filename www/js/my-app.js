var Version = "1.0.1";

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
    $$('.panel-footer-version').html('Ver. ' + Version);    
});

function pad(num, size) {
    var s = "00" + num;
    return s.substr(s.length-size);
}

function pad(num){
    return ('00' + num).substr(-2);
}

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('printer01', function (page) {
    const printerName = "10.20.30.64"; //"charming-pascal.local"; //"169.254.49.14";
    const apiKey =      "31FDBA2199464894B43E71576CE18CDD";
    const apiKeyAddon = "apikey=" + apiKey;
    var url =           "";
    var htmlContent =   "";

    /* ----------------------------------------------------------------------
       Motors
    -------------------------------------------------------------------------*/
    {
        // To-do: Need to query the current jog amount and colorize one of these
        htmlContent = '<p></p>';


        /* ------------------------------------------------------------------
           Jog amounts
        ---------------------------------------------------------------------*/
        var amounts = [
            {'name': '0.1mm',  'color': 'button-gray'},
            {'name': '1mm',    'color': 'button-blue'},
            {'name': '10mm',   'color': 'button-gray'},
            {'name': '100mm',  'color': 'button-gray'}
        ];
        amounts.forEach(function(item) {
            htmlContent += '<div class="button-jog ' + item.color + '">' +
                item.name + '</div>';
        });

        /* ------------------------------------------------------------------
           Motor selection
        ---------------------------------------------------------------------*/
        var motors = [
            {'name': 'X-Axis',   'color': 'button-blue', 'isSelected': true},
            {'name': 'Y-Axis',   'color': 'button-gray', 'isSelected': false},
            {'name': 'Z-Axis',   'color': 'button-gray', 'isSelected': false},
            {'name': 'Extruder', 'color': 'button-gray', 'isSelected': false}
        ];
        motors.forEach(function(item) {
            htmlContent += '<div class="button-motors ' + item.color + '">' +
                item.name + '</div>';
        });

        htmlContent += '<hr width="95%"/>';
        /* ------------------------------------------------------------------
           Actions
        ---------------------------------------------------------------------*/
        // if (motors[{name='X-Axis'}].isSelected) {
            var directions = [
                {'name': 'Left'},
                {'name': 'Home'},
                {'name': 'Right'}
            ];
            directions.forEach(function(item) {
                htmlContent += '<div class="button-action button-blue">' +
                    item.name + '</div>';
            });
        // }

        $$("#idMotorsDetail").html(htmlContent);
    }
    /* ----------------------------------------------------------------------
       End of Motors
    -------------------------------------------------------------------------*/

    /* ----------------------------------------------------------------------
       Settings
    -------------------------------------------------------------------------*/
    url = "http://" + printerName + "/api/settings?" + apiKeyAddon;
    $$.getJSON(url, function(jsonData) {
        var buttonColor = 'button-blue';
        htmlContent = '<p></p>';
        var settings = [
            {'name': 'Baud rate',   'value': jsonData.serial.baudrate},
            {'name': 'Autoconnect', 'value': jsonData.serial.autoconnect},
            {'name': 'Device',      'value': jsonData.serial.port}
        ];
        settings.forEach(function(item) {
            htmlContent += '<div ' +
                'style="color:white;font-size:14pt;font-family: Arial, Helvetica, sans-serif;border-radius:5px;padding:5px;margin-bottom:5px;' +
                '" class="button-file ' + buttonColor + '">' +
                '<span>' + item.name + '</span><span style="position:relative;float:right">' + item.value + '</span></div>';
        });
        $$("#idSettingsDetail").html(htmlContent);

        htmlContent = '<p></p>';
        var filaments = [
            {'name': jsonData.temperature.profiles[0].name, 'extruder': jsonData.temperature.profiles[0].extruder, 'bed': jsonData.temperature.profiles[0].bed},
            {'name': jsonData.temperature.profiles[1].name, 'extruder': jsonData.temperature.profiles[1].extruder, 'bed': jsonData.temperature.profiles[1].bed}
        ];
        filaments.forEach(function(item) {
            htmlContent += '<div ' +
                'style="color:white;font-size:14pt;font-family: Arial, Helvetica, sans-serif;border-radius:5px;padding:5px;margin-bottom:5px;' +
                '" class="button-file ' + buttonColor + '">' +
                '<span>' + item.name + '</span><span style="position:relative;float:right">Extruder: ' + item.extruder + '&deg;C, Bed: ' + item.bed + '&deg;C</span></div>';
        });
        $$("#idFilamentDetail").html(htmlContent);
    });
    /* ----------------------------------------------------------------------
       End of Settings
    -------------------------------------------------------------------------*/

    /* ----------------------------------------------------------------------
       Files
    -------------------------------------------------------------------------*/
    url = "http://" + printerName + "/api/files?recursive=true&" + apiKeyAddon;
    $$.getJSON(url, function(jsonData) {
        // At this point, we have a jsonData object which includes jsonData.files[]
        // as an array of objects:
        // We're probably only really interested in 1) name, 2) date,
        // 3) robo_data.time.hours, robo_data.time.minutes,
        htmlContent = '<p></p>';
        // Walk the array first, looking for folders
        for (var i = 0, len = jsonData.files.length; i < len; i++) {
            var iconType = 'folder';
            var buttonColor = 'button-green';
            if (jsonData.files[i].type_path) {
                htmlContent += '<div ' +
                    'style="color:white;font-weight:bolder;font-size:16pt;font-family: Arial, Helvetica, sans-serif;border-radius:5px;padding:5px;margin-bottom:5px;' +
                    '" class="button-file ' + buttonColor + '">' +
                    '<img class="img-file ' + buttonColor + '" src="/img/' + iconType + '_48x48.png" width="48" height="48"/>' +
                    '<span style="position:relative;top:3px;">' + jsonData.files[i].name + '</span></div>';
            }
        }
        // Walk the array a second time, looking for just files
        for (var i = 0, len = jsonData.files.length; i < len; i++) {
            var iconType = 'images';
            var buttonColor = 'button-blue';
            if (! jsonData.files[i].type_path) {
                var hours = jsonData.files[i].robo_data.time.hours;
                var minutes = pad(jsonData.files[i].robo_data.time.minutes);
                htmlContent += '<div ' +
                    'style="color:white;font-weight:bolder;font-size:16pt;font-family: Arial, Helvetica, sans-serif;border-radius:5px;padding:5px;margin-bottom:5px;' +
                    '" class="button-file ' + buttonColor + '">' +
                    '<img class="img-file ' + buttonColor + '" src="/img/' + iconType + '_48x48.png" width="48" height="48"/>' +
                    '<span style="position:relative;top:3px;">' + jsonData.files[i].name + ' (' + hours + ':' + minutes + ')' + '</span></div>';
            }
        }
        $$("#idFilesDetail").html(htmlContent);
    });
    /* ----------------------------------------------------------------------
       End of Files
    -------------------------------------------------------------------------*/
});

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