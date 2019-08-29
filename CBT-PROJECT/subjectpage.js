var subjectSelect = document.getElementById("formPos2"),
startTest =  document.getElementById("proceed"),
errorDisplay = document.getElementById("showError"),
newArray = new Array();



startTest.onclick = function(){
	
	inputSelection = subjectSelect.getElementsByTagName("input");
	
	 
	 for(var i = 0 ; i < inputSelection.length ; i++){
		 shuffleInput = inputSelection[i];
		
		if (shuffleInput.checked == true){
			newArray.push(shuffleInput.id);
            
		}
         
	 }
	 
	var jar = {
	  sub1 :newArray[0],
	  sub2 : newArray[1]
	  
};

sessionStorage.setItem('sub1',jar.sub1);
sessionStorage.setItem('sub2',jar.sub2);

if (newArray.length == 2){
	location.href = "maths/exam.html" ;
}

else{
	errorDisplay.innerHTML = "you can only select 2 more subjects" ;
}


newArray.length = 0;
	 
}