class Position{

    constructor(x,y){
        this.x = x;
        this.y = y;

    }
    // description: génère une coordonnée x et une coordonée y 
    //puis crée un objet position avec comme parametre les deux coordonnées
    // params : 
    //      size:la valeur maximale pour une coordonnée 
    //      typeCoord: x ou y
    // retour : un nouvel objet position
    static createRandomPosition(size){

        var x;
        var y;
        x = Math.floor(Math.random() * size );
        y = Math.floor(Math.random() * size );
        var pos = new Position(x,y);
        if(pos.isWall()){
           return Position.createRandomPosition(size);
        }
        else{
            return pos;
        }
        

    }

    // description:
    // retour : la fonction qui verifie si une case est mur    
    isWall(){
       return app.map.checkWall(this);
    }
    // description: cherche une case adjacente à la case courante
    // params : 
    //      position:la destination
    //      typeCoord: x ou y
    // retour : une nouvelle coordonée d'une case adjacente 
    casefinding(position,typeCoord){
        if (position[typeCoord] < this[typeCoord] ){
            return  this[typeCoord] - 1;
        }
        else if (position[typeCoord] > this[typeCoord]){
            return  this[typeCoord]  + 1;
        }
        else if(position[typeCoord]== this[typeCoord]) {
            return  this[typeCoord];
        }
    
    }

    // description: cherche un chemin entre deux positions 
    //              dont le nombre de case parcouru est inferieur ou egale  à une valeur
    // params : 
    //      position:la destination
    //      Drestant: le déplacement restant
    //      path: un tableau contenant le chemin
    // retour :  le chemin
    pathfinding(position,Drestant,path=[]){
        if(Drestant > 0 ){
            var newPosition = new Position(null,null);
            newPosition.x = this.casefinding(position,"x");
            newPosition.y = this.y;
             
             if (newPosition.x == this.x){
                newPosition.y = this.casefinding(position,"y");
             }
             if (newPosition.isWall() || app.checkPlayer(newPosition)){
                 newPosition.x = this.x;
                newPosition.y = this.casefinding(position,"y");
                 
                 if(newPosition.isWall() || app.checkPlayer(newPosition) ){
                     console.log("no move ! ");
                 }
             }
             else  {
                 
             path.push(newPosition); 
                if(position.isEquals(newPosition)){
                    return path;
                }else{
                    return  newPosition.pathfinding(position,Drestant -1,path);
                }
            
             }
         }
         else{
             
             return path;
         }

    }
    // description: Calcul la distance entre deux positions 
    // params : 
    //      position: la position à comparer
    // retour : distance 
    distance(position){
        return Math.abs(position.x - this.x) + Math.abs(position.y - this.y);
    }
    // description: test l'égalité entre deux positions
    // params : 
    //      position: la position à comparer
    // retour : l'égalité ou non entre les deux positions
    isEquals(position){

        return position.x == this.x && position.y == this.y;
    }




}