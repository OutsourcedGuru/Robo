var Version = "1.0.5";

// Here, we're using one 'pageInit' event handler for all pages and selecting one
// that might need extra initialization. This is a special case in that the home
// page isn't reached from the Framework7 navigation handler so it won't be fired
// off in the standard version as seen below for other page initializers.
var globalArrayPrinterProfiles = [];
var globalCurrentPrinterName = "";
document.addEventListener('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'index') {
        // First, retrieve the existing jsonString of the printer profiles array
        // from local storage
        var jsonStringExistingArray = localStorage.getItem('arrayPrinterProfiles');
        // Then, convert it back into a json object (array)
        var objArrayExistingPrinterProfiles = JSON.parse(jsonStringExistingArray);
        // Create an ordinal-based counter for use in determining landing page
        var ordinalLandingPage = 1;
        // And store these to our global array for later use
        // console.log('Iterating printer profiles...');
        objArrayExistingPrinterProfiles.PrinterProfiles.forEach(function (item) {
            var itemKey;
            for (var prop in item) {
                itemKey = prop; // Should be 'charming-pascal' on mine
                break;
            }
            // console.log('Printer profile: ' + itemKey);
            var landingPage = 'printer0' + ordinalLandingPage++;
            var objPrinterState = new PrinterState(itemKey, item[itemKey].hostName, item[itemKey].ipAddress, item[itemKey].apiKey, item[itemKey].webcamUrl, landingPage);
            globalArrayPrinterProfiles.push(objPrinterState);
        });

        // console.log(globalArrayPrinterProfiles[0].getConnectionInfo().hostName);
        // console.log(document.getElementById('idIndexPagePrinters'));
        // console.log('Length of globalArrayPrinterProfiles: ' + globalArrayPrinterProfiles.length);
        /* --------------------------------------------------------------------
           So now, we want to add one of these dynamically per printer profile
           that's in the globalArrayPrinterProfiles array of PrinterState
           (class-based) objects.
           --------------------------------------------------------------------
                                    <li class="background-gray">
                                        <a href="#" class="item-content item-link">
                                            <div class="item-inner">
                                                <div class="item-title printer01">&bull; charming-pascal</div>
                                            </div>
                                        </a>
                                    </li>
        */
        var htmlContent = "<ul>";
        if (globalArrayPrinterProfiles.length) {
            globalArrayPrinterProfiles.forEach(function (objItem) {
                // console.log(objItem.name);
                // TODO (make this work for more than one printer by determining the page ordinal)
                htmlContent += '<li class="background-gray">' +
                    '<a href="#" class="item-content item-link">' +
                    '<div class="item-inner">' +
                    '<div class="item-title ' + objItem.appLandingPage + '">' +
                    '&bull; ' + objItem.name + '</div>' +
                    '</div></a></li>';
            });
        } else {
            htmlContent += '<li class="background-gray">' +
                '<a href="addprinter.html" class="item-content item-link">' +
                '<div class="item-inner">' +
                '<div class="item-title addprinter.html">' +
                'Add a printer</div>' +
                '</div></a></li>';
        }
        htmlContent += "</ul>";
        document.getElementById('idIndexPagePrinters').innerHTML = htmlContent;
    }
});

// Initialize app and if we need to use custom DOM library, let's save it to $$ variable:
var myApp = new Framework7();
var $$ = Dom7;

// Add view and because we want to use dynamic navbar, we need to enable it:
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true
});

// Handle Cordova Device Ready Event since smartphones take a while to load up.
// Set the version text in the left panel's footer while we're initializing things.
$$(document).on('deviceready', function () {
    //console.log("deviceready");
    $$('.panel-footer-version').html('Ver. ' + Version);
    //localStorage.clear();

    // ------------------------------------------------------------------------
    // Here, we do some initialization if there are no saved printer profiles
    // in local storage.
    // First, retrieve the existing jsonString of the array from local storage
    var jsonStringExistingArray = localStorage.getItem('arrayPrinterProfiles');
    if (!jsonStringExistingArray) {
        //myApp.alert('Initializing local storage');
        // Looks like the user hasn't save any printers yet, let's save an
        // empty array
        var objEmptyArrayPrinterProfiles = { 'PrinterProfiles': [] };
        // Now convert this into a json string        
        var jsonStringEmptyArrayPrinterProfiles = JSON.stringify(objEmptyArrayPrinterProfiles);
        // Finally, save it to local storage
        localStorage.setItem('arrayPrinterProfiles', jsonStringEmptyArrayPrinterProfiles);
    } //else myApp.alert('Found initial local storage: ' + jsonStringExistingArray);
    // ------------------------------------------------------------------------

    // This needs to move to add-printer
    // var obj = { 'charming-pascal': { 'hostName': 'charming-pascal.local', 'ipAddress': '10.20.30.64', 'apiKey': '31FDBA2199464894B43E71576CE18CDD' }};
    // addPrinterProfile(obj);
});

