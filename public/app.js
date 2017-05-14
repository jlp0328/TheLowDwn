
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
});


$('.flip').hover(function(){
        $(this).find('.card').toggleClass('flipped');

    });


//findDaterButton will id of button to search for dater on Okcupid
$(document).on("click", ".findDater", function(e) {

	e.preventDefault();

	var daterName = $("#writeReviewSearch").val().trim();
	console.log("input: " + daterName);
	//need to see if we will have a data-id
	// var thisId = $(this).attr("data-id");

	$.ajax({
		method: "POST",
		url: "/dateScrape",
		data: {
			username: daterName
		}
	}).done(function(data) {
		//clear input field for dater
		$("#writeReviewSearch").val("");
		//empty div on frontend, need div on frontend with emptiness but a card class
		$("#daterDiv").empty();
// removed name of datername, don't think i needed it in html
		var html = "<p class='card-title' id='daterName' value=" + data.username + ">" + data.username + "</p>" +
			      "<img class='card-img-top pic' id='daterImage' value='" + data.image + "'src=" + data.image + ">" +
			      "<p id='daterLocation'>" + data.location + "</p>" +
			      "<p id='daterAge' name='userAge'>" + data.age + "</p>" + "<div class='yesOrNo' style='display:show'>" +
			      "<p class='lookingFor'>Is this who you were looking for?</p>" +
			      "<a class=btn btn-primary id='yesDater' data-id=" + data.username +">" + "Yes?" + "</a>" +
			      "<a class=btn btn-primary id='noDater' href='/myAccount/search'>" + "No?" + "</a>" + "</div>";
			      //href for clicking yes to go to questions: href='/myAccount/review'
			      // "<a class=btn btn-primary id='yesDater' href='/myAccount/review/:" + data.username + "'data-id=" + data.username +">" + "Yes?" + "</a>"
			      //"data-id=" + data.username +

		$("#daterDiv").append(html);
 		});

});

//user selecting dater to make review on use this when hit yes button
$(document).on("click", "#yesDater", function(e) {
	e.preventDefault();

	var daterName = $("#daterName").attr("value");
	console.log("ClickSubmit: " + daterName);

	var daterImage= $("#daterImage").attr("value");

	$("#inputDatername").attr("value", daterName);
	$("#inputDaterImage").attr("value", daterImage);


});
/////////////////////////
///////////////
//getting datername from input field on search for existing dater

$(document).on("click", ".findReview", function(e) {
	e.preventDefault();
	$("#reviewDiv").empty();

	var daterName = $("#readReviewSearch").val().trim();
	console.log("reviewUserNameInput: ", daterName);

	$.ajax({
		method: "POST",
		url: "/reviewing",
		data: {
			datername: daterName
		}
	}).done(function(data) {
		// console.log(data[0].datername);

		// console.log(data);

		if (data.length == 0) {
			html = "<p class='card-title'>No Reviews Submitted</p>";

		}
		//loop through the array to get the rest of info
		else {
		var datername = data[0].datername;
		var daterImage = data[0].image;
		var score=[];
		var sum;
		var html;
		var niceThings=[];

			for (var i = 0; i < data.length; i ++) {
				score.push(data[i].score);
				niceThings.push("<p>" + data[i].nicety + "</p>");

			}//end of for loop
//taking average of scores
		  sum = score.reduce(function(a, b) {
		  	return a + b;
		  })/score.length;

		  html = "<p class='card-title'>" + datername + "</p>" +
			      "<img class='card-img-top pic' src=" + daterImage + ">" +
			      "<p>Score: " + sum + "</p>" +
			      "<p>Some Nice Things said about " + datername + ": " + niceThings;

		}//end of else


		$("#reviewDiv").append(html);
		$("#readReviewSearch").val("");


	});
});

/////////////////
//////////

//click yes button and display question One
$(document).on("click", "#yesDater", function(e) {

	$(".reviewDate").show();
	$(".searchField").hide();
	$(".yesOrNo").hide();

});
//On Click Events for Questions on Review
//Q1: yes to go to show 2
$(document).on("click", "#talkYes", function(e) {
	$("#initiate").show();
});

//Q1: No to end it
$(document).on("click", "#talkNo", function(e) {
	alert("Please review someone you've actually talked to...");
	//add div maybe that when click ok it redirects to search or home page
});

//Q2: yes/no to go to 3
$(document).on("click", ".initiated", function(e) {
	$("#inPerson").show();
});

//Q3: yes to go to 4
$(document).on("click", "#metYes", function(e) {
	$("#datingTimes").show();
});

//Q3: no to end it
$(document).on("click", "#neverMet", function(e) {
	alert("Please date someone in person then review them");
});

//Q4: yes to go to 5
$(document).on("click", "#dateMultiple", function(e) {
	$("#dateNumber").show();
});

//Q4: no to go to 4A
$(document).on("click", "#dateOnce", function(e) {
	$("#datingTimes_A").show();
});

//Q4A: yes go to 6
$(document).on("click", "#dateAgain", function(e) {
	$("#attraction").show();
});

//Q4A: no go to 4B
$(document).on("click", "#dateAgainNo", function(e) {
	$("#datingTimes_B").show();
});

//Q4B: yes go to 4B_1
$(document).on("click", "#conversationYes", function(e) {
	$("#datingTimes_B_1").show();
});

//Q4B: no go to 4C
$(document).on("click", "#conversationNo", function(e) {
	$("#datingTimes_C").show();
});

//Q4B_1: yes/no go to 9
//Q4C: yes/no go to 9
$(document).on("click", ".end", function(e) {
	$("#recommendFriend").show();
});

//Q5: anything go to 6
$(document).on("click", ".q5", function(e) {
	$("#attraction").show();
});

//Q6: yes/no go to 7
$(document).on("click", ".attracted", function(e) {
	$("#physical").show();
});

//Q7: yes/no go to 8
$(document).on("click", ".intimate", function(e) {
	$("#appearance").show();
});

//Q8: yes go to 9
$(document).on("click", "#fitProfileYes", function(e) {
	$("#recommendFriend").show();
});

//Q8: no go to 8A
$(document).on("click", "#fitProfileNo", function(e) {
	$("#appearance_A").show();
});

//Q8A: once all selected go to 9
$(document).on("click", "#attributes", function(e) {
	$("#recommendFriend").show();
});

//Q9: yes/no go to nice to know one
$(document).on("click", ".recommend", function(e) {
	$("#activity").show();
});

//NTK One: all selected go to topics discussed
$(document).on("click", "#dateActivity", function(e) {
	$("#topics").show();
});

//Topics: all selected display submit button and input field for nice input
$(document).on("click", "#dateTopics", function(e) {
	$(".niceInput").show();
});



