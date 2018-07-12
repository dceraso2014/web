function initMap() {
     var map = new google.maps.Map(document.getElementById('ieatmaps'), {
      //center: {lat: 34.0937458, lng: -118.3614978},
      center: {lat: -34.502270, lng: -58.539520},
      zoom: 15,
      styles: [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#193341"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2c5a71"
                        
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        //"color": "#E91E63"
                        "color": "#FFFFFF"
                    },
                    {
                        "lightness": -37
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#406d80"
                        
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#406d80"
                        
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#3e606f"
                        
                    },
                    {
                        "weight": 2
                    },
                    {
                        "gamma": 0.84
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "weight": 0.6
                    },
                    {
                        "color": "#1a3541"
                        
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2c5a71"
                        
                    }
                ]
            }
        ]
    });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(-34.502270, -58.539520)
        , title: 'NewTech'
        , map : map

    });
  }