/* ----------------------------------------------------------
   Local storage (stored as json strings)
   ----------------------------------------------------------
{
    'PrinterProfiles':
        [
            {
                charming-pascal': { 'hostName': 'charming-pascal.local', 'ipAddress': '10.20.30.64' }
            }
        ]
}
*/

/**
 * Add a new printer profile object in the local storage array if it doesn't
 * already exist; overwrite it otherwise (TODO).
 * 
 * @param {object} - The incoming JSON printer profile information
 */
function addPrinterProfile(objIncomingPrinterProfile) {
    // First, retrieve the existing jsonString of the array from local storage
    var jsonStringExistingArray = localStorage.getItem('arrayPrinterProfiles');
    // Then, convert it back into a json object (array)
    var objArrayExistingPrinterProfiles = JSON.parse(jsonStringExistingArray);
    // Look up the incoming printer to see if it's already there
    var incomingKey;
    for (var prop in objIncomingPrinterProfile) {
        incomingKey = prop; // Should be 'charming-pascal' on mine
        break;
    }
    // Does it already exist?
    if (objArrayExistingPrinterProfiles[incomingKey]) {
        // TODO (ignores at the moment)
    } else {
        // Okay, let's add it then
        // objIncomingPrinterProfile should look like: 
        // { 'charming-pascal': 
        //     { 'hostName': 'charming-pascal.local',
        //       'ipAddress': '10.20.30.64',
        //       'apiKey': 'hexstring',
        //       'webcamUrl': 'http://charming-pascal.local:8080/?action=stream' }}
        objArrayExistingPrinterProfiles.PrinterProfiles.push(objIncomingPrinterProfile);
        myApp.alert(JSON.stringify(objArrayExistingPrinterProfiles));
        // Now convert the object into a json string for saving back to storage
        var jsonStringNewPrinterProfiles = JSON.stringify(objArrayExistingPrinterProfiles);
        // Finally, save it back to local storage
        localStorage.setItem('arrayPrinterProfiles', jsonStringNewPrinterProfiles);
    }
}

/**
 * Return an array of printer profiles, as stored in local storage.
 * 
 */
function getPrinterProfiles() {
    var jsonString = localStorage.getItem('arrayPrinterProfiles');
    var objArrayPrinterProfiles = JSON.parse(jsonString);
    return objArrayPrinterProfiles;
}

/**
 * Pad the single-digit integer minutes, for example, to two digits as a string
 * 
 * @param {Number} - The (probably) one or two-digit number
 */
function pad(num) {
    return ('00' + num).substr(-2);
}

// Upon clicking the left panel's video link, toggle visibility... and then back
$$('.gettingStartedVideos').on('click', function () {
    document.getElementById('videosLeft').style.display = 'block';
    document.getElementById('mainLeft').style.display = 'none';
});
$$('.gettingStartedVideosClose').on('click', function () {
    document.getElementById('videosLeft').style.display = 'none';
    document.getElementById('mainLeft').style.display = 'block';
});

