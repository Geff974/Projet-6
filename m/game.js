class Game {
    constructor (map, player1, player2) {
        this.map          = map;
        this.playerActive = true;
        this.player1      = player1;
        this.player2      = player2;
        this.turnsLeft    = 3;
    }

    actualiseLife () {
        const lifeP1 = document.getElementById('p1life');
        const lifeP2 = document.getElementById('p2life');

        lifeP1.innerHTML = this.player1.life;
        lifeP2.innerHTML = this.player2.life;
    }

    mouvement () {
        this.turnsLeft--;

        if (game.turnsLeft == 0) {
            this.playerActive = !this.playerActive;
            this.turnsLeft = 3;
        }
        switch (this.playerActive) {
            case true:
                this.map.activeCase(player1);
                break;
            default:
                this.map.activeCase(player2);
        }
        this.checkButton();
        document.getElementById('turnsLeft').innerHTML = this.turnsLeft;
    }

    checkButton () {
        const attackBtn1   = document.getElementById('attackP' + this.player1.id);
        const defenseBtn1  = document.getElementById('defenseP' + this.player1.id);
        const attackBtn2   = document.getElementById('attackP' + this.player2.id);
        const defenseBtn2  = document.getElementById('defenseP' + this.player2.id);
        let fightAvailable = false;

        if (this.player1.X == this.player2.X - 1 || this.player1.X == this.player2.X + 1) {
            if (this.player1.Y == this.player2.Y) {
                fightAvailable = true;
            }
        } else if (this.player1.Y == this.player2.Y - 1 || this.player1.Y == this.player2.Y + 1) {
            if (this.player1.X == this.player2.X) {
                fightAvailable = true;
            }
        }
        
        if (fightAvailable) {
            switch (this.playerActive) {
                case true:
                    attackBtn1.removeAttribute('disabled');
                    defenseBtn1.removeAttribute('disabled');
                    attackBtn2.setAttribute('disabled', true);
                    defenseBtn2.setAttribute('disabled', true);
                    break;
                default:
                    attackBtn1.setAttribute('disabled', true);
                    defenseBtn1.setAttribute('disabled', true);
                    attackBtn2.removeAttribute('disabled');
                    defenseBtn2.removeAttribute('disabled');
            }
        } else {
            attackBtn1.setAttribute('disabled', true);
            defenseBtn1.setAttribute('disabled', true);
            attackBtn2.setAttribute('disabled', true);
            defenseBtn2.setAttribute('disabled', true);
        }
    }

    checkVIctory() {
        if (this.player1.life < 1) {
            alert('Player 2 WIN');
            return 1;
        } else if (this.player2.life < 1) {
            alert('Player 1 WIN');
            return 1;
        }
    }
}