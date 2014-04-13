var listing;

// Get everything after the dash
function afterDash(str) {
	return str.split('-')[1];
}

// Update the listing.json file
function udateJSON() {
	$.ajax({
		url: 'assets/php/save.php',
		data: {
			data: listing
		},
		dataType: 'json',
		type: 'POST',
		success: function() {
			$('.info').html('Data has been saved. <a href="#" onclick="location.reload(true); return false;">Refresh the page</a> to see the results.');
		},
		error: function() {
			$('.info').html('Failed to save data !');
		}
	});
}

// Initial fetch of json data
$.getJSON('assets/json/listing.json', function(data) {
	listing = data;

	$.each(data.sections, function(key, val) {
		$('ul').append('<li><a href="#" class="remove-item" id="section-' + key + '">[X]</a> ' + val.section + '</li>');
	});
});

// Remove Items
$('ul').on('click', '.remove-item', function() {
	var itemID = afterDash($(this).attr('id'));
	listing.sections.splice(itemID, 1);
	udateJSON();
});

//
$('button').on('click', function() {

	if ($('.section').val()) {
		listing.sections.push({
			section: $('.section').val()
		});

		udateJSON();

	} else {
		alert('Please fill out all fields');
	}

});