// Here, we're using a page callback for the reportissue page:
myApp.onPageInit('reportissue', function (page) {
    $$('#idReportIssueSendLink').on('click', function () {
        // First, retrieve the existing jsonString of the array from local storage
        var jsonStringReportIssue = localStorage.getItem('f7form-idReportIssue');
        // Then, convert it back into a json object (array)
        var objReportIssue = JSON.parse(jsonStringReportIssue);
        var args = {
            subject: 'subject',
            body: 'message',
            toRecipients: 'michaelblankenship.ftw@outlook.com'
        };
        $$('#idDivReportIssue').html(
            'Body:<br/>' +
                '&nbsp;&nbsp;Name: &nbsp;' +
                objReportIssue.name + '<br/>' +
                '&nbsp;&nbsp;Email: &nbsp;' + objReportIssue.email + '<br/>' +
                '&nbsp;&nbsp;Phone: &nbsp;' + objReportIssue.phone + '<br/><br/>' +
                '&nbsp;&nbsp;' + objReportIssue.body + '<br/><br/>' +
            '<a class="external link" href="mailto:' +
            objReportIssue.recipient +
            '?subject=' +
            objReportIssue.subject +
            '&body=' +
            'Name:  ' +
                objReportIssue.name + '%0D%0A' +
                'Email:  ' + objReportIssue.email + '%0D%0A' +
                'Phone:  ' + objReportIssue.phone + '%0D%0A%0D%0A' +
                objReportIssue.body + '%0D%0A' +
            '"><div class="button-send button-blue">Click here to send this info to us</div>' +
            '</a>');
        setTimeout(function(){mainView.router.loadPage("/");}, 10000);
    });
});

// Here, we're using a page callback for the deleteprinter page:
myApp.onPageInit('deleteprinter', function (page) {
    $$('#idDeletePrinterBackLink').on('click', function () {
        mainView.router.loadPage("/");
    });
    localStorage.clear();
});

// Here, we're using a page callback for the addprinter page:
myApp.onPageInit('addprinter', function (page) {
    console.log('Initializing addprinter...');
    $$('#idSaveButtonAddPrinter').on('click', function () {
        console.log('Save Button clicked');
        // First, retrieve the existing jsonString of the array from local storage
        var jsonStringAddPrinter = localStorage.getItem('f7form-idAddPrinterForm');
        // Then, convert it back into a json object (array)
        var objAddPrinter = JSON.parse(jsonStringAddPrinter);
        // Push the data sideways into a json string
        /*
        { "charming-pascal":
            { "hostName": "charming-pascal.local",
              "ipAddress": "10.20.30.64",
              "apiKey": "hexstring",
              "webcamUrl": "http://charming-pascal.local:8080/?action=stream" }}        
        */
        var jsonStringNewPrinter = '{ "' +
            objAddPrinter.addPrinterDisplayName +
            '": { "hostName": "' +
            objAddPrinter.addPrinterHostName +
            '", "ipAddress": "10.20.30.64", "apiKey": "' +
            objAddPrinter.addPrinterApiKey +
            '", "webcamUrl": "' +
            objAddPrinter.addPrinterWebcamUrl +
            '" }}';
        // Then, convert it into a json object
        var objNewPrinter = JSON.parse(jsonStringNewPrinter);
        // And add it to the local storage
        addPrinterProfile(objNewPrinter);
    });
});

// Here, we're using a page callback for the appsettings page:
myApp.onPageInit('appsettings', function (page) {
    var htmlContent = "";
    if (globalArrayPrinterProfiles.length) {
        globalArrayPrinterProfiles.forEach(function (objItem) {
            // console.log(objItem.name);
            // TODO (make this work for more than one printer by determining the page ordinal)
            htmlContent += '<div class="button-app-settings button-blue">' +
                objItem.name +
                '</div>' +
                '<a href="deleteprinter.html" class="item-content item-link a-button-delete">' +
                '<div class="button-delete">Delete</div>' +
                '</a>';
        });
    } else {
        htmlContent += '<a href="addprinter.html" class="item-content item-link a-button-addprinter">' +
            '<div class="button-addprinter button-blue">Add a Printer</div>' +
            '</a>';
    }
    document.getElementById('idAppSettingsDetail').innerHTML = htmlContent;
});


