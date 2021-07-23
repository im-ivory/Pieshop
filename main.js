const pies = document.getElementById("jsPieBox").getElementsByTagName("li");

console.log(pies);

let ROTATE_DEGREE = 51.5;

const newPies = Array.from(pies);
console.log(newPies[1]);


for (let i = 0; i <7; i++){
    newPies[i].style.transformOrigin= "50% 0";
    newPies[i].style.transform = `rotate(${ROTATE_DEGREE*i}deg)`;
}

