

  var service;

  function initialize(lat, long) {
    var pyrmont = new google.maps.LatLng(lat, long);

    var request = {
      location: pyrmont,
      radius: '5000',
      type: ['restaurant']
    };

    service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(request, callback);
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // Display information on the webpage
      displayResults(results);
    } else {
      console.error('Places service failed:', status);
    }
  }

  function displayResults(results) {
    var resultsContainer = document.getElementById('results');
    
    results.forEach(function(place, index) {
      var resultItem = document.createElement('div');
      resultItem.innerHTML = '<strong>' + (index + 1) + '. ' + place.name + '</strong><br>' +
                             'Address: ' + place.vicinity + '<br><br>';
      resultsContainer.appendChild(resultItem);
    });
  }

  // Call the initialize function when the page loads
  initialize();

<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAE7jbNly4VYg35IaEa2gALlDt0SyRHfkw&libraries=places&callback=initialize">
</script>

