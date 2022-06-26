var playing = false;
var score;
var trialsleft;
var fruits = ['mango','banana','cherry','grapes','peach','pear','pineapple','watermelon'];
var step;
var action;

$(function(){
	$("#startreset").click(function(){
		
		//we are playing
		if(playing == true){
			
			//reload page
			location.reload();
		}else{
			
			//we are not playing
			playing=true; // game initiated
			
			//set score to 0
			score =0;
			$("#scorevalue").html(score);
			
			//show trials left
			$("#trialsleft").show();
			
			trialsleft=3;
		    addHearts();
			
			//hide gameover box
			
			$("#gameover").hide();
			
			// change button text to reset game
			
			$("#startreset").html("Reset Game");
			
			//start sending fruits
			
			startAction();
			
				
				
			
			
		}
		
	});
	

//slice a fruit 
	//play sound
	//explode fruit 
$("#fruit1").mouseover(function(){ 
	score++;
	$("#scorevalue").html(score); //update
	
	/*document.getElementById("slicesound").play();*/
	$("#slicesound")[0].play(); // play sound
	
	//stop fruit
	clearInterval(action);
	
	//hide fruit with animation
	$("#fruit1").hide("explode",500); //slice fruit	
	
	//send new fruit
	setTimeout(startAction, 500);
});			
			



function addHearts(){
		$("#trialsleft").empty();
		for(i =0; i<trialsleft; i++){
				$("#trialsleft").append('<img src="images/heart.png" class="life">');
			}
}

//start sending fruits

function startAction(){
	
	//generate a fruit
	$("#fruit1").show();
	chooseFruit(); //choose a random fruit
	
	$("#fruit1").css({
			'left': Math.round(550*Math.random()), 'top': -50});
				// random position
				
				// generate a random step
				step = 1+Math.round(5*Math.random()); // changing step
				
				
				action = setInterval(function(){
					
					// move fruit down every step by 10 ms
							$("#fruit1").css('top',$("#fruit1").position().top + step);
							
							//check if the fruit too low
							if($("#fruit1").position().top > $("#fruitsContainer").height()){
								
								//check if we have any trials left
								if(trialsleft > 1){
									//generate a fruit
										$("#fruit1").show();
										chooseFruit(); //choose a random fruit
	
										$("#fruit1").css({
										'left': Math.round(550*Math.random()), 'top': -50});
										// random position
				
										// generate a random step
										step = 1+Math.round(5*Math.random());
										
										//reduce trials by one 
										trialsleft--;
										
										//reduce hearts
										
										addHearts();
										
										
								}else{
									//gameover
									playing = false;
									$("#startreset").html("Start Game"); // change button to start 
									$("#gameover").show();
									$("#gameover").html('<p>Game Over!</p><p>Your Score is '+score+'</p>');
									$("#trialsleft").hide();
									stopAction();
									
								}
							}
							
							}, 10);
}

// generate a random fruit

function chooseFruit(){
	$("#fruit1").attr('src','images/'+ fruits[Math.floor(8*Math.random())] + '.png');
}

//stop game
function stopAction(){
	clearInterval(action);
	$("#fruit1").hide();
}

});