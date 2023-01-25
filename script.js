const main = document.querySelector("main")
const root = document.querySelector(":root")
const input = document.getElementById("input")
const resultInput = document.getElementById("result")

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

document.querySelectorAll(".charKey").forEach(function (charKeyBtn){
    charKeyBtn.addEventListener("click", function(){
        const value = charKeyBtn.dataset.value
        input.value += value
    })
})

document.getElementById("clear").addEventListener("click", function(){
    const button = document.getElementById("copyToClipboard")
    
    input.value = ""
    resultInput.value = ""
    resultInput.classList.remove("error")
    button.innerText = "Copy"
    button.classList.remove("success")
    input.focus()
})

input.addEventListener("keydown", function(ev){
    ev.preventDefault()

    if(allowedKeys.includes(ev.key)){
        input.value += ev.key
        return
    }

    if(ev.key === "Backspace"){
        input.value = input.value.slice(0, -1)
    }

    if(ev.key === "Enter"){
        calculate()
    }
})

document.getElementById("equal").addEventListener("click", calculate)

function calculate(){
    resultInput.value = "ERROR"
    resultInput.classList.add("error")
    const result = eval(input.value)
    resultInput.value = result
    resultInput.classList.remove("error")
}

document.getElementById("copyToClipboard").addEventListener("click", function(ev){
    const button = ev.currentTarget
    
    if(button.innerText === "Copy"){
        button.innerText = "Copied!"
        button.classList.add("success")
        
        navigator.clipboard.writeText(resultInput.value)
    }else{
        button.innerText = "Copy"
        button.classList.remove("success")
    }
})

document.getElementById("themeSwitcher").addEventListener("click", function(){
    if (main.dataset.theme === "light"){
        root.style.setProperty("--bg-color","#f9f9f9")
        root.style.setProperty("--font-color","#212529")
        root.style.setProperty("--border-color","rgba(17, 25, 20, 0.60)")
        root.style.setProperty("--page-color","rgb(17,25,39)")
        root.style.setProperty("--background","radial-gradient(circle, rgba(17,25,39,1) 0%, rgba(4,242,171,1) 0%, rgba(17,25,39,1) 100%)")
        document.getElementById("icon").src = "./imgs/icon_sol.png"
        main.dataset.theme = "dark"
    }else{
        root.style.setProperty("--bg-color","#212529")
        root.style.setProperty("--font-color","#f1f5f9")
        root.style.setProperty("--border-color","rgba(255, 255, 255, 0.125)")
        root.style.setProperty("--page-color","rgb(22,161,119)")
        root.style.setProperty("--background","radial-gradient(circle, rgba(22,161,119,1) 0%, rgba(68,189,162,1) 29%, rgba(9,131,182,1) 100%")
        document.getElementById("icon").src = "./imgs/icon_lua.png"
        main.dataset.theme = "light"
    }
})