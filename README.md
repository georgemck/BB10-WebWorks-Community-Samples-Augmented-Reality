BB10-WebWorks-Community-Samples-Augmented-Reality
=================================================

Sample project for creating Mobile Augmented Reality Mobile Apps for the BlackBerry 10 platform


Uses: 
 - BlackBerry WebWorks (App packaging)
 - jQuery Mobile (Mobile UI)
 - Three.js (WebGL)
 - JS Aruco (OpenCV)
 - getUserMedia (HTML5 spec)


My friend @Yosun on Twitter of AReality3D asked me to create a mobile AR app using Adobe PhoneGap, http://www.phonegap.com, and the JS Aruco library, https://code.google.com/p/js-aruco. JS Aruco utilizes a port of OpenCV, http://opencv.org, for JavaScript, http://www.uco.es/investiga/grupos/ava/node/26. It takes advantage of HTML5 browser capabilities getUserMedia (http://caniuse.com/stream) and WebGL (checkout Three.js, https://github.com/mrdoob/three.js) to enable desktop browsers to create augmented reality using JavaScript.

I used Google’s Chrome Browser to verify the web application worked on the desktop. This got me thinking about the recently released BlackBerry 10 phones and their heavily touted “better than desktop Chrome” mobile browser, and I thought I would give it a try. Heading over to one of the JS Aruco demos, http://inmensia.com/files/aruco/debug-posit/debug-posit.html, in the Z10′s mobile browser, it worked. I decided to take things a bit further and actually build a mobile app rather than use the website application. I used WebWorks which is the BlackBerry-engineered Cordova PhoneGap distribution with deeper integration with device capabilities than Cordova on BlackBerry mobiles. The result of the test was this video, http://www.youtube.com/watch?v=eb10iEwDvvs. Performance is a little slow and the video a bit hazy but I know it will perform better with some code optimization…
(more http://www.georgemckinney.com/2013/05/mobile-augmented-reality-with-html5-on-blackberry-10)

 - George
@georgemck
