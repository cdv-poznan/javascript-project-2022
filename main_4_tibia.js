// https://api.tibiadata.com/v3/worlds

async function tibiaWorld () {
    const response = await fetch('https://api.tibiadata.com/v3/worlds');
    const json = await response.json();

    const worlds = document.getElementById('world');

    for (const newWorld of json.worlds.regular_worlds) {

        const createWorld = document.createElement('div');
        createWorld.classList.add('world-list');
        worlds.appendChild(createWorld);

        const worldName = document.createElement('p');
        worldName.innerText = 'World name: ' + newWorld.name;

        const location = document.createElement('p');
        location.innerText = 'Location: ' + newWorld.location;

        const online = document.createElement('p');
        online.innerText = 'Players online: ' + newWorld.players_online;

        const type = document.createElement('p');
        type.innerText = 'Type of world: ' + newWorld.pvp_type;

        createWorld.appendChild(worldName);
        createWorld.appendChild(location);
        createWorld.appendChild(online);
        createWorld.appendChild(type);

    }
}


document.addEventListener('DOMContentLoaded', async () => {
    tibiaWorld();
});
