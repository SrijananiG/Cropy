let map;
let drawingManager;

function initMap() {
    // Initialize the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 20.5937, lng: 78.9629 }, // Center on India
        zoom: 5
    });

    // Initialize the drawing manager
    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        },
        polygonOptions: {
            editable: true,
            draggable: true,
            fillColor: '#00FF00',
            strokeColor: '#00FF00',
            strokeWeight: 2
        }
    });

    drawingManager.setMap(map);

    // Add a listener for when a polygon is completed
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
        // Get the coordinates of the polygon
        const coordinates = polygon.getPath().getArray().map(latLng => {
            return { lat: latLng.lat(), lng: latLng.lng() };
        });

        // Log the coordinates to the console (you can send them to a server or process them further)
        console.log('Field Coordinates:', coordinates);

        // Optionally, you can add a marker or label to the polygon
        const centroid = getCentroid(coordinates);
        new google.maps.Marker({
            position: centroid,
            map: map,
            label: 'Field',
            title: 'Field'
        });
    });
}

// Function to calculate the centroid of a polygon
function getCentroid(coords) {
    let x = 0, y = 0, z = 0;
    coords.forEach(coord => {
        x += coord.lat;
        y += coord.lng;
    });
    x /= coords.length;
    y /= coords.length;
    return { lat: x, lng: y };
}