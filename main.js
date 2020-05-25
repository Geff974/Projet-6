const map     = new gameMap();
const render  = new Render(map);
const fist    = new Weapon('fist', 10);
const knife   = new Weapon('knife', 20);
const gun     = new Weapon('gun', 30);
const shotgun = new Weapon('shotgun', 50);

const player1 = new Player(1, map, render, 3);
const player2 = new Player(2, map, render, 3);

const game    = new Game(map, player1, player2, player1);

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
        swal("Erreur !", "Veuillez cliquez sur une case disponible !", "error");
    }

}

const attack = (Pattack, Pvictim) => {
    Pattack.attack(Pvictim);
    game.actualiseLife();
    pulseLife(Pvictim);
    game.checkVIctory();
    game.mouvement();
    document.getElementById('defenseP' + Pvictim.id).classList.remove('active');
}

const defense = (button, player) => {
    button.classList.add('active');
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
    const playBtn = document.getElementById('playBtn');

    const itemsHide = document.querySelectorAll('.hide');
    for (let i=0; i<itemsHide.length; i++) {
        itemsHide[i].classList.replace('hide', 'show');
        itemsHide[i].style.animationDelay = '2s';
    }
    playBtn.classList.add('hide');

    render.initMap();
}

const distance = (AX, AY, BX, BY) => {
    return Math.sqrt((AX-BX) ** 2 + (AY-BY) ** 2);
}

const pulseLife = (player) => {
    const logo = document.getElementById('p' + player.getId() + 'life');
    logo.classList.add('lifePulse');
    setTimeout(function () {
        logo.classList.remove('lifePulse');
    }, 1000);
}