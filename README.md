# Robo app 

> [Framework7](http://www.idangero.us/framework7) is a Mobile UI framework that can be used to build hybrid apps with PhoneGap. This app is written in PhoneGap (Cordova) using Framework7. 

> [Robo 3D](https://robo3d.com) is a company in San Diego which makes 3D printers for the consumer market. This app is designed specifically for their printers, specifically the C2 and R2 models. 

![c2-r2-header](https://user-images.githubusercontent.com/15971213/32683766-b7311db8-c632-11e7-9f81-8d5e35315461.jpg)

## Overview
The original Robo beta app provided by Robo 3D was written for the iOS platform and works reasonably well. Although some work has been put into porting this to other smartphones, no app has yet been released.

For this reason, I decided to re-write the entire portable application using a platform which is more conducive to cross-platform development, Adobe PhoneGap (Cordova).

## Progress
The app looks good so far. I've managed to reasonably mimic the original look and feel after the port to PhoneGap/Framework7.

![sidemenu](https://user-images.githubusercontent.com/15971213/32874784-3be51bbc-ca49-11e7-9b26-3c64c638df01.png)

![motors](https://user-images.githubusercontent.com/15971213/32874814-6822c9e0-ca49-11e7-9fb5-5bd20e988246.png)

At the moment, it's mostly "greeked-in" and will need further work now to exercise the underlying [OctoPrint API](http://docs.octoprint.org/en/master/api/) for querying the printer.

I'm now starting to pull data from querying the API and placing it where it should reasonably belong.

Comments/questions?  [info@robo.fyi](mailto:info@robo.fyi)



  