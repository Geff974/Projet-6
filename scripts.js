const map           = new gameMap();
const render        = new Render(map);
const fist         = new Weapon('fist', 10);
const knife         = new Weapon('knife', 20);
const gun      = new Weapon('gun', 30);
const shotgun = new Weapon('shotgun', 50);

const player1       = new Player(1, map, render, 3);
const player2       = new Player(2, map, render, 3);

const game          = new Game(map, player1, player2, player1);

const movePlayer  = (event) => {
    const eventId = event.target.id.split(':');
    const x       = eventId[0];
    const y       = eventId[1];
    let dist = 0;

    if (document.getElementById(x + ":" + y).classList.contains('active')) {
        if (game.playerActive == player1) {
            dist = player1.movePlayer(x, y);
            game.mouvement(dist);
        } else {
            dist = player2.movePlayer(x, y);
            game.mouvement(dist);
        }

    } else {
        alert("Veuillez cliquez sur une case disponible");
    }

}

const attack = (Pattack, Pvictim) => {
    Pattack.attack(Pvictim);
    game.actualiseLife();
    if (game.checkVIctory()) {
        document.location.reload(true);
    }
    game.mouvement();
    document.getElementById('defenseP' + Pvictim.id).classList.remove('active');
}

const toggleButton = (button, player) => {
    button.classList.toggle('active');
    let turnLeft = player.getTurnLeft();
    turnLeft--;
    player.setTurnLeft(-turnLeft);
    game.mouvement();
}

const nextPlayer = () => {
    const player = game.playerActive;
    let turnLeft = player.getTurnLeft();
    turnLeft--;
    player.setTurnLeft(-turnLeft);
    game.mouvement();
}

const play = () => {
    const playBtn = document.getElementById('playBtn')

    const itemsHide = document.querySelectorAll('.hide');
    for (let i=0; i<itemsHide.length; i++) {
        itemsHide[i].classList.remove('hide');
    }
    playBtn.classList.add('hide');

    render.initMap();
}

const distance = (AX, AY, BX, BY) => {
    return Math.sqrt((AX-BX) ** 2 + (AY-BY) ** 2);
}