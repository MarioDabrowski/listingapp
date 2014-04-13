var listing;

//
$.getJSON("assets/json/listing.json", function(data) {
	listing = data;

	$.each(data.users, function(key, val) {
		$('.dbUL').append('<li>' + val.firstName + ' ' + val.lastName + '</li>');
	});
});

//
$('.myButton').on('click', function() {

	if ($('.firstName').val() && $('.firstName').val()) {
		listing.users.push({
			"firstName": $('.firstName').val(),
			"lastName": $('.lastName').val()
		});

		$.ajax({
			url: "assets/php/save.php",
			data: {
				data: listing
			},
			dataType: 'json',
			type: 'POST',
			success: function(json_object) {
				console.log(json_object);
				$("#saved").text("Data has been saved.");
			},
			error: function(json_object) {
				console.log(json_object);
				$("#saved").text("Failed to save data !");
			}
		});
	} else {
		alert('shits empty yo');
	}

});