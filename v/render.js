class Render {
    
    constructor (map) {
        this.map = map;
    }

    cleanMap () {
        const gameMapHTML = document.getElementById('gameMap');
        while(gameMapHTML.firstChild) {
            gameMapHTML.removeChild(gameMapHTML.firstChild);
        }
    }

    initMap () {
        const nbrRow = document.getElementById('nbrRow').value;
        const nbrCol = document.getElementById('nbrCol').value;

        this.map.init(nbrRow, nbrCol);
    }

    init () {
        this.cleanMap();
        const gameMapHTML = document.getElementById('gameMap');

        for (let i=0; i<this.map.map.length; i++) {
            const row = document.createElement('tr');
            gameMapHTML.appendChild(row);
        }
    
        let gameMapRow = document.getElementsByTagName('tr');

        for (let i=0; i<this.map.map.length; i++) {
            for (let j=0; j<this.map.map[0].length; j++) {
                const col = document.createElement('td');
                col.id = i + ':' + j;
                switch (this.map.map[i][j]) {
                    case 0:
                        col.classList.add('black-case');
                        break;
                    case player1:
                    case player2:
                        col.classList.add('player'+this.map.map[i][j].id, 'fist');
                        break;
                    case knife:
                        col.classList.add('knife');
                        break;
                    case gun:
                        col.classList.add('gun');
                        break;
                    case shotgun:
                        col.classList.add('shotgun');
                        break;
                }
                col.onclick = movePlayer;
                col.style.animationDelay = ((i /2) + (j * 0.1)) + 's';
                gameMapRow[i].appendChild(col);
            }
        }

    }

    cleanPosition(x, y){
        document.getElementById(x + ":" + y).className = "";
        this.map.map[x][y] = 1;
    }

    placePlayerOrWeapon(PlayerOrWeapon) {
        const {X, Y} = PlayerOrWeapon;

        const place = document.getElementById(X + ":" + Y);
        this.map.map[X][Y] = PlayerOrWeapon;
        switch (PlayerOrWeapon) {
            case player1:
            case player2:
                place.classList.add('player' + PlayerOrWeapon.id);
                place.classList.add(PlayerOrWeapon.weapon.name);
                break;
            default :
                place.classList.add(PlayerOrWeapon.name);
        }
        
    }
}