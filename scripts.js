const loadGameWithParametre = (nbrRow, nbrCol) => {
    const tablePlay = document.getElementById("tablePlay");
    let nbrColHTML = "";
    let tablePlayHTML = "";
    
    for (let i=0; i<nbrCol; i++) {
        nbrColHTML += "<td class=\"white-case\"></td>";
    }
    
    for (let i=0; i<nbrRow; i++) {
        tablePlayHTML += "<tr>" + nbrColHTML + "</tr>" ;
    }

    tablePlay.innerHTML = tablePlayHTML;
}

model = {
    gameMap: []
}

view = {
    cleanMap: function() {
        gameMapHTML = document.getElementById('gameMap');
        while(gameMapHTML.firstChild) {
            gameMapHTML.removeChild(gameMapHTML.firstChild);
        }
    },

    initMap: function() {
        const nbrRow = document.getElementById('nbrRow').value;
        const nbrCol = document.getElementById('nbrCol').value;
        controller.initMap(nbrRow, nbrCol);
    },

    render: function() {
        this.cleanMap();

        const gameMapHTML = document.getElementById('gameMap');

        for (let i=0; i<model.gameMap.length; i++) {
            const row = document.createElement('tr');
            gameMapHTML.appendChild(row);
        }

        let gameMapRow = document.getElementsByTagName('tr');

        for (let i=0; i<gameMapRow.length; i++) {
            for (let j=0; j<model.gameMap[0].length; j++) {
                const col = document.createElement('td');
                gameMapRow[i].appendChild(col);
            }
        }
    }

}

controller = {
    eraseMap: function () {
        view.cleanMap();
        model.gameMap.splice(0, model.gameMap.length);
    },

    initMap: function (nbrRow, nbrCol) {
        this.eraseMap();

        for (let i=0; i<nbrRow; i++) {
            model.gameMap[i] = [];
        }

        for (let i=0; i<nbrRow; i++) {
            for (let j=0; j<nbrCol; j++) {
                model.gameMap[i][j] = "";
            }
        }

        view.render();
    },

    selectGreyCase: function() {
        const greyCase = document.getElementsByTagName('td');
        const nbrGreyCase = document.getElementById('nbrGreyCase').value;

        for (const obj in greyCase) {
            if (greyCase[obj].classList.contains("black-case")) {
                greyCase[obj].classList.remove("black-case");
            }
        }
        for (let i=0; i<nbrGreyCase; i++) {
            const rand = Math.floor(Math.random() * (greyCase.length+1));
            greyCase[rand].classList.add('black-case');
        }
    }

}