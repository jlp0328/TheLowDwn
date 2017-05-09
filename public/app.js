
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
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
		//potentially remove href from yes button in order to carry username throughout
		var html = "<h3 class='card-title' id='daterName'>" + data.username + "</h3>" +
			      "<img class='card-img-top pic' src=" + data.image + ">" +
			      "<h4 id='daterLocation'>" + data.location + "</h4>" +
			      "<h4 id='daterAge'>" + data.age + "</h4>" + "<div class='yesOrNo' style='display:show'>" +
			      "<h4>Is this who you were looking for?</h4>" +
			      "<a class=btn btn-primary id='yesDater' data-id=" + data.username +">" + "Yes?" + "</a>" +
			      "<a class=btn btn-primary href='/myAccount/search'>" + "No?" + "</a>" + "</div>";
			      //href for clicking yes to go to questions: href='/myAccount/review'
			      // "<a class=btn btn-primary id='yesDater' href='/myAccount/review/:" + data.username + "'data-id=" + data.username +">" + "Yes?" + "</a>"
			      //"data-id=" + data.username +

		$("#daterDiv").append(html);
 		});

});

//user selecting dater to make review on use this when hit submit
// $(document).on("click", "#yesDater", function(e) {
// 	e.preventDefault();

// 	var daterName = $(this).attr("data-id");
// 	console.log("ClickYes: " + daterName);
// 	$.ajax({
// 		method: "POST",
// 		url: "/review",
// 		data: {
// 			username: daterName
// 		}
// 	})
// 	.done(function(data) {
// 		console.log(data);
// 	});
// });
/////////////////////////
///////////////
//on click for searching for user to read reviews

// $(document).on("click", ".findReview", function(e) {
// 	e.preventDefault();

// 	var daterName = ("#readReviewSearch").val().trim();

// 	$.ajax({
// 		method: "POST",
// 		url: "/read",
// 		data: {
// 			username: daterName
// 		}
// 	}).done(function(data) {
// 		$("#readReviewSearch").val("");
// 		//do some stuff with the data maybe or see if handlebars can take care of it to render existing reviews
// 	});
// });
/////////////////
//////////

//click yes button and display questions
$(document).on("click", "#yesDater", function(e) {

	$(".reviewDate").show();
	$(".searchField").hide();
	$(".yesOrNo").hide();

});


//click on the never met checkbox and displays question of who initiated convo
$(document).on("click", "#neverMet", function(e) {
	$("#secondQuestion").toggle();
});




