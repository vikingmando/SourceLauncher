# SourceLauncher

Electron NGE Launcher (Credit to RoC for original code) 

This launcher is based on the RoC Launcher and adapted for use on SWG Source based servers. I have reskinned it to be more modern and removed some of the buttons that are not necessary for it to function on SWG Source based servers.

Requirements: 

NPM 1.1.12
NVM 10.8.1

1. Renderer.js

Change 

i) var config = {folder: 'C:\\SWGNexus'}; on line 36 to your default install directory


ii) websiteBtn.addEventListener('click', event => shell.openExternal("your website address here"));
discordBtn.addEventListener('click', event => shell.openExternal("your discord URL Here"));

These are on lines 105 and 106 to your Discord and Website address.


2. config.json

i) Change this to your default installation directory

3. install.js

i) change the URLs for client.cfg, local_machine_options.iff, and preload.cfg to the URLs for your manifest download server.

4. main.js

i) Change "YourIcon.ico" on line 15 to the name of your ico (this will be your icon)

ii) change the URL on line 54 to your manifest URL

3. index.html

i) change line 165 to your updates splash page if so have one

ii) change your logo png replacing "Your Logo Here" 

5. Testing

i) from the command line 

cd <Source Launcher Dir> 
npm start

6. Compiling 

i) from the command line

cd <Source Launcher Dir>

electron-packager <app dir> <appName> --platform=win32 --arch=ia32

This will create an executable version of the launcher within the directory of your code for the launcher.

from here rename and distribute as you wish, or compiling it into an installer package for distribution.

In order for the launcher to work correctly you will need to create a manifest of your game files with MD5 hashes in order for the launcher to recognize/update/ and launcher correctly. The example manifest is located in the "required.JSON"

DISCLAIMER: This is a reskinned and edited version of the RoC Launcher. I did this to save time and steps required for setting up this launcher to be used on Source Based servers. All credit goes to DPWhittaker for the original design and code for this project. 

Side note: Included are extra buttons for later revisions I plan to make. 


