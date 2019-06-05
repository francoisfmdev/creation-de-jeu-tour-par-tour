class Player{

	constructor(position,pv,weapon,name,image){
        this.position = position;
        this.life = pv;
        this.weapon = weapon;
        this.name = name;
        this.image = image;
        this.movement =  0 ;
        this.defense = false;
    }
    toString(){

        return this.name;

    }

    // description: Permet de déplacer un joueur   
    // params : 
    //      position: La destination
    move(position){
       
        console.log('move');
        var oldPosition = this.position;
        var oldcase = app.map.findCase(oldPosition);
        oldcase.domElement.removeClass(app.currentPlayer.image);

        this.position = position;
        console.log(this.position);
       var mycase = app.map.findCase(position);
        mycase.domElement.addClass(app.currentPlayer.image);
        
        for(let weapon of app.listWeapons ){

            if(weapon.position.x == position.x && weapon.position.y == position.y){
                console.log("take");
                mycase.domElement.removeClass(weapon.name);
                var tempWeapon = this.weapon;
                console.log(tempWeapon);
                tempWeapon.position = position;
                mycase.domElement.addClass(tempWeapon.name);
                app.currentPlayer.wearWeapon(weapon);
                console.log(tempWeapon);
               var index = app.listWeapons.indexOf(weapon);
                app.listWeapons.splice(index,1,tempWeapon);
                 
            }
            
            
            
           
        }
        
    }
    // description: Permet à un joueur d'attaquer et d'infligé les dommages de son arme 
    // params : 
    //      player: La cible de l'attaque 
    attack(player){
        
        player.life-= (player.defense) ? Math.floor(this.weapon.degats/2) : this.weapon.degats ;

        this.defense = false;
        
    }
    // description: Permet à un joueur de ce defendre et encaissé la moitié  des dommages     
    

    defend(){
      
        this.defense = true;
    }
    // description: Permet à un joueur d'équiper une arme 
    // params : 
    //      weapon: L'arme à équiper 
    wearWeapon(weapon){
        
        
        this.weapon = weapon;

        app.displayHUD(this);

        

    }
    
    



}