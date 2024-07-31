import React,{useRef}from "react";
import { useState } from "react";
import "./Quiz.css";
import {data} from "../../assets/data.js";

const Quiz = () => {
    
    let initialIndex = 0;
    const [index,setIndex] = useState(initialIndex);
    const [question,setQuestion] = useState(data[index]);
    // to allow only 1 time option choosing.
    const [lock,setLockk] = useState(false);
    // to keep a track of the no. of correct ans.
    const [score, setScore] = useState(0);
    // to avoid blank screen after que. 5 and to show the result after the last que.
    // after the last que when we click on next button nothing happens but the result becomes true.
    // now using this result state we will hide everything and display the final result.
    const [result,setResult] = useState(false);

    // https://www.w3schools.com/react/react_useref.asp
    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1,Option2,Option3,Option4];

    const checkAns = (e,ans) => {
        // e is that list itself list is an option and ans is also that option (selected)
        if (lock === false){
            if (question.ans === ans){
                // if the ans is correct then to that list or to that e we add the className correct.
                e.target.classList.add("correct");
                setLockk(true);
                setScore(prev=>prev+1);
            }
            else{
                e.target.classList.add("wrong");
                setLockk(true);
                // if the chosen option is wrong then we have to highlight the correct option.
                // question.ans starts from 1 but the index starts from 0.
                // below means jo correct option h uske class m add kardo correct word fir uspe 
                // css apply kar denge jisse wo highlight ho jaye.
                // Suppose option1 is correct then Option1.current.classList.add
                // Option1 is a reference so we link the refs with the li tags
                option_array[question.ans-1].current.classList.add("correct");
            }
        } 
    }
     
    // next button so first we have to create the functionality 
    // that if we have not clicked on any option this next button 
    // will be disabled and as we will click on any option this 
    // next button will become clickable.
    const next = () => {
             
        if(lock === true){
            
            // if this was the last que.
            if(index === data.length-1){
                setResult(true);
                // we return 0 to avoid any further execution of code.
                return 0;
            }
           setIndex(index => index+1);
           setQuestion(data[index]);
           setLockk(false);
        //    previous selection is displaying in the next question also.
        // to remove this we iterate over the api using map fn and then the find the option
        // in which we added the class names correct and wrong and remove them
           option_array.map((option) => {
               
            option.current.classList.remove("wrong");
            option.current.classList.remove("correct");
            return null;

           })
        }
    }
    
    // when we click reset button then again we go to no. 1 question.
    const reset = () => {

        setIndex(0);
        setQuestion(data[index]);
        setLockk(false);
        setResult(false);
        setScore(0);
    }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      
      {/* if the result is true means we have reached the last question then we show the result and if false it means we are not \
      at the end so we display as it is next question. */}
      {result ? 
    <> 
    <h2>You scored {score} out of {data.length}</h2>
    <button onClick = {reset} >Reset</button>
    </> 
    : 
    <>
    <h2>{index+1}. {question.question}</h2>
      <ul>
 
        {/* e is the event and contains the list itself. */}
        {/* reference have been linked with li tags. */}
        <li ref = {Option1} onClick = {(e) => {checkAns(e,1)}}>{question.option1}</li>
        <li ref = {Option2} onClick = {(e) => {checkAns(e,2)}}>{question.option2}</li>
        <li ref = {Option3} onClick = {(e) => {checkAns(e,3)}}>{question.option3}</li>
        <li ref = {Option4} onClick = {(e) => {checkAns(e,4)}}>{question.option4}</li>
      </ul>
      <button onClick = {next}> Next</button>
      <div className="index">{index+1} of {data.length} questions</div>
      </>}
   
    </div>
  );
};

export default Quiz;
