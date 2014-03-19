

function getResults(race){
//gets the results of a paricular event
	$.ajax({
		type: "GET",
		data: {event: race},
		url: "eventManager.py"
		}).done(function(data){
			// add logic to display 
		
		
		})
		
}


function getMeets(){
	$.ajax("getMeets.py").done(function(data){
			// to stuff to show meets 
			data=$.parseJSON(data);
			for(var i=0; i<data.length;i++){
				var meet=data[i];
				var option= "<option value='"+meet+"'>"+meet+"</option>"
				$(".form #Meet").append(option)
			}
		})


}


function getEvents(){
	$.ajax({
		type: "GET",
		data: {event: race},
		url: "eventManager.py"
		}).done(function(data){
			// add logic to display 
		
		
		})


}

function getPeople(){
	$.ajax({
		type: "GET",
		data: {event: race},
		url: "eventManager.py"
		}).done(function(data){
			// add logic to display 
		
		
		})

}





$( document ).ready(function() {
	
	
	$("#Event").change(function(){
		if($("#Event :selected").val() =="all"){
			$(".heat").css('display','block');
		}else{
			$(".heat").css('display','none');
			$(".heat#"+$("#Event :selected").val()).css('display','block')
		}
	});










});
