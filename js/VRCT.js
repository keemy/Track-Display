

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
	var promise = $.ajax("getMeets.py").done(function(data){
		// to stuff to show meets 
		data=$.parseJSON(data);
		for(var i=0; i<data.length;i++){
			var meet=data[i];
			var option= "<option value='"+meet+"'>"+meet+"</option>";
			$(".form#Meet").append(option);
		}
	})
	return promise
}


function getEvents(meet){
	$.ajax({
		type: "GET",
		data: {event: race},
		url: "eventManager.py"
		}).done(function(data){
			// add logic to display 
		
		
		})


}

function getPeople(meet){
	$.ajax({
		type: "GET",
		data: {event: race},
		url: "eventManager.py"
		}).done(function(data){
			// add logic to display 
		
		
		})

}





$( document ).ready(function() {
	var promise = getMeets();
	promise.done(function(){
		$(".form#Meet").change(function(){
			var meetName=$(".form#Meet :selected").val()
			if(meetName!=""){
				getEvents(meetName);
				getPeople(meedName);
			}
		})
	
	});
	
	
	
	
	
	// $("#Event").change(function(){
		// if($("#Event :selected").val() =="all"){
			// $(".heat").css('display','block');
		// }else{
			// $(".heat").css('display','none');
			// $(".heat#"+$("#Event :selected").val()).css('display','block')
		// }
	// });










});
