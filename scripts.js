const map           = new gameMap();
const render        = new Render(map);
const point         = new Weapon('point', 10);
const couteau       = new Weapon('couteau', 20);
const pistolet      = new Weapon('pistolet', 30);
const fusilleAPompe = new Weapon('fusilleAPompe', 50);

const player1       = new Player(1, map, render, 3);
const player2       = new Player(2, map, render, 3);

const game          = new Game(map, player1, player2, player1);

const movePlayer = (event) => {
    const eventId = event.target.id.split(':');
    const x       = eventId[0];
    const y       = eventId[1];

    if (document.getElementById(x + ":" + y).classList.contains('active')) {
        if (game.playerActive == player1) {
            player1.movePlayer(x, y);
            game.mouvement();
        } else {
            player2.movePlayer(x, y);
            game.mouvement();
        }

    } else {
        alert("Veuillez cliquez sur une case disponible");
    }

}

const attack = (Pattack, Pvictim) => {
    Pattack.attack(Pvictim);
    game.actualiseLife();
    game.checkVIctory();
    game.mouvement();
    document.getElementById('defenseP' + Pvictim.id).classList.remove('active');
}

const toggleButton = (button) => {
    button.classList.toggle('active');
    game.mouvement();
}

const show = () => {
    const infoPlayer = document.getElementById('infoPlayer');
    infoPlayer.classList.replace('hide', 'show');
    render.initMap();
}