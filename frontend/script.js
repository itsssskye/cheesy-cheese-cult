<<<<<<< Updated upstream
document.getElementById("applyBtn").addEventListener("click", function() {
    alert("Your cheese application has been received! 🧀");
=======
// Set the backend URL (use the production URL when deployed)
const backendUrl = 'https://cheesy-cheese-cult.onrender.com';  // Replace with your Render backend URL

document.getElementById("applicationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const favoriteCheese = document.getElementById("favoriteCheese").value;
    const reason = document.getElementById("reason").value;

    // Send the form data to the backend
    fetch(`${backendUrl}/apply`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, favorite_cheese: favoriteCheese, reason })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);  // Display success message from the backend
        document.getElementById("applicationForm").reset();  // Reset the form after submission
    })
    .catch(error => {
        alert('Error: ' + error);  // Handle any errors
    });
>>>>>>> Stashed changes
});