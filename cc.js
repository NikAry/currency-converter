let url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

let dropdown=document.querySelectorAll(".dropdown select")
let ex_btn=document.querySelector(".btn")
let fromCur= document.querySelector(".from select")
let toCur= document.querySelector(".to select")
let msg=document.querySelector(".msg")


for(slt of dropdown){
    for ( cntCode in countryList) {
    let opt=document.createElement("option")
    opt.innerText=cntCode;
    opt.value=cntCode;
    if (slt.name=="from" && cntCode=="USD") {
        opt.selected="selected"
    }
    else if (slt.name=="to" && cntCode=="INR") {
        opt.selected="selected"
    }
    slt.append(opt);
    }
    slt.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}


const updateFlag=(element)=>{
    let currCode=element.value
    let cunCode=countryList[currCode]
    let newFlag=`https://flagsapi.com/${cunCode}/flat/64.png`
    let img=element.parentElement.querySelector("img")
    img.src=newFlag
};

ex_btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let inamount= document.querySelector(".eamount input")
    let outamount = document.querySelector(".rad")
    
    let amtEnter=inamount.value;

    if (amtEnter==="" || amtEnter<1) {
        amtEnter=1;
        inamount.value="1";
    }
    const newURL=`${url}/${fromCur.value.toLowerCase()}.json`;
    let response= await fetch(newURL)
    let data=await response.json();
    let rates=data[fromCur.value.toLowerCase()][toCur.value.toLowerCase()];
    outamount.innerText=`${amtEnter * rates.toFixed(2)} ${toCur.value}`
    
    msg.innerText=`1 ${fromCur.value} = ${rates.toFixed(2)} ${toCur.value}`

});




