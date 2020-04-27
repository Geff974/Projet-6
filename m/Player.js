class Player {

    constructor (id, map, render) {
        this.weapon    = point;
        this.life      = 100;
        this.positionX = 0;
        this.positionY = 0;
        this.protect   = false;
        this.id        = id;
        this.map       = map;
        this.render    = render;
    }

    move(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    getPosition (p) {
        switch (p) {
            case 'x':
                return this.positionX;
            case 'y':
                return this.positionY;
        }
    }

    setWeapon (weapon) {
        this.weapon = weapon;
    } 

    movePlayer(x, y) {
        this.map.map[this.positionX][this.positionY] = 1;
        this.render.cleanPosition(this.positionX, this.positionY);
        this.move(x, y);
        if (isNaN(this.map.map[x][y])) {
            this.setWeapon(this.map.map[x][y]);
        }
    }
}