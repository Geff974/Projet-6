class Player {

    constructor (id, map, render, turnLeft) {
        this.weapon     = fist;
        this.weaponDrop = null
        this.life       = 100;
        this.X          = 0;
        this.Y          = 0;
        this.protect    = false;
        this.id         = id;
        this.map        = map;
        this.render     = render;
        this.turnLeft   = turnLeft;
    }

    move(x, y) {
        this.X = parseInt(x, 10);
        this.Y = parseInt(y, 10);
    }

    getPosition(p) {
        if (p == 'x') {
            return this.X;
        } else if (p == 'y') {
            return this.Y;
        }
    }

    getLife() {
        return this.life;
    }

    getTurnLeft() {
        return this.turnLeft;
    }

    getId() {
        return this.id;
    }

    getDamage () {
        return this.damage;
    }

    setLife(numb) {
        this.life += numb;
    }

    setTurnLeft(numb) {
        this.turnLeft += numb;
    }

    setWeapon (weapon) {
        this.weapon = weapon;
    } 

    movePlayer(x, y) {
        this.render.cleanPosition(this.X, this.Y);
        if (this.weaponDrop != null) {
            this.map.map[this.X][this.Y] = this.weaponDrop;
            this.weaponDrop.move(this.X, this.Y);
            this.render.placePlayerOrWeapon(this.weaponDrop);
            this.weaponDrop = null;
        } else {
            this.map.map[this.X][this.Y] = 1;
        }

        const dist = distance(this.X, this.Y, x, y);
        
        this.move(x, y);
        if (isNaN(this.map.map[x][y])) {
            if (this.weapon != fist) {
                this.weaponDrop = this.weapon;
            }
            this.setWeapon(this.map.map[x][y]);
        }
        this.render.placePlayerOrWeapon(this);
        return dist;
    }

    attack (player) {
        const defensePlayer = document.getElementById('defenseP' + player.getId());
        
        if (defensePlayer.classList.contains('active')) {
            player.setLife(-this.weapon.damage / 2);
        } else {
            player.setLife(-this.weapon.damage);
        }
        this.turnLeft = 1;
    }
}