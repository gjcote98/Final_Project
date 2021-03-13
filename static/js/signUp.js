var symptom_object
var symptoms


$(function(){
	$('.populate_symptoms').click(function(){
		$.ajax({
			url: `/get_symptoms`,
			data: 0,
			type: 'GET',
			success: function(response){

			    $('.tab-pane tbody tr').detach();
				response = JSON.parse(response);

				symptom_object = response

                var records = 0
                records = response.keys().length

                var count = 0;
                for (var i in response) {

                    count = count + 1;
                }
                for (i = 0; i < count; i++) {
                    var category = response[i]['Category']

                    var panel = d3.select("#" + category)
                    var tablebody = panel.select('tbody')
                    var row = tablebody.append('tr')
                    var cell = row.append('td')
                    cell.text(response[i]['Clean'])
                    var cell = row.append('td')
                    var div = cell.append('div')
                    var radioone = div.append('input')
                    radioone.attr('class',`form-check-input`)
                    .attr('type','checkbox')
                    .attr('name',"symptoms")
                    .attr('value',`${response[i]['colName']}`)



                }
                var checkboxes = document.querySelectorAll("input[type=checkbox][name=symptoms]");

                checkboxes.forEach(function(checkbox) {
                  checkbox.addEventListener('change', function() {
                    symptoms =
                      Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
                      .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                      .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.

                    console.log(symptoms)
                      })
                   });






			},
			error: function(error){
				console.log(error);
			}
		});

	});
});














$(function(){
	$('.diagnose').click(function(){

        var symptoms_json = JSON.stringify(symptoms);

		$.ajax({
			url: `/diagnose/symptoms=${symptoms_json}`,
			data: 0,
			type: 'POST',
			success: function(response){
				response = JSON.parse(response);
				console.log(response)

			},
			error: function(error){
				console.log(error);
			}
		});

	});
});
