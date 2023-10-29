class Board {
    board : Hexagon[][]
    noOfLayers: number = 1
    constructor(noOfLayers: number){
        //the idea for this board is to have an array of layers
        // each layer would have a number of hexagons 
        let root = new Hexagon(0)
        this.board = [[root]]// an array of layers 
        this.noOfLayers = noOfLayers

        for( let i = 1; i < noOfLayers; i++){
            let thisLayer: Hexagon[] = []
            let previousLayer: Hexagon[] = this.board[i-1]
            for(let i = 0; i< previousLayer.length; i++){
                let testLayer = previousLayer[i].generate_neighbours()
                console.log(testLayer)
                thisLayer = thisLayer.concat(testLayer)
            }
            
            this.board.push(thisLayer)
        }
    }
}
class Hexagon {
    layer: number 
    sides: (Hexagon|null)[] = []
    constructor(layer: number){
        this.layer =  layer
        this.sides = []
        for(let i = 0; i < 6; i++){
            this.sides.push(null)
        }
    }
    generate_opposite_direction(direction){
        if (direction < 3){
            return direction + 3 
        }
        else return direction -3
    }
    generate_neighbours() {
        let newlyCreatedHexagons:(Hexagon)[] = []
        for(let i = 0; i < this.sides.length;i++){
            if (this.sides[i] == null){ 
                let newHexagon = new Hexagon(this.layer+1)
                this.sides[i] = newHexagon
                newHexagon.sides[this.generate_opposite_direction(i)] = this 
                newlyCreatedHexagons.push(newHexagon)   
            }
        }
        for(let i=0; i <= this.sides.length; i++){
            if(this.sides[i] != null && this.sides[i+1] != null){
                let og_hex = this.sides[i] as Hexagon
                let connecting_hex  = this.sides[i+1] as Hexagon
                let connecting_side = this.generate_opposite_direction(i)
                
                if (connecting_side == 0){
                    og_hex.sides[5] = connecting_hex
                    connecting_hex.sides[this.generate_opposite_direction(connecting_side-1)] = og_hex
                }
                else{
                    og_hex.sides[connecting_side-1] = connecting_hex
                    connecting_hex.sides[this.generate_opposite_direction(connecting_side-1)] = og_hex
                    
                }
            } 
            if(this.sides[i]!= null && this.sides[0] != null && i == this.sides.length-1){
                let og_hex = this.sides[i] as Hexagon
                let connecting_hex = this.sides[0] as Hexagon
                let connecting_side = this.generate_opposite_direction(i)
                og_hex.sides[connecting_side-1] = connecting_hex
                connecting_hex.sides[this.generate_opposite_direction(connecting_side-1)] = og_hex
            }
        }
        return newlyCreatedHexagons
    }   

}