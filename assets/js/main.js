var listing,
	currentIndex,
	parentIndex;

// Get everything after the dash
function afterDash(str) {
	return str.split('-')[1];
}

// Focus on the input on page load
$('.input-section').focus();

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
			location.reload();
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
		parentIndex = key;

		addItem = '<li>';
		addItem += '<a href="#" class="remove-item" data-index="section-' + key + '">[X]</a> ';
		addItem += val.section;
		addItem += '<ul class="sub-section-list">';

		if (listing.sections[key].subSections) {
			$.each(listing.sections[key].subSections, function(key, val) {
				addItem += '<li>';
				addItem += '<a href="#" class="remove-item" data-index="section-' + key + '" data-index-parent="parent-' + parentIndex + '">[X]</a> ';
				addItem += val.subSection;
				addItem += '</li>';
			});
		}

		addItem += '<li><a href="#" class="add-sub-section" data-index="section-' + key + '">[+]</a></li>';
		addItem += '</ul>';
		addItem += '</li>';

		$('ul.section-list').append(addItem);
	});

});

// Cancel Button
$('[data-name="cancel"]').on('click', function() {
	$('.input-section').show();
	$('.input-sub-section, .form-notification').hide();
	$('[data-name="add"]').html('Add Section');
	$(this).hide();
});

// Remove Items
$('ul').on('click', '.remove-item', function() {

	$this = $(this);

	if ($this.closest('ul').hasClass('section-list')) {
		// If you're removing a section

		currentIndex = afterDash($this.attr('data-index'));

		listing.sections.splice(currentIndex, 1);
	} else if ($this.closest('ul').hasClass('sub-section-list')) {
		//Else if you're removing a sub section

		currentIndex = afterDash($this.attr('data-index'));
		parentIndex = afterDash($this.attr('data-index-parent'));

		listing.sections[parentIndex].subSections.splice(currentIndex, 1);
	}
	udateJSON();
});



// Add sub section button
$('ul').on('click', '.add-sub-section', function() {

	// Keep track of which sub section you clicked on
	currentIndex = afterDash($(this).attr('data-index'));

	// Let the page know you're in add-sub-section state
	$('body').attr('data-status', 'add-sub-section');

	$('.input-section').hide();
	$('.form-notification').show().html('Add a subsection to ' + listing.sections[currentIndex].section);
	$('.input-sub-section').show().focus();
	$('[data-name="add"]').html('Add Sub Section');
	$('[data-name="cancel"]').show();
});

// Add Item
$('[data-name="add"]').on('click', function() {
	if ($('body').attr('data-status') == 'add-sub-section') {
		// If we're dealing with adding a sub section

		if ($('.input-sub-section').val()) {
			// If the input is not empty

			if (listing.sections[currentIndex].subSections) {
				// If the section already has sub sections

				listing.sections[currentIndex].subSections.push({
					subSection: $('.input-sub-section').val()
				});
			} else {
				// Else the section doesn't have sub sections yet, create the array

				listing.sections[currentIndex].subSections = [{
					subSection: $('.input-sub-section').val()
				}];
			}
			udateJSON();
		} else {
			// Else the input is empty

			alert('Please fill out all fields');
		}
	} else {
		// Else we're dealing with adding a section

		if ($('.input-section').val()) {
			// If the input is not empty

			listing.sections.push({
				section: $('.input-section').val()
			});
			udateJSON();
		} else {
			// Else the input is empty

			alert('Please fill out all fields');
		}
	}
});