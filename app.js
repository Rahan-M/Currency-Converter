let dropdowns=document.querySelectorAll(".dropdowns select");
let currUrl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
let submit_button=document.querySelector("button");
let msg=document.querySelector(".msg");
let fromCurr=document.querySelector("#from");
let toCurr=document.querySelector("#to");

// IIFE way to set the get the defualt msg
// in this code we used "load" event listener
// (async function defult() {
//     const url=`${currUrl}usd.json`;
//     let response=await fetch(url);
//     let data=await response.json();
//     let exrate=data.usd.inr.toFixed(2);
//     let outputval=exrate;
//     let output=`1 USD = ${outputval} INR`
//     msg.innerText=output;
// })();


for(let select of dropdowns){
    for(currCode in countryList){
        let newopt=document.createElement("option");
        newopt.innerText=currCode;
        select.append(newopt);
        if(select.id==="from" && currCode==="USD"){
            newopt.selected="selected";
        }else if(select.id==="to" && currCode==="INR"){
            newopt.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let flag=element.parentElement.querySelector("img");
    flag.src=newsrc;
}

const updatemsg= async()=>{
    let amt=document.querySelector("input");
    let amtval=amt.value;
    if(amtval===""||amtval<0){
        amtval=1;
        amt.value=1;
    }
    let fc=fromCurr.value.toLowerCase();
    let tc=toCurr.value.toLowerCase();
    const url=`${currUrl}${fc}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let exrate=data[`${fc}`][`${tc}`];
    let outputval=amtval*exrate;
    let output=`${amtval} ${fromCurr.value} = ${outputval.toFixed(2)} ${toCurr.value}`
    msg.innerText=output;
}
window.addEventListener("load",(evt)=>{
    evt.preventDefault();
    updatemsg()
})

submit_button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updatemsg()
})
