class Application{
	
	constructor(){

        this.map = null;
        this.listPlayers = new Array();
        this.listWeapons = new Array();
        this.currentPlayer = null;
        this.path = null;
     /*   $('.startGame').on('click',function(){
            app.startGame($(this).val());
        });*/
        $("#yesButton").click(function(){
            $("#fightHud").css( "visibility","hidden" );
            $("body").removeClass("fond");
            $(".modal").fadeOut("fast");
            app.startGame(10);
        });

    }
    // description: creer une map et diferents élements du jeu(joueurs,arme)
    //            et lance le premier tour de jeu
    // params : 
    //      size:la taille de la map 
    // retour : une nouvelle coordonnée d'une case adjacente 
    startGame(){ 
        this.clearGame();
        this.map = new Map();
        this.map.generateMap(config.size);
        app.createWeapons();
        app.createPlayers(config.nbrsPlayer);
        app.currentPlayer = this.listPlayers[0];
        app.map.displayMap();
        app.displayHUD(this.currentPlayer);
        app.ManageOneTurn();
        
        
    }
    // description: affiche la fenêtre modale contenant l'interface de combat
    //            et le menu principal  
    callModal(){
        
        $("body").addClass("fond");
		$(".fond").fadeIn("slow");
		$(".modal").fadeIn("slow");
    }
    // description: Affiche l'interface utilisateur 
    // params: 
    //      activplayer:  le joueur actif

    displayHUD(activPlayer){

            var currentplayerHUD =  $("<div class='label'>current player :"+ activPlayer.name + "</div>");
            $('#hud').html(currentplayerHUD);
        for(let player of app.listPlayers){
            var playerHUD = $("<div  class='miniHUD'><span >name:"+ player.name +"</span>  <span class='labelLife'>pv:"+ player.life +"</span> <span class='labelWeapon'>weapon:"+ player.weapon +"</span></div>");
            $('#hud').append(playerHUD);
			
        }


    }
    // description: Crée des armes et les ajoutes à une liste 
    //     
    createWeapons(){
        var weapon;
        weapon = new Weapon("Sword",Position.createRandomPosition(config.size),35);
        app.listWeapons.push(weapon);
    
        weapon = new Weapon("Axe",Position.createRandomPosition(config.size),30);
        app.listWeapons.push(weapon);
    
        weapon = new Weapon("Dagger",Position.createRandomPosition(config.size),15);
        app.listWeapons.push(weapon);

        weapon = new Weapon("holybible",Position.createRandomPosition(config.size),25);
        app.listWeapons.push(weapon);
    }
    // description: Crée des joueurs et les ajoutes à une liste 
    // params: 
    //      nbrsPlayers:  le nombres de joueur qui participe à la partie 
    createPlayers(nbrsPlayers){
        // creation  des joueurs 
        for(var i = 0; i < nbrsPlayers; i++){
            var name;
           
            name = app.namePlayers();
            var player ;
            player = new Player(Position.createRandomPosition(config.size),
                                 100,
                                new Weapon("fist",new Position(null,null),10,),
                                name,"player"+ i);
           
            
            app.listPlayers.push(player);

        }

    }
    // description: renvoie le  nom entré par le joueur  
    namePlayers(){
       return  prompt("nommez le joueur");
    }
    // description: gére  un tour de jeu   
    ManageOneTurn(){
        $(".case").off("click mouseenter");
        app.currentPlayer.movement = config.movement;
        app.displayHUD(app.currentPlayer);
        
        $(".case").on("mouseenter",function(){
            
            var position = new Position($(this).data("x"), $(this).data("y"));
           
            this.path = app.currentPlayer.position.pathfinding(position, app.currentPlayer.movement);
            
            $(".color-path").removeClass("color-path"); 
            if(this.path != null){
             for(var element of this.path){
                var mycase = app.map.findCase(element);
                mycase.domElement.addClass("color-path");
               
                }
            }
            
        }); 

        $(".case").on("click",function(){
            if(this.path != null){
            var position = new Position($(this).data("x"), $(this).data("y"));
            
            for(var myPosition of this.path){
             app.currentPlayer.move(myPosition);
             app.currentPlayer.movement -=1;

            }
            $(".color-path").removeClass("color-path"); 
            app.checkColision();
                if(app.currentPlayer.movement == 0 ){
                    var indexPlayer = app.listPlayers.indexOf(app.currentPlayer);
                    if(indexPlayer < app.listPlayers.length -1){
                        app.currentPlayer = app.listPlayers[indexPlayer +1]; 
                        
                    }
                    else{
                        app.currentPlayer = app.listPlayers[0];
                    }
                    
                    app.ManageOneTurn();
                }    
               
            }
        });
     
        
    }
    checkPlayer(position){
        return this.listPlayers.some( myplayer => myplayer.position.x  == position.x  &&   myplayer.position.y == position.y);
       }
    // description: Verifie les colisions entre les joueurs 

    checkColision(){
        for(var player of this.listPlayers){    

            if(player != this.currentPlayer){
                var dist = this.currentPlayer.position.distance(player.position);
                     if(dist == 1){
                        console.log("ok !");
                        $("#fightHud").css( "visibility","visible" );
                        app.fight(app.currentPlayer,player);
                        dist = 0;
                     break;
                     }
                 }
             }
        }
    // description: fonction récursive qui gère les combats entre joueurs  
    // params: 
    //      player1:  un joueur engagé en combat
    //      player2:  un deuxième joueur engagé en combat 
    fight(player1,player2){
    
        
            $( ".action" ).one( "click" , function () {
                $(".action").off("click");
                switch($(this).data("action")){
                    case "att":
                    
                    player1.attack(player2);
                    
                    break;
                    case "def":
                      player1.defend();    
                    break;
                }
                app.displayHUD(player2);
                if(player1.life > 0 && player2.life > 0 ){
                   
                    
                    app.fight(player2,player1);

                    
                } 
                else{
                    if(player1.life > 0)
                    {
                        $(".modal-content").html(""+ player1 + " à gagné la partie <br/> <span class='message'>Commencer une partie ! </span>");
                    }
                    else if(player2.life > 0)
                    {
                        $(".modal-content").html(""+ player2 + " à gagné la partie <br/> <span class='message'>Commencer une partie ! </span>"); 
                    }
                    app.callModal();
                    
                }
                
            });
            
           
        
       
    }
    // description: nettoie les variables pour une nouvelle partie
    // et pmrèpare l'affichage  pour cette nouvelle partie 
    clearGame(){
        this.map = null;
        this.listPlayers = new Array();
        this.listWeapons = new Array();
        this.currentPlayer = null;
        this.path = null;
        $('#gameDiv').html('');

    }

	
}



