// Example of your code in script.js
function openProjectCard(projectId) {
    // 1. Fetch the content
    fetch(projectId + '.html')
        .then(response => response.text())
        .then(html => {
            // 2. Insert the HTML into the modal/card
            document.getElementById('modal-content').innerHTML = html;
            
            // 3. THE FIX: Force Prism to re-scan the page now that new code exists
            if (window.Prism) {
                window.Prism.highlightAll();
            }
        });
}

// Add a second parameter 'type' with a default value of 'content'
function openProject(fileUrl, type = 'content') {
    const modal = document.getElementById("projectModal");
    const contentContainer = document.getElementById("modal-body-content");

    modal.style.display = "block";

    if (type === 'iframe') {
        // SOLUTION: Use an iframe for WebGL/Interactive projects
        contentContainer.innerHTML = `
            <iframe 
                src="${fileUrl}" 
                class="project-iframe" 
                frameborder="0" 
                scrolling="no"
                onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + 0 + 'px';"
                allowfullscreen>
            </iframe>`;
    } else {
        // EXISTING LOGIC: Text/Image based projects
        contentContainer.innerHTML = "<p style='text-align:center; padding:20px;'>Loading...</p>";
        
        fetch(fileUrl)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                // 1. Insert the HTML
                contentContainer.innerHTML = html;

                // 2. THE FIX: Force Prism to highlight the NEW content immediately
                if (window.Prism) {
                    window.Prism.highlightAll();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                contentContainer.innerHTML = "<p>Error loading project.</p>";
            });
    }
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