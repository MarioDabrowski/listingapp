var listing;

//
$.getJSON("assets/json/listing.json", function(data) {
	listing = data;

	$.each(data.sections, function(key, val) {
		$('ul').append('<li>' + val.section + '</li>');
	});
});

//
$('button').on('click', function() {

	if ($('.section').val()) {
		listing.sections.push({
			"section": $('.section').val()
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
				$(".info").html('Data has been saved. <a href="#" onclick="location.reload(true); return false;">Refresh the page</a> to see the results.');
			},
			error: function(json_object) {
				console.log(json_object);
				$(".info").html("Failed to save data !");
			}
		});
	} else {
		alert('Please fill out all fields');
	}

});