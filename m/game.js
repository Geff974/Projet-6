class Game {
    constructor (map, player1, player2, playerActive) {
        this.map          = map;
        this.playerActive = playerActive;
        this.player1      = player1;
        this.player2      = player2;
    }

    actualiseLife () {
        const lifeP1 = document.getElementById('p1life');
        const lifeP2 = document.getElementById('p2life');

        lifeP1.innerHTML = this.player1.life;
        lifeP2.innerHTML = this.player2.life;
    }

    mouvement () {
        this.playerActive.setTurnLeft(-1);

        if (!this.playerActive.getTurnLeft()) {
            if (this.playerActive == this.player1) {
                this.playerActive = this.player2;
                this.player1.setTurnLeft(3);
            } else {
                this.playerActive = this.player1;
                this.player2.setTurnLeft(3);
            }
        }
        this.map.activeCase(this.playerActive);
        this.checkButton();
        document.getElementById('turnsLeft').innerHTML = this.playerActive.getTurnLeft();
    }

    checkButton () {
        const attackBtn1   = document.getElementById('attackP' + this.player1.id);
        const defenseBtn1  = document.getElementById('defenseP' + this.player1.id);
        const attackBtn2   = document.getElementById('attackP' + this.player2.id);
        const defenseBtn2  = document.getElementById('defenseP' + this.player2.id);
 
        let distance = Math.sqrt((this.player1.getPosition('x')-this.player2.getPosition('x')) ** 2 
                        + (this.player2.getPosition('y')-this.player1.getPosition('y')) ** 2);
        
        if (distance === 1) {
            if (this.playerActive == this.player1) {
                attackBtn1.removeAttribute('disabled');
                defenseBtn1.removeAttribute('disabled');
                attackBtn2.setAttribute('disabled',  true);
                defenseBtn2.setAttribute('disabled', true);
            } else {
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
        if (this.player1.getLife() < 1) {
            alert('Player 2 WIN');
            return 1;
        } else if (this.player2.getLife() < 1) {
            alert('Player 1 WIN');
            return 1;
        }
    }
}