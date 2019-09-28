var changeDtoTH=document.querySelector(".d_to_th");
var changeHattertoAdder=document.querySelector(".hatter_to_adder");
var headerQuestions=document.querySelector(".header-questions")
var inspirationDOM=document.querySelector("#inspiration")

setTimeout(()=>{
    changeDtoTH.innerHTML="TH"
    changeHattertoAdder.innerHTML="ADDER"
    headerQuestions.innerHTML="+ - * / %"
    inspirationDOM.innerHTML="Learn Math, learn the univer$$$e and everything in it..."
},3000)


var timerDOM=document.querySelector(".timer")
var questionTotalDOM=document.querySelector(".questions-total")
var correctDOM=document.querySelector(".correct")
var gradeDOM=document.querySelector(".grade")
var scoreDOM=document.querySelector(".score")
var numberOneDOM=document.querySelector(".number-one")
var operatorDOM=document.querySelector(".operator")
var numberTwoDOM=document.querySelector(".number-two")

var correct=0;
var total=0;
var grade_percent=0
var score=0;

var operators=["+","-","*"]
var numberone=0;
var numbertwo=0;
var op=""
var answer=0;
var correctanswer=0;
var timer=60;
var isRunning=false;
var timerInterval=""



function refresh(){

    document.querySelector(".gameovermessage").innerHTML=""
    document.querySelector(".giphy-output").innerHTML=""

    correct=0;
    total=0;
    grade_percent=0
    score=0;
    timer=60;
    isRunning=false;

    questionTotalDOM.innerHTML=total
    correctDOM.innerHTML=correct
    gradeDOM.innerHTML=grade_percent
    scoreDOM.innerHTML=score
}


refresh()


function generate_question(){
     op=operators[operators.length * Math.random() | 0];

    switch(op){

        case "+":
        numberone=26 * Math.random() | 0
        numbertwo=26 * Math.random() | 0
        numberOneDOM.innerHTML=numberone;
        numberTwoDOM.innerHTML=numbertwo;
        operatorDOM.innerHTML=op;
        correctanswer=parseInt(numberone) + parseInt(numbertwo)
        break;

        case "*":
        numberone=11 * Math.random() | 0
        numbertwo=11 * Math.random() | 0
        numberOneDOM.innerHTML=numberone;
        numberTwoDOM.innerHTML=numbertwo;
        operatorDOM.innerHTML=op;
        correctanswer=parseInt(numberone) * parseInt(numbertwo)
        break;

        case "-":
        numberone=31 * Math.random() | 0
        numbertwo=numberone * Math.random() | 0
        numberOneDOM.innerHTML=numberone;
        numberTwoDOM.innerHTML=numbertwo;
        operatorDOM.innerHTML=op;
        correctanswer=parseInt(numberone) - parseInt(numbertwo)
        break;


    }

}


var answerBtn=document.querySelector(".answer-btn");


answerBtn.onclick=checkAnswer;
generate_question()

function checkAnswer(e){

    switch(e.target.textContent){

        case "Start":
        refresh()
        generate_question()
        e.target.textContent="Answer"
        count()
        break;


        case "Answer":
            total++
            answer=parseInt(document.querySelector("#answer").value)

            console.log(answer)
            console.log(correctanswer)

            if(answer === correctanswer){
                    score+=100;
                    correct++;
                    document.querySelector("#answer").value=""
                    generate_question()
                                        }
            else{
                    document.querySelector("#answer").value=""
                    console.log(":(  Try again!")
                    }

            grade_percent=(correct/total).toFixed(2) * 100;
            updateDOM()
            break;

            default:
            console.log("Uknown caseType.")
}
}


function updateDOM(){
    questionTotalDOM.innerHTML=total
    correctDOM.innerHTML=correct
    gradeDOM.innerHTML=grade_percent + "%"
    scoreDOM.innerHTML=score
}



function runTimer(){
    timerDOM.innerHTML=timer;
    timer--;

    if(timer === 0){
        clearInterval(timerInterval)
        document.querySelector(".gameovermessage").innerHTML=`Congrats, you got ${correct} right out of ${total} questions, giving your a grade of ${grade_percent}%.`
        answerBtn.textContent="Start"
        getgiphy()
    }
}


function count(){
    if(!isRunning){
    timerInterval=setInterval(runTimer,1000)
    isRunning=true;
    }
}


function getgiphy(){
    var apikey="6gRm9WZ0hk8YcvjvVS4tX2HAAnV5WmgE"
    var url=`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=billy+madison`

    var xhr=new XMLHttpRequest();

    xhr.open("GET",url,true);

    xhr.onreadystatechange=function(){
        if(xhr.status === 200 && xhr.readyState === 4){
          //  console.log(this.responseText)
            var res=JSON.parse(this.responseText);
            console.log(res.data)
            document.querySelector(".giphy-output").innerHTML=`<img src=${res.data[res.data.length * Math.random() | 0].images.fixed_height.url} alt=billy_madison>`
        }
    }

    xhr.send()
}


