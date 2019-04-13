var myInput = document.getElementById("passwordFirst");
var confirmMyInput = document.getElementById("passwordConfirm");
var button = document.getElementById('my_submit_button');


confirmMyInput.onkeyup = function(){
	console.log("method called");
	console.log(myInput)
	var passEqualsConfPass = (myInput.value===confirmMyInput.value);  
    if(passEqualsConfPass) { 
        button.disabled = false;
    } else {
        button.disabled = true;
    }        
      
}    

