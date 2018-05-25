# Robo app 

> [Framework7](http://www.idangero.us/framework7) is a Mobile UI framework that can be used to build hybrid apps with PhoneGap. This app is written in PhoneGap (Cordova) using Framework7. 

> [Robo 3D](https://robo3d.com) is a company in San Diego which makes 3D printers for the consumer market. This app is designed for their printers, specifically the C2 and R2 models. 

> [OctoPrint](https://octoprint.org) is the underlying programming interface which is being exercised here under the hood of the printer. It's the product of the talented Gina Häußge.

![c2-r2-header](https://user-images.githubusercontent.com/15971213/32683766-b7311db8-c632-11e7-9f81-8d5e35315461.jpg)

## Overview
The original Robo beta app provided by Robo 3D was written for the iOS platform and works reasonably well. Although some work has been put into porting this to other smartphones, no app has yet been released.

For this reason, I decided to re-write the entire portable application using a platform which is more conducive to cross-platform development, Adobe PhoneGap (Cordova).

## Installation
There are two paths for serving up the app, depending upon how much pain you're willing to endure.

### Build and Publish
The first option would be to create an Adobe ID and to use their [online Build platform](http://docs.phonegap.com/phonegap-build/) to generate the code. This will create app versions for the various mobile platforms.

This requires that you first get developer IDs from [Apple](https://developer.apple.com/developer-id/) [$99/year], Google [$25 setup fee] and Microsoft [$19 setup fee] and then to [upload your collection of certificates to Adobe's website](http://docs.phonegap.com/phonegap-build/signing/ios/).

Once done, you may then build these platform-specific versions.

### Host Locally and Use Browser
The easier method is to simply install the necessary dependencies and to serve up the app locally. You'd then use your browser on your mobile, for example, to visit this hosted site.

```
$ npm install -g phonegap@latest
$ mkdir ~/sites && cd ~/sites
$ git clone https://github.com/OutsourcedGuru/Robo
$ cd Robo
$ npm install
$ npm start
```

Then, on your mobile phone or your workstation, visit the indicated website in your browser.

For my own printer, I intend to serve up this app with a $10 [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/) single board computer inside the bottom of my printer's case (rather than potentially polluting the OctoPrint installation on the main Pi). It will be powered via microUSB cable from the main Pi computer.

## Progress
The app looks great so far. I've managed to reasonably mimic the original look and feel after the port to PhoneGap/Framework7.

I'm now pulling data by querying the underlying [OctoPrint API](http://docs.octoprint.org/en/master/api/) which is running in the printer's computer. Work is progressing at a rapid pace and I anticipate that it will be completed soon.

In it's current version (v1.2.2), it is a usable app for anyone with a Robo C2 with a single extruder.

### To-do

- [x] CSS styling
- [x] X (left panel)
- [x] Dashboard (left panel)
- [x] Add a Printer with local storage (home and left panel)
- [x] Info page for Add a Printer
- [x] App Settings with profile deletion (left panel)
- [x] Getting Started Videos with sub-menu navigation (left panel)
- [x] User Manual (left panel)
- [x] Report an App Issue contact page (left panel)
- [x] Store (left panel)
- [x] About with callouts to github projects (left panel)
- [x] Landing page for first printer profile (home page)
- [x] Info page for first printer profile
- [x] Styled motor/extruder buttons, temperature and files
- [x] Remove browsing for the IP address of the printer since it doesn't significantly add value
- [x] Remove support for navigating into folders since it doesn't significantly add value
- [x] Remove support for Settings tab for landing page since it doesn't significantly add value
- [x] Remove support for Cloud Storage (left panel) since it doesn't significantly add value
- [x] Jog motor/extruder via API interface
- [x] Initiate job from interface
- [x] Start video feed (landing page) and show (home page)
- [x] Save the currently-selected filament type in local storage
- [ ] Add buttons for other tools (2nd extruder/bed)
- [ ] Add safety mechanism for jogging the extruder versus the temperature
- [ ] Add safety mechanism to prevent raising bed too high
- [x] Pre-heat and cool-down buttons
- [ ] Filament wizard
- [ ] Change filament wizard
- [ ] Add support for more than one printer profile
- [x] Test with IP address for hostName
- [ ] Testing with iOS, Android and Microsoft Phone mobile platforms as well as OS X, Windows 10 and Ubuntu 16.04 LTS workstations.
- [x] Update @media queries for iPhone/iPad
- [ ] Consider adding system command buttons for shutting down and/or restarting OctoPrint

Comments/questions?  [info@robo.fyi](mailto:info@robo.fyi)

## Screenshots
Here is the latest collection of screenshots from the running app.

![robo-home](https://user-images.githubusercontent.com/15971213/33332680-bec1128c-d419-11e7-97ed-f03b1620272c.png)

![robo-home-webcam](https://user-images.githubusercontent.com/15971213/33332724-dcc35ad8-d419-11e7-9b88-305b2597c707.png)

![robo-leftpanel](https://user-images.githubusercontent.com/15971213/33332752-f507630a-d419-11e7-9cd9-56287b78acf2.png)

![robo-videos](https://user-images.githubusercontent.com/15971213/33332823-22b1a02c-d41a-11e7-85ec-78129527b6b0.png)

![robo-motors](https://user-images.githubusercontent.com/15971213/33332915-5daacb36-d41a-11e7-8d33-e7fe508055d8.png)

![robo-temperature](https://user-images.githubusercontent.com/15971213/33332930-6b5d19f0-d41a-11e7-8df0-b137283c0fa4.png)

![robo-filament](https://user-images.githubusercontent.com/15971213/33332959-7c97c6e8-d41a-11e7-8233-2f28a5a3809c.png)

![robo-webcam-on](https://user-images.githubusercontent.com/15971213/33332991-942525c6-d41a-11e7-8a25-367b3cac8f5f.png)

![robo-webcam-off](https://user-images.githubusercontent.com/15971213/33333015-a4329bec-d41a-11e7-822b-d7f64c0ae044.png)

![robo-files](https://user-images.githubusercontent.com/15971213/33333041-b29a42f2-d41a-11e7-9dfb-8a01849f4122.png)

![robo-printer-help](https://user-images.githubusercontent.com/15971213/33333084-d3584f16-d41a-11e7-82f8-a91d5f3e370c.png)

![robo-addprinter](https://user-images.githubusercontent.com/15971213/33333129-f66ebcb0-d41a-11e7-83ca-aed048c43245.png)

![robo-addprinter-help](https://user-images.githubusercontent.com/15971213/33333149-05e8679a-d41b-11e7-80c7-da53e9bfa3a3.png)

![robo-appsettings](https://user-images.githubusercontent.com/15971213/33333185-1e625dda-d41b-11e7-8816-1f39075972b4.png)

![robo-reportissue](https://user-images.githubusercontent.com/15971213/33333216-34157ba8-d41b-11e7-9f38-0cacfa4c3aee.png)

![robo-about](https://user-images.githubusercontent.com/15971213/33333243-4198efe4-d41b-11e7-99dc-baad461cf964.png)


  
|Donate||Cryptocurrency|
|:-----:|---|:--------:|
| ![eth-receive](https://user-images.githubusercontent.com/15971213/40564950-932d4d10-601f-11e8-90f0-459f8b32f01c.png) || ![btc-receive](https://user-images.githubusercontent.com/15971213/40564971-a2826002-601f-11e8-8d5e-eeb35ab53300.png) |
|Ethereum||Bitcoin|
