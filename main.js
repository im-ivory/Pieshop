const images = ["apple", "blueberry","strawberry","pumpkin","greengrape","apple","cheese",];

const pieBox = document.getElementById("jsPieBox"); //위에 파이 박스
const addBtn = Array.from(document.querySelectorAll("#jsAdd")); // 파이리스트 속 "추가하기" 버튼
const pieList = document.getElementById("jsPieList"); // 나중에 뜨는 파이리스트 ul
const ROTATE_DEGREE = 51.5;
const pies = Array.from(document.querySelectorAll(".pielist li"));
const totalPrice = document.getElementById("totalPrice");

function showPie(){
    let sum = 0;
    for (let i = 0; i <7; i++){
        const li = document.createElement("li");
        pieBox.appendChild(li);
        const randomPies = images[Math.floor(Math.random() * images.length)];
        const newImage = document.createElement("img");
        newImage.src = `img/${randomPies}.png`;
        newImage.classList.add(randomPies);
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        deleteBtn.classList.add("deleteBtn");
        
        li.appendChild(newImage);
        li.appendChild(deleteBtn);
        li.style.transformOrigin= "50% 0"; // 회전축 지정
        li.style.transform = `rotate(${ROTATE_DEGREE*i}deg)`; //회전축을 기준으로 돌 각도(하나씩 두배가 되게)

        const samePies = Array.from(document.querySelectorAll(`.${randomPies}`));
        const priceParent = samePies[samePies.length-1].parentNode;
        const prices = parseInt(priceParent.querySelector("#price").innerHTML);

        sum = sum + prices;
        totalPrice.innerText  = `${sum}`;
    };
};

showPie(); // 맨 처음 파이가 기본값으로 보이게 됨


let deleteBtns = Array.from(document.querySelectorAll(".deleteBtn"));
let sum = parseInt(document.getElementById("totalPrice").innerText);
console.log(typeof sum);

function deletePie(event){ // removeBtn을 눌렀을 때 실행될 파이그림 삭제 기능
    const li = event.target.parentElement; //누른 버튼의 부모 li
    const liContent = event.target.parentElement.childNodes;//부모 li의 자식들= img와 removeBtn
    const liClass = li.childNodes[0].classList.value;
    const samePies = Array.from(document.querySelectorAll(`.${liClass}`));
    const priceParent = samePies[samePies.length-1].parentNode;
    const price = parseInt(priceParent.querySelector("#price").innerHTML);
    sum = sum - price;
    totalPrice.innerText  = `${sum}`;

    li.removeChild(li.childNodes[0]);
    li.classList.add("empty"); // li에 class="empty" 추가
    event.target.innerText="+"; //눌린 버튼의 텍스트를 +로 바꿈
    event.target.classList.replace( "deleteBtn", "openBtn");
    pieList.style.visibility="visible"; //openBtn 누르면 pielist가 보임

    const preventClick = deleteBtns.filter(button => button != event.target);
    preventClick.forEach(btn => btn.setAttribute("disabled",""));
}

deleteBtns.forEach(pie => pie.addEventListener("click", deletePie));

 //파이리스트 속 "추가하기" 버튼 누르면 addPie 함수 실행
addBtn.forEach(btn => btn.addEventListener("click", addPie));

    function addPie(event){
        const pie = event.target.parentElement.childNodes[1]; //추가하기 버튼 부모 li의 2번째 자식->이미지
        const emptyLi = document.querySelector(".empty");//빈 li 찾기
        const openBtn = deleteBtns.filter(item => item.className == "openBtn" );
        const newPie = pie.cloneNode(); 
        emptyLi.insertBefore(newPie, emptyLi.childNodes[0]);
        emptyLi.classList.remove("empty");
        openBtn[0].innerText ="X";
        openBtn[0].classList.replace( "openBtn", "deleteBtn");
        pieList.style.visibility="hidden";
        
        const preventClick = deleteBtns.filter(button => button != event.target);
        preventClick.forEach(btn => btn.removeAttribute("disabled",""));

        const priceParent = event.target.parentElement;
        const price = parseInt(priceParent.querySelector("#price").innerHTML);
        sum = sum + price;
        totalPrice.innerText  = `${sum}`;
    };





