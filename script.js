let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let count=0;

//players
let turnO=true;
//create 2d array
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
//conditions
const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};
const showDraw=()=>{
    msg.innerText="MATCH DRAW!!";
    msgContainer.classList.remove("hide");
    disableBoxes();

};
//main loop
boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        console.log("Box was clicked");
        if(turnO)//playerO's turn 
        {
            box.innerText="O";
            turnO=false;
        }
        else{ //playerX's turn
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        count++;
        checkWinner();
    });
});

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner=()=>{
    let isWinner=false;
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
                isWinner=true;
                return;
            }
            
        }
    }
    //draw condition
    if(count===9 && !isWinner){
        showDraw();
    }

};
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame); 