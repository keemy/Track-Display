
function getMeets(){
	var promise = $.ajax("getMeets.py").done(function(data){
		// to stuff to show meets 
		data=$.parseJSON(data);
		for(var i=0; i<data.length;i++){
			var meet=data[i];
			var option= "<option value='"+meet+"'>"+meet+"</option>";
			$(".form#Meet").append(option);
		}
	});
	return promise
}


var eventDict={
	A:"Dash",
	B:"Run",
	E:"Hurdles",
	W:"Relay",
	M:"Long Jump",
	K:"High Jump",
	N:"Triple Jump",
	R:"Shot Put",
	L:"Pole Vault"
};

function getEvents(meet){
	var promise=$.ajax({
		type: "GET",
		data: {meetName: meet},
		url: "getEvents.py"
		}).done(function(data){
			data=$.parseJSON(data);
			for(var i=0; i<data.length;i++){
				var event=data[i];
				//event = Event_ptr, Event_no, Event_dist, Event_stroke, event_note, Event_sex, Div_no, Div_name
				
				var sex= event[5]=="M" ? "Boys" : "Girls";
				var distance=event[2]>0?(event[2].toString()+" M"):"";
				var type=eventDict[event[3]];
				var note=$.trim(event[4]);
				var division=event[7];

				var temp=[sex,distance,type,note,division];
				temp.filter(function(elm){return elm!="";});
				
				var eventName=temp.join(" ");
				var option= "<option value="+event[0]+">"+eventName+"</option>";
				$(".form#Events").append(option);
			}
		
		
		});
	return promise;

}

function getPeople(meet){
	var promise=$.ajax({
		type: "GET",
		data: {meetName: meet},
		url: "getPeople.py"
		}).done(function(data){
			data=$.parseJSON(data);
			for(var i=0; i<data.length;i++){
				var person=data[i];
				//person = [person ID, First Name, Last Name]
				var option= "<option value="+person[0]+">"+person[1]+" "+person[2]+"</option>";
				$(".form#People").append(option);
			}
		
		});
	return promise;
}

function getResults(meet,eop,datum){
//gets the results of a particular event/person
	$.ajax({
		type: "GET",
		url: "getResults.py",
		data:{
			meetName: meet,
			eventOrPerson: eop,
			event: datum,
			person: datum
		}
		}).done(function(data){
			data=$.parseJSON(data);
			
			if(eop=="p"){
				for(var i=0; i<data.length;i++){
					var entry=data[i];
					// entry = Fin_place, First_name, Last_name, Schl_yr, Team_name, Fin_time, 
					//        Fin_wind, Fin_heat, Event_dist, Event_stroke, event_note, Event_sex
					
					var place="<td>"+entry[0]+"</td>";
					var name="<td>"+entry[1]+" "+entry[2]+"</td>";
					var year="<td>"+entry[3]+"</td>";
					var team="<td>"+entry[4]+"</td>";
					var time="<td>"+entry[5]+"</td>";
					
					
					
					
					var out= "<tr>"+place+name+year+team+time+"</tr>";
					
					$("#dataNow").append(out)
				}
			}		
				
		
		});
		
}



$( document ).ready(function() {
	var promise = getMeets();
	promise.done(function(){
		$(".form#Meet").change(function(){
			var meetName=$(".form#Meet :selected").val()
			if(meetName!=""){
				getEvents(meetName);
				getPeople(meetName);
			}
		})
	
	});
	
	
	$(".form#People").change(function(){
		var meetName=$(".form#Meet :selected").val();
		var personId=$(".form#People :selected").val();
		
		getResults(meetName,"p",personId);
	
	
	
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
