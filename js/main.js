function openProject(fileUrl) {
    const modal = document.getElementById("projectModal");
    const contentContainer = document.getElementById("modal-body-content");

    // Clear previous content and show loading
    contentContainer.innerHTML = "<p style='text-align:center; padding:20px;'>Loading...</p>";
    modal.style.display = "block";

    // Fetch the file
    fetch(fileUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            contentContainer.innerHTML = html;
        })
        .catch(error => {
            console.error('Error:', error);
            contentContainer.innerHTML = "<p>Error loading project. Ensure you are using a Local Server (vs code live server).</p>";
        });
}

function closeModal() {
    document.getElementById("projectModal").style.display = "none";
    document.getElementById("modal-body-content").innerHTML = "";
}

window.onclick = function(event) {
    const modal = document.getElementById("projectModal");
    if (event.target == modal) {
        closeModal();
    }
}