// Function to fetch and render podcasts
async function renderPodcasts() {
    const podcastGrid = document.getElementById('podcast-grid'); // Target the container

    try {
        // Fetch the JSON file
        const response = await fetch('/Podcasts/static/podcast.json');
        const podcastData = await response.json();

        // Iterate over podcast data
        podcastData.forEach(podcast => {
            // Create the podcast card container
            const card = document.createElement('div');
            card.className = 'podcast-card';

            // Add podcast image
            const img = document.createElement('img');
            img.src = `./${podcast.image}`; // Adjust path based on your folder structure
            img.alt = podcast.title;

            // Add podcast title
            const title = document.createElement('h3');
            title.textContent = podcast.title;

            // Add podcast description
            const desc = document.createElement('p');
            desc.textContent = podcast.description;

            // Add audio controls
            const audioContainer = document.createElement('div');
            audioContainer.className = 'audio-controls';

            const audio = document.createElement('audio');
            audio.src = `./${podcast.audio}`; // Adjust path based on your folder structure
            audio.controls = true;

            // Append audio to the container
            audioContainer.appendChild(audio);

            // Append all elements to the card
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(desc);
            card.appendChild(audioContainer);

            // Append the card to the grid container
            podcastGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching or parsing podcasts.json:', error);
    }
}

// Call the function to render podcasts
renderPodcasts();
