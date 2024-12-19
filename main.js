document.getElementById('submitBtn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const resultDiv = document.getElementById('result');


    resultDiv.innerHTML = '';

    if (!username) {
        resultDiv.innerHTML = '<p>Please enter a username.</p>';
        return;
    }

    axios.get(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            const repos = response.data;

            // Create a heading for the results
            const heading = document.createElement('h2');
            heading.textContent = `Repositories for ${username}`;
            resultDiv.appendChild(heading);

            // Check if there are no repos
            if (repos.length === 0) {
                resultDiv.innerHTML += '<p>No repositories found.</p>';
                return;
            }

            // Create repo elements
            repos.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.className = 'repo';
                repoElement.innerHTML = `
                    <p><strong>Name:</strong> ${repo.name}</p>
                    <p><strong>Description:</strong> ${repo.description || 'No description available'}</p>
                    <p><strong>Language:</strong>${repo.language}</p>
                    <a href="${repo.html_url}" target="_blank">View Repository</a>
                `;
                resultDiv.appendChild(repoElement);
            });
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                resultDiv.innerHTML = '<p>User not found.</p>';
            } else {
                resultDiv.innerHTML = '<p>An error occurred while fetching the data.</p>';
            }
        });
});


