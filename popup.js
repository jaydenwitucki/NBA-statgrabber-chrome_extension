document.addEventListener('DOMContentLoaded', function () {
    const playerForm = document.getElementById('playerForm');
    const playerNameInput = document.getElementById('playerName');
    const gamesPlayed = document.getElementById('gamesPlayed');
    const pointsAveraged = document.getElementById('pointsAveraged');
    const reboundsAveraged = document.getElementById('reboundsAveraged');
    const assistsAveraged = document.getElementById('assistsAveraged');

    const API_KEY = '444a24f6-a061-4946-9060-3e0725b79617';  // Your actual API key

    playerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const playerName = playerNameInput.value.trim().split(" ").join("_");
        if (playerName.length > 0) {
            getPlayerId(playerName);
        } else {
            alert("Please type the player's name!");
        }
    });

    function getPlayerId(playerName) {
        const apiUrl = `https://api.balldontlie.io/v1/players?search=${playerName}`;
        const API_KEY = '444a24f6-a061-4946-9060-3e0725b79617';
        fetch(apiUrl, {
            headers: {
                'Authorization': API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.data.length === 0) {
                alert("This player is either injured or hasn't played yet!");
            } else if (data.data.length > 1) {
                alert("Please specify the name more!");
            } else {
                const playerId = data.data[0].id;
                getPlayerStats(playerId);
            }
        })
        .catch(error => console.error('Error fetching player ID:', error));
    }

    function getPlayerStats(playerId) {
        const apiUrl = `https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${playerId}`;
        const API_KEY = '444a24f6-a061-4946-9060-3e0725b79617';
        fetch(apiUrl, {
            headers: {
                'Authorization': API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.data.length > 0) {
                const stats = data.data[0];
                gamesPlayed.textContent = stats.games_played || 'N/A';
                pointsAveraged.textContent = stats.pts || 'N/A';
                reboundsAveraged.textContent = stats.reb || 'N/A';
                assistsAveraged.textContent = stats.ast || 'N/A';
            } else {
                alert("No stats available for this player.");
            }
        })
        .catch(error => console.error('Error fetching player stats:', error));
    }
});