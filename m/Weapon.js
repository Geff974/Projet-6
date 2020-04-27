class Weapon {

    constructor (name, damage) {
        this.name   = name;
        this.damage = damage;
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