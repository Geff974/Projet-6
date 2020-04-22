const view = new View();
const control = new Controller();
const model = new Model();
const point = new Weapon('point', 10);
const couteau = new Weapon('couteau', 20);
const pistolet = new Weapon('pistoler', 30);
const fusilleAPompe = new Weapon('fusilleAPompe', 50);

const player1 = new Player(1);
const player2 = new Player(2);

const checkCaseAvailab = (x, y) => {
    if (model.gameMap[x][y] === 0 || model.gameMap[x][y] === 2 || model.gameMap[x][y] === 3) {
        return 0;
    }
    return 1;
}

const movePlayer = (event) => {
    const eventId = event.target.id;
    const x = eventId.substring(0, 1);
    const y = eventId.substring(2, 3);

    if (document.getElementById(x + ":" + y).classList.contains('active')) {
        switch (model.player1Actif) {
            case true:
                player1.move(x, y);
                controller.activeCase(player2);
                model.player1Actif = !model.player1Actif;
                break;
            case false:
                player2.move(x, y);
                controller.activeCase(player1);
                model.player1Actif = !model.player1Actif;
                break;
        }

        controller.placeAll();

        // switch (model.player1Actif) {
        //     case true:
        //         controller.activeCase(player1);
        //         break;
        //     case false:
        //         controller.activeCase(player2);
        //         break;
        // }

        view.render();
    } else {
        alert("Veuillez cliquez sur une case disponible");
    }

}