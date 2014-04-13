var listing,
	currentIndex;

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

	// List out all of the sections
	$.each(data.sections, function(key, val) {

		var addItem;

		addItem = '<li>';
		addItem += '<a href="#" class="remove-item" data-name="section-' + key + '">[X]</a> ';
		addItem += val.section;
		addItem += '<ul class="sub-section-list">';

		if (listing.sections[key].subSections) {
			$.each(listing.sections[key].subSections, function(key, val) {
				addItem += '<li>';
				//addItem += '<a href="#" class="remove-item" data-name="section-' + key + '">[X]</a> ';
				addItem += val.subSection;
				addItem += '</li>';
			});
		}

		addItem += '<li><a href="#" class="add-sub-section" data-name="section-' + key + '">[+]</a></li>';
		addItem += '</ul>';
		addItem += '</li>';

		$('ul.section-list').append(addItem);
	});

});

// Add sub section button
$('ul').on('click', '.add-sub-section', function() {
	currentIndex = afterDash($(this).attr('data-name'));
	$('.input-section').val(listing.sections[currentIndex].section).prop('disabled', true);
	$('.input-sub-section').show();
	$('button[data-name="add"]').html('Add Sub Section');
	$('button[data-name="cancel"]').show();

});

// Cancel Button
$('button[data-name="cancel"]').on('click', function() {
	$('.input-section').val('').prop('disabled', false);
	$('.input-sub-section').hide();
	$('button[data-name="add"]').html('Add Section');
	$(this).hide();
});

// Remove Items
$('ul').on('click', '.remove-item', function() {
	$this = $(this);
	currentIndex = afterDash($(this).attr('data-name'));
	if ($this.closest('.section-list')) {
		listing.sections.splice(currentIndex, 1);
	} else if ($this.closest('.sub-section-list')) {
		listing.sections.splice(currentIndex, 1);
	}
	udateJSON();
});

// Add Item
$('button[data-name="add"]').on('click', function() {

	if ($('.input-section').is(':disabled')) {

		// If it's a sub section
		if ($('.input-sub-section').val()) {
			if (listing.sections[currentIndex].subSections) {
				listing.sections[currentIndex].subSections.push({
					subSection: $('.input-sub-section').val()
				});
			} else {
				listing.sections[currentIndex].subSections = [{
					subSection: $('.input-sub-section').val()
				}];
			}

			udateJSON();

		} else {
			alert('Please fill out all fields');
		}

	} else {

		// If it's a section
		if ($('.input-section').val()) {
			listing.sections.push({
				section: $('.input-section').val()
			});

			udateJSON();

		} else {
			alert('Please fill out all fields');
		}

	}

});