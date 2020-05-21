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
        
        lifeP1.innerHTML = this.player1.getLife();
        lifeP2.innerHTML = this.player2.getLife();
    }

    mouvement (mvnt = 1) {
        this.playerActive.setTurnLeft(-mvnt);

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
        const dist = distance(this.player1.getPosition('x'), this.player1.getPosition('y'), 
                                  this.player2.getPosition('x'), this.player2.getPosition('y'));
        
        if (dist === 1) { 
            if (this.playerActive == this.player1) {
                // attackBtn1.removeAttribute('disabled');
                $('#attackP1').prop('disabled', false).removeClass('btn-outline-primary').addClass('btn-primary');
                $('#defenseP1').prop('disabled', false).removeClass('btn-outline-danger').addClass('btn-danger');
                $('#attackP2').prop('disabled', true).removeClass('btn-primary').addClass('btn-outline-primary');
                $('#defenseP2').prop('disabled', true).removeClass('btn-danger').addClass('btn-outline-danger');
            } else {
                $('#attackP1').prop('disabled', true).removeClass('btn-primary').addClass('btn-outline-primary');
                $('#defenseP1').prop('disabled', true).removeClass('btn-danger').addClass('btn-outline-danger');
                $('#attackP2').prop('disabled', false).removeClass('btn-outline-primary').addClass('btn-primary');
                $('#defenseP2').prop('disabled', false).removeClass('btn-outline-danger').addClass('btn-danger');
            }
        } else {
            $('#attackP1').prop('disabled', true).addClass('btn-outline-primary').removeClass('btn-primary');
            $('#defenseP1').prop('disabled', true).addClass('btn-outline-danger').removeClass('btn-danger');
            $('#attackP2').prop('disabled', true).addClass('btn-outline-primary').removeClass('btn-primary');
            $('#defenseP2').prop('disabled', true).addClass('btn-outline-danger').removeClass('btn-danger');
        }
    }

    checkVIctory() {
        if (this.player1.getLife() < 1) {
            this.endGame(this.player1);
            return 1;
        } else if (this.player2.getLife() < 1) {
            this.endGame(this.player2);
            return 1;
        }
        return 0;
    }

    endGame(playerWin) {
        swal({
            title: "Le player " + playerWin.getId() + " est le WINNER !",
            text: "Souhaitez-vous rejouer ?",
            icon: "warning",
            buttons: ['Non', 'Oui']
          })
          .then((playAgain) => {
            if (playAgain) {
                document.location.reload(true);
            } else {
                window.close();
            }
          });
    }
}