var map;
			function initMap() {
			  map = new google.maps.Map(document.getElementById('map'), {
			    center: {lat: 38.193, lng: 128.561},
			    zoom: 13
			  });

			
			<%
			    for(var i=0; i<rows.length; i++)
			    {
			        var pokelocation = rows[i];

			%>
				var myLatLng = {lat: <%=pokelocation.plat%>, lng: <%=pokelocation.plng%>};
				var marker = new google.maps.Marker({
			    position: myLatLng,
			    map: map
			  });
			<%
		   		} 
			%>
			}