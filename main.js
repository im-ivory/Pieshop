const images = ["apple", "grapefruit", "blueberry","strawberry","pumpkin","greengrape","apple","cheese","walnut"];

const pieBox = document.getElementById("jsPieBox"); //파이 한판 박스
const addBtn = Array.from(document.querySelectorAll("#jsAdd")); // 파이리스트 속 "추가하기" 버튼
const pieList = document.getElementById("jsPieList"); // 나중에 뜨는 파이리스트 ul
const pies = Array.from(document.querySelectorAll(".pielist li")); // 파이리스트 속 파이들 li 목록
const totalPrice = document.getElementById("totalPrice"); // 총 가격 출력될 곳
const ROTATE_DEGREE = 51.5;

function showPie(){
    let sum = 0; // 총 가격 = 0으로 비워두기
    for (let i = 0; i <7; i++){
        const li = document.createElement("li");
        pieBox.appendChild(li);
        const randomPies = images[Math.floor(Math.random() * images.length)]; //랜덤한 이미지값 가져오기
        const newImage = document.createElement("img"); //img 앨리먼트 생성
        newImage.src = `img/${randomPies}.png`; // <img src="img/random.png">
        newImage.classList.add(randomPies); //해당 이미지값을 class에도 추가 <img src="img/random.png" class="random">

        const deleteBtn = document.createElement("button"); //제거버튼생성
        deleteBtn.innerText = "X"; //버튼 내용 X
        deleteBtn.classList.add("deleteBtn"); // 버튼에 class값 추가
        
        li.appendChild(newImage);
        li.appendChild(deleteBtn);
        li.style.transformOrigin= "50% 0"; // 회전축 지정
        li.style.transform = `rotate(${ROTATE_DEGREE*i}deg)`; //회전축을 기준으로 돌 각도(하나씩 두배가 되게)

        const samePies = Array.from(document.querySelectorAll(`.${randomPies}`)); //파이 이름 class를 가진 모든 img 찾기
        const priceParent = samePies[samePies.length-1].parentNode; //그 이미지 중 마지막 이미지의 부모(li) 찾기 = pielist 속 li
        const prices = parseInt(priceParent.querySelector("#price").innerHTML); //li 요소 중 price 값 알아내고 숫자로 변환

        sum = sum + prices; // 총가격 = 파이 가격들 하나씩 더해준 값
        totalPrice.innerText  = `${sum}`; // html totalprice에 값 출력하기
    };
};

showPie(); // 맨 처음 파이 한판이 랜덤으로 출력 + 총 가격값도 같이 출력


let deleteBtns = Array.from(document.querySelectorAll(".deleteBtn")); //제거 버튼 목록을 deleteBtns에 배열로 저장
let sum = parseInt(document.getElementById("totalPrice").innerText); // 총가격 값을 number로 sum에 저장


function deletePie(event){ // deleteBtn을 눌렀을 때 실행될 파이그림 삭제 기능
    const li = event.target.parentElement; //누른 버튼의 부모 li
   
    const liClass = li.childNodes[0].classList.value; //부모 li 자식 중 img의 class값
    const samePies = Array.from(document.querySelectorAll(`.${liClass}`)); // class가 같은 img들을 찾기
    const priceParent = samePies[samePies.length-1].parentNode; // img들 중 마지막것의 부모(=pielist의 li)
    const price = parseInt(priceParent.querySelector("#price").innerHTML); //pielist li에 있는 가격값
    sum = sum - price; // 총가격에서 눌린 파이값 빼기
    totalPrice.innerText  = `${sum}`;

    li.removeChild(li.childNodes[0]); // 현재 li에서 img 제거하기
    li.classList.add("empty"); // li에 class="empty" 추가
    event.target.innerText="+"; //눌린 버튼의 텍스트를 +로 바꿈
    event.target.classList.replace( "deleteBtn", "openBtn"); //눌린 버튼의 class 이름 변경
    pieList.style.visibility="visible"; // pielist가 보임


    const preventClick = deleteBtns.filter(button => button != event.target);
    preventClick.forEach(btn => btn.setAttribute("disabled","")); //버튼이 눌린 상태면 다른 버튼은 눌리지 않게 함
}

// X 버튼을 누르면 deletePie 함수 호출
deleteBtns.forEach(pie => pie.addEventListener("click", deletePie));

 //파이리스트 속 "추가하기" 버튼 누르면 addPie 함수 호출
addBtn.forEach(btn => btn.addEventListener("click", addPie));

function addPie(event){
    const pie = event.target.parentElement.childNodes[1]; //추가하기 버튼 부모 li의 2번째 자식->이미지
    const emptyLi = document.querySelector(".empty");//빈 li 찾기
    const openBtn = deleteBtns.filter(item => item.className == "openBtn" ); // openBtn 찾기
    const newPie = pie.cloneNode(); // 추가하기 누른 파이 그림을 복사
    emptyLi.insertBefore(newPie, emptyLi.childNodes[0]); //piebox 속 빈 li에 첫번째 자식으로 파이 그림 붙여넣기
    emptyLi.classList.remove("empty"); // 그림이 채워진 li에 empty class 삭제하기
    openBtn[0].innerText ="X"; //
    openBtn[0].classList.replace( "openBtn", "deleteBtn");
    pieList.style.visibility="hidden";
    
    const preventClick = deleteBtns.filter(button => button != event.target);
    preventClick.forEach(btn => btn.removeAttribute("disabled",""));

    const priceParent = event.target.parentElement;
    const price = parseInt(priceParent.querySelector("#price").innerHTML);
    sum = sum + price;
    totalPrice.innerText  = `${sum}`;
};





