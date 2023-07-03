// Get the input field and results div
const searchBox = document.getElementById('searchBox');
const results = document.getElementById('results');

// Add an event listener to the input field
searchBox.addEventListener('keyup', (e) => {
    // Clear the results
    results.innerHTML = '';

    // Get the search term
    const searchTerm = e.target.value;

    // Fetch the characters from the API
    fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            // Loop through the results and add them to the page
            data.results.forEach(character => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <h2>${character.name}</h2>
                    <img src="${character.image}" alt="${character.name}">
                    <p id="info${character.id}" style="display: none;">${character.status} - ${character.species}</p>
                `;
                results.appendChild(div);

                // Add click event listener to the div
                div.addEventListener('click', () => {
                    const info = document.getElementById(`info${character.id}`);
                    if (info.style.display === 'none') {
                        info.style.display = 'block';
                    } else {
                        info.style.display = 'none';
                    }
                });

                // Add mouseover event listener to the div
                div.addEventListener('mouseover', () => {
                    div.style.backgroundColor = '#5a0fb4';
                });

                // Add mouseout event listener to the div
                div.addEventListener('mouseout', () => {
                    div.style.backgroundColor = '';
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
