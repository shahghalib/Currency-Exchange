const BASE_URL = "https://api.frankfurter.app/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document. querySelector(".to select")
const msg =document.querySelector(".msg")

for (let select of dropdowns){
for (let currCode in countryList){
    let newOption=document.createElement("option");
    newOption.innerHTML = currCode;
    newOption.value = currCode;
    if(select.name==="from" && currCode === "EUR"){
        newOption.selected = "selected"
    }else if(select.name==="to" && currCode === "USD"){
        newOption.selected = "selected"
    }
    select.append(newOption);  
}
select.addEventListener("change", (event)=>{
    updateflag(event.target)})
}

const updateflag = (element)=>{
    let currCode = element.value
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}

btn.addEventListener("click" , async (evt)=> {
    evt.preventDefault();
    let amount = document.querySelector(".amount input")
    let amtVal = parseFloat(amount.value);
    amount.value = "";

    const url = `${BASE_URL}?from=${fromCurr.value}&to=${toCurr.value}`;
    let response = await fetch (url)
    let data = await response.json()
    let rate = data.rates[toCurr.value];
    if(!rate){
        msg.innerHTML = "currency not supported";
        return;
    }

let finalAmount = amtVal * rate.toFixed(2);
msg.innerHTML=`${amtVal} ${fromCurr.value} = ${finalAmount}${toCurr.value}`
})

