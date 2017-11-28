//'use strict';

/**
 * PrinterState class.
 * 
 * @constructor
 * @param {String} name -             The printer's name      ("charming-pascal")
 * @param {String} hostName  -        The printer's hostName  ("charming-pascal.local)
 * @param {String} apiKey -           The printer's apiKey    (hexdigits)
 * @param {String} webcamUrl -        The printer's webcamUrl ("http://charming-pascal.local:8080/?action=stream")
 * @param {String} selectedFilament - Filament                ("PLA")
 * @param {String} appLandingPage -   Name of page            ("printer01")
 */
function PrinterState(name, hostName, apiKey, webcamUrl, selectedFilament, appLandingPage) {
    this.name = name;
    this.setConnectionInfo(hostName);
    this.apiKey = apiKey;
    this.webcamUrl = webcamUrl;
    this.selectedFilament = selectedFilament;
    this.appLandingPage = appLandingPage;
}

/**
 * Set PrinterState connection info.
 * 
 * @param {String} - The hostName attribute.
 */
PrinterState.prototype.setConnectionInfo = function(hostName) {
    this.hostName = hostName;
};

/**
 * Get PrinterState connection info.
 * 
 * @return {Object}
 */
PrinterState.prototype.getConnectionInfo = function() {
    return {
        hostName: this.hostName,
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
