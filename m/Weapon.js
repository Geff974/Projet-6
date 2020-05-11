class Weapon {

    constructor (name, damage) {
        this.name   = name;
        this.damage = damage;
        this.X      = 0;
        this.Y      = 0;
    }

    move(X, Y) {
        this.X = X;
        this.Y = Y;
    }

}