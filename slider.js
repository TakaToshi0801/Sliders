const target = document.getElementById("target");
const sliderItems = document.querySelectorAll("#target .slider-data .slider-item");


let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");

sliderShow.classList.add("col-12", "d-flex", "flex-nowrap", "overflow-hiddens");
main.classList.add("main", "full-width");
extra.classList.add("extra", "full-width");

main.append(sliderItems[0])

sliderShow.append(main);
sliderShow.append(extra);
target.append(sliderShow);

let controles = document.createElement("div");
controles.classList.add("offset-5", "mt-2");

let leftBtn = document.createElement("button");
leftBtn.classList.add("btn", "btn-outline-primary");
leftBtn.innerHTML = "<";

let rightBtn = document.createElement("button");
rightBtn.classList.add("btn","btn-outline-primary");
rightBtn.innerHTML = ">";

controles.append(leftBtn);
controles.append(rightBtn);
target.append(controles);

main.setAttribute("data-index", "0");

//data-***属性は、要素に任意のキーと値を付けるための属性です。キー名は、data-の後に続けます。
// データをタグに紐付けして、JS内でアクセスすることができます。
// data属性はgetAttributeメソッドを使うことによって直接アクセスすることができます。
function sliderjump(steps,animationType){
    let index = parseInt(main.getAttribute("data-index"));
    let currentElement = sliderItems.item(index);

    index += steps;
    //console.log(index);

    if(index < 0)index = sliderItems.length -1;
    else if(index >= sliderItems.length) index = 0;

    const nextElement = sliderItems.item(index);

    //console.log(currentElement);
    //console.log(nextElement);

    main.setAttribute("data-index",index.toString());

    animationMain(currentElement,nextElement,animationType);
}
// blue-gray-success-yellow-redで並んでいます。

//現在のインデックスが1、青い箱が現在の要素で、グレーの箱が次の要素という意味です。
//sliderjump(1);
//今slideJump(1)をしたのでスライドは右にズレてます。
// したがって、現在のインデックスが0、グレーの箱が現在の要素で、青い箱が次の要素になります。
//sliderjump(-1);

function animationMain(currentElement,nextElement,animationType){
    // extraに今の要素を入れます。extraはスライドのエフェクトなので消滅する今の要素を入れます。
    extra.innerHTML = "";
    extra.append(currentElement);
    // mainに次の要素を入れます。
    main.innerHTML = "";
    main.append(nextElement);
    // mainが出てくるようにexpandのanimationをつけます。
    main.classList.add("expand-animation");
    extra.classList.add("deplete-animation");

    if(animationType === "right"){
        sliderShow.innerHTML = "";
        // 次のmainを後に入れます。
        // extraが消えて、mainが登場するアニメーション
        sliderShow.append(extra);
        sliderShow.append(main);
    }
    else if(animationType === "left"){
        sliderShow.innerHTML = "";
        // extraと反対側にアニメーションするmainを先に持ってきます。
        sliderShow.append(main);
        sliderShow.append(extra);
    }
}

//animationMain(sliderItems[0],sliderItems[1],"right");
//animationMain(sliderItems[0], sliderItems[4], "left");

leftBtn.addEventListener("click",function(){
    sliderjump(1,"left");
});
rightBtn.addEventListener("click",function(){
    sliderjump(-1,"right");
});
