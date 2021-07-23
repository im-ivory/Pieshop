const pieBox = document.getElementById("jsPieBox"); //위에 파이 박스
let pies = document.getElementById("jsPieBox").getElementsByTagName("li"); //파이박스 안에 든 파이들
const addBtn = document.querySelectorAll("#jsAdd"); // 파이리스트 속 "추가하기" 버튼
const pieList = document.getElementById("jsPieList"); // 나중에 뜨는 파이리스트
const removeBtn = document.querySelectorAll(".removeBtn");
const ROTATE_DEGREE = 51.5;
let newPies = Array.from(pies); // 파이박스 속 파이리스트를 array로 만든 것. [li,li,li,li,li]


function showPie(){
    for (let i = 0; i <7; i++){
        newPies[i].style.transformOrigin= "50% 0"; // 회전축 지정
        newPies[i].style.transform = `rotate(${ROTATE_DEGREE*i}deg)`; //회전축을 기준으로 돌 각도(하나씩 두배가 되게)
    };
};

showPie(); // 맨 처음 파이가 기본값으로 보이게 됨


function deletePie(event){ // removeBtn을 눌렀을 때 실행될 파이그림 삭제 기능
    const li = event.target.parentElement; //누른 버튼의 부모 li
    const liContent = event.target.parentElement.childNodes;//부모 li의 자식들= img와 removeBtn
    for (var i = 0; i < newPies.length; i++) { //removeBtn을 돌아가며 확인
        if (newPies[i] === li) { //파이박스의 파이 순서와 누른 버튼의 부모 파이가 같은지 확인하는 것
            li.removeChild(li.childNodes[1]); // 같다면, li의 첫번째 자식인 파이 그림을 지운다
            li.classList.add("empty"); // li에 class="empty" 추가
            event.target.innerText="+"; //눌린 버튼의 텍스트를 +로 바꿈
            event.target.classList.replace( "removeBtn", "openBtn"); //class를 openBtn으로 바꿈
        }
    };

    const openBtn = document.querySelectorAll(".openBtn"); //openBtn으로 바뀐 버튼
    openBtn.forEach(btn => btn.addEventListener("click", openPieList, { once : true})); //openBtn 누르면 openPieList 함수 한번만 실행

    function openPieList(event){
        pieList.style.visibility="visible"; //openBtn 누르면 pielist가 보임
    };
   

    
}


 //파이리스트 속 "추가하기" 버튼 누르면 addPie 함수 실행
addBtn.forEach(btn => btn.addEventListener("click", addPie));

    function addPie(event){
        const pie = event.target.parentElement.childNodes[1]; //추가하기 버튼 부모 li의 2번째 자식->이미지
        const emptyLi = document.querySelector(".empty");//빈 li 찾기
        const openBtn = document.querySelectorAll(".openBtn");
        const newPie = pie.cloneNode(); 
        emptyLi.insertBefore(newPie, emptyLi.firstChild);
        emptyLi.classList.remove("empty");
        openBtn[0].classList.replace( "openBtn", "removeBtn");
        pieList.style.visibility="hidden";
        const removeBtn = document.querySelectorAll(".removeBtn");
removeBtn.innerText = "X";
    };



removeBtn.forEach(pie => pie.addEventListener("click", deletePie, { once : true}));

