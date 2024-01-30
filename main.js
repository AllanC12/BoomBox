const {app, BrowserWindow} = require("electron")
const path = require("path")
const electronReload = require("electron-reload")
const {exec} = require("child_process")

let mainWindow

const startJsonServer = () => {
    const jsonServerProcess = exec(`json-server --watch server/db.json --port 3004`,(error,stdout) => {
        if(error){
            throw new Error(`Erro ao executar json-server: ${error.message}`)
            return
        }

        console.log("JSON-server iniciado com o código" + stdout)
    })

    jsonServerProcess.on('close',(code) => {
        console.log("O json-server foi encerrado com código" + code)
    })

}

app.on('ready',() => {
    mainWindow = new BrowserWindow({width: 800,height: 600})

    mainWindow.loadFile("pages/login.html")

    // mainWindow.removeMenu()

    startJsonServer()

    // mainWindow.setFullScreen(true)

})

electronReload(__dirname,{
    electron: path.join(__dirname,"node_modules",".bin","electron") 
})

app.on("window-all-closed",() => {
    app.quit()
})