

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
