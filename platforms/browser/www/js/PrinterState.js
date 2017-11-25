//'use strict';

/**
 * PrinterState class.
 * 
 * @constructor
 * @param {String} name -             The printer's name      ("charming-pascal")
 * @param {String} hostName  -        The printer's hostName  ("charming-pascal.local)
 * @param {String} ipAddress  -       The printer's ipAddress ("192.168.0.5")
 * @param {String} apiKey -           The printer's apiKey    (hexdigits)
 * @param {String} webcamUrl -        The printer's webcamUrl ("http://charming-pascal.local:8080/?action=stream")
 * @param {String} selectedFilament - Filament                ("PLA")
 * @param {String} appLandingPage -   Name of page            ("printer01")
 */
function PrinterState(name, hostName, ipAddress, apiKey, webcamUrl, selectedFilament, appLandingPage) {
    this.name = name;
    this.setConnectionInfo(hostName, ipAddress);
    this.apiKey = apiKey;
    this.webcamUrl = webcamUrl;
    this.selectedFilament = selectedFilament;
    this.appLandingPage = appLandingPage;
}

/**
 * Set PrinterState connection info.
 * 
 * @param {String} - The hostName attribute.
 * @param {String} - The ipAddress attribute.
 */
PrinterState.prototype.setConnectionInfo = function(hostName, ipAddress) {
    this.hostName = hostName;
    this.ipAddress = ipAddress;
};

/**
 * Get PrinterState connection info.
 * 
 * @return {Object}
 */
PrinterState.prototype.getConnectionInfo = function() {
    return {
        hostName: this.hostName,
        ipAddress: this.ipAddress,
        apiKey: this.apiKey
    };
};

/**
 * Get PrinterState description.
 * 
 * @return {String}
 */
PrinterState.prototype.toString = function() {
    return this.name;
};

/**
 * Get PrinterState webcam URL.
 * 
 * @return {Object}
 */
PrinterState.prototype.getWebcamUrl = function() {
    return this.webcamUrl;
  };
  
/**
 * Get PrinterState filament type currently-selected.
 * 
 * @return {Object}
 */
PrinterState.prototype.getSelectedFilament = function() {
    return this.selectedFilament;
  };

/**
 * Get PrinterState landing page.
 * 
 * @return {Object}
 */
PrinterState.prototype.getLandingPage = function() {
  return this.appLandingPage;
};
