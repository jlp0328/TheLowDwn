//findDaterButton will id of button to search for dater on Okcupid
$(document).on("click", "#findDaterButton"), function(e) {
	e.preventDefault();
	var daterName = $(this).text(".searchDater");
	//need to see if we will have a data-id
	var thisId = $(this).attr("data-id");

	$.ajax({
		method: "POST",
		url: "/dateScrape" + thisId,
		data: {
			username: daterName
		}
	}).done(function(data) {
		//clear input field for dater
		// $(".searchDater").empty();
	});

});
