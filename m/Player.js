class Player {

    constructor (id) {
        this.weapon = new Weapon("point", 10);
        this.life = 100;
        this.positionX = 0;
        this.positionY = 0;
        this.protect = false;
        this.id = id;
    }

    newWeapon (weapon) {
        this.weapon = weapon;
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

}