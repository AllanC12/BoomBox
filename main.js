const {app, BrowserWindow} = require("electron")
const path = require("path")
const electronReload = require("electron-reload")
const {exec} = require("child_process")

let mainWindow

app.on('ready',() => {
    mainWindow = new BrowserWindow({width: 800,height: 600})

    mainWindow.loadFile("pages/login.html")

    // mainWindow.removeMenu()

    // mainWindow.setFullScreen(true)

})

electronReload(__dirname,{
    electron: path.join(__dirname,"node_modules",".bin","electron") 
})

app.on("window-all-closed",() => {
    app.quit()
})