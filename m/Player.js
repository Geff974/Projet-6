class Player {

    constructor (id, map) {
        this.weapon = point;
        this.life = 100;
        this.positionX = 0;
        this.positionY = 0;
        this.protect = false;
        this.id = id;
        this.map = map;
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
}