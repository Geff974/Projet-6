class Player {

    constructor (id, map, render) {
        this.weapon     = point;
        this.weaponDrop = null
        this.life       = 100;
        this.X          = 0;
        this.Y          = 0;
        this.protect    = false;
        this.id         = id;
        this.map        = map;
        this.render     = render;
    }

    move(x, y) {
        this.X = parseInt(x, 10);
        this.Y = parseInt(y, 10);
    }

    setWeapon (weapon) {
        this.weapon = weapon;
    } 

    movePlayer(x, y) {
        this.render.cleanPosition(this.X, this.Y);
        if (this.weaponDrop != null) {
            this.map.map[this.X][this.Y] = this.weaponDrop;
            this.weaponDrop.move(this.X, this.Y);
            this.render.placeObj(this.weaponDrop);
            this.weaponDrop = null;
        } else {
            this.map.map[this.X][this.Y] = 1;
        }
        
        this.move(x, y);
        if (isNaN(this.map.map[x][y])) {
            if (this.weapon != point) {
                this.weaponDrop = this.weapon;
            }
            this.setWeapon(this.map.map[x][y]);
        }
        this.render.placeObj(this);
    }

    attack (player) {
        const defensePlayer = document.getElementById('defenseP' + player.id);
        
        if (defensePlayer.classList.contains('active')) {
            player.life = player.life - this.weapon.damage / 2;
        } else {
            player.life = player.life - this.weapon.damage;
        }
        
    }
}