// Page loader for the printerProfile[0] click
$$('.printer01').on('click', function () {
    mainView.router.loadPage('printer01.html');
});
// Here, we're using a page callback for the printerProfile[0] page:
myApp.onPageInit('printer01', function (page) {
    var printerName =      "";
    var printerHostName =  "";
    var printerIpAddress = "";
    var printerApiKey =    "";
    // Also, we need to push the printer's name to the top of each landing page
    globalArrayPrinterProfiles.forEach(function (objItem) {
        if (objItem.appLandingPage === page.name) {
            printerName = objItem.name;
            printerHostName = objItem.hostName;
            printerIpAddress = objItem.ipAddress;
            printerApiKey = objItem.apiKey;
            $$("#idPrinterTitle").html(objItem.name);
        }
    });
    // TODO verify that this works with the printer on
    //const printerHostName = printerName + ".local"; //"10.20.30.64"; //"169.254.49.14";
    const apiKeyAddon = "apikey=" + printerApiKey;
    var url = "";
    var htmlContent = "";
    var operationalPrinter01 = false;
    var printingPrinter01 = false;
    var pausedPrinter01 = false;

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
            { 'name': '0.1mm', 'color': 'button-gray' },
            { 'name': '1mm', 'color': 'button-blue' },
            { 'name': '10mm', 'color': 'button-gray' },
            { 'name': '100mm', 'color': 'button-gray' }
        ];
        amounts.forEach(function (item) {
            htmlContent += '<div class="button-jog ' + item.color + '">' +
                item.name + '</div>';
        });

        /* ------------------------------------------------------------------
           Motor selection
        ---------------------------------------------------------------------*/
        var motors = [
            { 'name': 'X-Axis', 'color': 'button-blue', 'isSelected': true },
            { 'name': 'Y-Axis', 'color': 'button-gray', 'isSelected': false },
            { 'name': 'Z-Axis', 'color': 'button-gray', 'isSelected': false },
            { 'name': 'Extruder', 'color': 'button-gray', 'isSelected': false }
        ];
        motors.forEach(function (item) {
            htmlContent += '<div class="button-motors ' + item.color + '">' +
                item.name + '</div>';
        });

        htmlContent += '<hr width="95%"/>';
        /* ------------------------------------------------------------------
           Actions
        ---------------------------------------------------------------------*/
        // if (motors[{name='X-Axis'}].isSelected) {
        var directions = [
            { 'name': 'Left' },
            { 'name': 'Home' },
            { 'name': 'Right' }
        ];
        directions.forEach(function (item) {
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
       Temperature
    -------------------------------------------------------------------------*/
    url = "http://" + printerHostName + "/api/printer?" + apiKeyAddon;
    $$.getJSON(url, function (jsonData) {
        var buttonColor = 'button-blue';
        htmlContent = '<p></p>';
        var temps = [];
        if (jsonData.state.flags) {
            operationalPrinter01 = jsonData.state.flags.operational;
            printingPrinter01 = jsonData.state.flags.printing;
            pausedPrinter01 = jsonData.state.flags.paused;
        }
        if (jsonData.temperature.tool0) { temps.push({ 'name': 'Extruder1', 'actual': jsonData.temperature.tool0.actual, 'target': jsonData.temperature.tool0.target }); }
        if (jsonData.temperature.tool1) { temps.push({ 'name': 'Extruder2', 'actual': jsonData.temperature.tool1.actual, 'target': jsonData.temperature.tool1.target }); }
        if (jsonData.temperature.bed) { temps.push({ 'name': 'Bed', 'actual': jsonData.temperature.bed.actual, 'target': jsonData.temperature.bed.target }); }
        temps.forEach(function (item) {
            htmlContent += '<div ' +
                'style="color:white;font-size:14pt;font-family: Arial, Helvetica, sans-serif;border-radius:5px;padding:5px;margin-bottom:5px;' +
                '" class="button-file ' + buttonColor + '">' +
                '<span>' + item.name + '</span><span style="position:relative;float:right">Actual: ' + item.actual + '&deg;C / Target: ' + item.target + '&deg;C</span></div>';
        });
        htmlContent += '<p></p>';
        $$("#idTemperatureDetail").html(htmlContent);
    });
    /* ----------------------------------------------------------------------
       End of Temperature
    -------------------------------------------------------------------------*/

    /* ----------------------------------------------------------------------
       Settings
    -------------------------------------------------------------------------*/
    url = "http://" + printerHostName + "/api/settings?" + apiKeyAddon;
    $$.getJSON(url, function (jsonData) {
        var buttonColor = 'button-blue';
        htmlContent = '<p></p>';
        var settings = [
            { 'name': 'Baud rate', 'value': jsonData.serial.baudrate },
            { 'name': 'Autoconnect', 'value': jsonData.serial.autoconnect },
            { 'name': 'Device', 'value': jsonData.serial.port }
        ];
        settings.forEach(function (item) {
            htmlContent += '<div ' +
                'style="color:white;font-size:14pt;font-family: Arial, Helvetica, sans-serif;border-radius:5px;padding:5px;margin-bottom:5px;' +
                '" class="button-file ' + buttonColor + '">' +
                '<span>' + item.name + '</span><span style="position:relative;float:right">' + item.value + '</span></div>';
        });
        htmlContent += '<p></p>';
        $$("#idSettingsDetail").html(htmlContent);

        /* ------------------------------------------------------------------
           Filament
        ---------------------------------------------------------------------*/
        htmlContent = '<p></p>';
        var filaments = [
            { 'name': jsonData.temperature.profiles[0].name, 'extruder': jsonData.temperature.profiles[0].extruder, 'bed': jsonData.temperature.profiles[0].bed },
            { 'name': jsonData.temperature.profiles[1].name, 'extruder': jsonData.temperature.profiles[1].extruder, 'bed': jsonData.temperature.profiles[1].bed }
        ];
        filaments.forEach(function (item) {
            htmlContent += '<div ' +
                'style="color:white;font-size:14pt;font-family: Arial, Helvetica, sans-serif;border-radius:5px;padding:5px;margin-bottom:5px;' +
                '" class="button-file ' + buttonColor + '">' +
                '<span>' + item.name + '</span><span style="position:relative;float:right">Extruder: ' + item.extruder + '&deg;C, Bed: ' + item.bed + '&deg;C</span></div>';
        });
        htmlContent += '<p></p>';
        $$("#idFilamentDetail").html(htmlContent);
    });
    /* ----------------------------------------------------------------------
       End of Settings
    -------------------------------------------------------------------------*/

    /* ----------------------------------------------------------------------
       Files
    -------------------------------------------------------------------------*/
    url = "http://" + printerHostName + "/api/files?recursive=true&" + apiKeyAddon;
    $$.getJSON(url, function (jsonData) {
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
                    'style="color:white;font-weight:bolder;font-size:12pt;font-family: Arial, Helvetica, sans-serif;border-radius:5px;padding:5px;margin-bottom:5px;' +
                    '" class="button-file ' + buttonColor + '">' +
                    '<img class="img-file ' + buttonColor + '" src="/img/' + iconType + '_48x48.png" width="48" height="48"/>' +
                    '<span style="position:relative;top:3px;">' + jsonData.files[i].name + '</span></div>';
            }
        }
        // Walk the array a second time, looking for just files
        for (var i = 0, len = jsonData.files.length; i < len; i++) {
            var iconType = 'images';
            var buttonColor = 'button-blue';
            if (!jsonData.files[i].type_path) {
                var hours = jsonData.files[i].robo_data.time.hours;
                var minutes = pad(jsonData.files[i].robo_data.time.minutes);
                htmlContent += '<div ' +
                    'style="color:white;font-weight:bolder;font-size:12pt;font-family: Arial, Helvetica, sans-serif;border-radius:5px;padding:5px;margin-bottom:5px;' +
                    '" class="button-file ' + buttonColor + '">' +
                    '<img class="img-file ' + buttonColor + '" src="/img/' + iconType + '_48x48.png" width="48" height="48"/>' +
                    '<span style="position:relative;top:3px;">' + jsonData.files[i].name + ' (' + hours + ':' + minutes + ')' + '</span></div>';
            }
        }
        htmlContent += '<p></p>';
        $$("#idFilesDetail").html(htmlContent);
    });
    /* ----------------------------------------------------------------------
       End of Files
    -------------------------------------------------------------------------*/
});


// Here, we're using one 'pageInit' event handler for all pages and selecting one
// that might need extra initialization:
// $$(document).on('pageInit', function (e) {
//     // Get page data from event data
//     var page = e.detail.page;

//     if (page.name === 'about') {
//         //console.log('Global pageInit handler with if statement');
//         // myApp.alert()
//     }
// })
// Here, we're using live 'pageInit' event handlers for each page
// $$(document).on('pageInit', '.page[data-page="about"]', function (e) {
//     // Following code will be executed for page with data-page attribute equal to "about"
//     //console.log('pageInit with selector for about');
// })
