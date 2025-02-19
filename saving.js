fetch('/save-field', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coordinates }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));