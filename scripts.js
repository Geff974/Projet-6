const map           = new gameMap();
const render        = new Render(map);
const point         = new Weapon('point', 10);
const couteau       = new Weapon('couteau', 20);
const pistolet      = new Weapon('pistolet', 30);
const fusilleAPompe = new Weapon('fusilleAPompe', 50);

const player1       = new Player(1, map, render);
const player2       = new Player(2, map, render);

const game          = new Game(map, player1, player2);

const movePlayer = (event) => {
    const eventId = event.target.id;
    const x       = eventId.substring(0, 1);
    const y       = eventId.substring(2, 3);

    if (document.getElementById(x + ":" + y).classList.contains('active')) {
        if (game.playerActive == 1) {
            player1.movePlayer(x, y);
            render.placePlayer(player1);
            if(game.turnsLeft>0) {
                map.activeCase(player1);
                game.turnsLeft--;
            } else {
                map.activeCase(player2);
                game.turnsLeft    = 2;
                game.playerActive = 0;
            }
        } else {
            player2.movePlayer(x, y);
            render.placePlayer(player2);
            if(game.turnsLeft>0) {
                map.activeCase(player2);
                game.turnsLeft--;
            } else {
                map.activeCase(player1);
                game.turnsLeft    = 2;
                game.playerActive = 1;
            }
        }
        game.turn++;

    } else {
        alert("Veuillez cliquez sur une case disponible");
    }

}