const map = new gameMap();
const game = new Game(map);
const render = new Render(map);
const point = new Weapon('point', 10);
const couteau = new Weapon('couteau', 20);
const pistolet = new Weapon('pistolet', 30);
const fusilleAPompe = new Weapon('fusilleAPompe', 50);

const player1 = new Player(1);
const player2 = new Player(2);

const movePlayer = (event) => {
    const eventId = event.target.id;
    const x = eventId.substring(0, 1);
    const y = eventId.substring(2, 3);

    if (document.getElementById(x + ":" + y).classList.contains('active')) {
        if (game.turn%2!=0) {
            map.cleanPosition(player1);
            player1.move(x, y);
            game.changeWeapon(player1, x, y);
            render.placePlayer(player1);
            map.activeCase(player2);
        } else {
            map.cleanPosition(player2);
            player2.move(x, y);
            game.changeWeapon(player2, x, y);
            render.placePlayer(player2);
            map.activeCase(player1);
        }
        game.turn++;

    } else {
        alert("Veuillez cliquez sur une case disponible");
    }

}