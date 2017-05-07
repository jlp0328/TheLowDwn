

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
});



//findDaterButton will id of button to search for dater on Okcupid
$(document).on("click", ".findDater", function(e) {

	e.preventDefault();

	var daterName = $("#writeReviewSearch").val().trim();
	console.log("input: " + daterName);
	//need to see if we will have a data-id
	var thisId = $(this).attr("data-id");

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
		var html = "<h3 class='card-title' id='daterName'>" + data.username + "</h3>" +
			      "<img class='card-img-top pic' src=" + data.image + ">" +
			      "<h4 id='daterLocation'>" + data.location + "</h4>" +
			      "<h4 id='daterAge'>" + data.age + "</h4>" + "<h4>Is this who you were looking for?</h4>" + "<a class=btn btn-primary href='/myAccount/review'>" + "Yes?" + "</a>" + "<a class=btn btn-primary href='/myAccount/search'>" + "No?" + "</a>";

		$("#daterDiv").append(html);
 		});

});
