class Map {
    
    constructor(){

        this.listMapElement = new Array();
    }
    // description: Génère une nouvelle map  d'élément de type sol ou mur 
    // params : 
    //      size: La taille de la map 
    generateMap(size){

        //Initialise un tableau de map element 
        for(var x=0; x < size; x++){
			for(var y=0; y < size; y++){
				var type;
		        if(Math.floor(Math.random() * 100 +1) <= (100 - config.percentWall)){
                     type = "floor";
		        }
		        else{
                     type = "wall";
			
		        }
				var mycase = new MapElement(type,new Position(x,y));
					
				this.listMapElement.push(mycase);
				
								
            }
        }


    }
    // description: Affiche la map 
    displayMap(){
	
		
		for(var element of this.listMapElement){
			 var mycase = $("<div data-x=\""+element.position.x + "\" data-y=\""+element.position.y + "\" ></div>");
			 mycase.data("x",element.position.x).data("y",element.position.y);
			 mycase.addClass("case").addClass(element.type);
             
             

			$('#gameDiv').append(mycase);
			element.domElement = mycase;
        }
        $('.case').css('width','calc('+ (100/config.size) +'% - 2px)').css('height','calc('+ (100/config.size) +'% - 2px)');
        this.placeWeapons();
        this.placePlayers();		
        
				
    } 
    // description: cherche une case sur la map à une position données
    // params : 
    //      position: La position de la case
    findCase(position){
		return this.listMapElement.find(mycase => mycase.position.x  == position.x  &&   mycase.position.y == position.y);
		
		
	}

    // description: vérifie la case sur la map est mur 
    // params : 
    //      position: La position de la case
    checkWall(position){
     return this.findCase(position).type == "wall";
    }
    // description: place les joueurs sur la map 
    placePlayers(){
       for(let player of app.listPlayers){
        app.map.findCase(player.position).domElement.addClass(player.image);
        
       }

    }
     // description: place les armes sur la map 
    placeWeapons(){
        for(let weapon of app.listWeapons){
            app.map.findCase(weapon.position).domElement.addClass(weapon.name);
        }
    }
    
    



	
	
}