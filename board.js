var Board = /** @class */ (function () {
    function Board(noOfLayers) {
        this.noOfLayers = 1;
        //the idea for this board is to have an array of layers
        // each layer would have a number of hexagons 
        var root = new Hexagon(0);
        this.board = [[root]]; // an array of layers 
        this.noOfLayers = noOfLayers;
        for (var i = 1; i < noOfLayers; i++) {
            var thisLayer = [];
            var previousLayer = this.board[i - 1];
            for (var i_1 = 0; i_1 < previousLayer.length; i_1++) {
                var testLayer = previousLayer[i_1].generate_neighbours();
                console.log(testLayer);
                thisLayer = thisLayer.concat(testLayer);
            }
            this.board.push(thisLayer);
        }
    }
    return Board;
}());
var Hexagon = /** @class */ (function () {
    function Hexagon(layer) {
        this.sides = [];
        this.layer = layer;
        this.sides = [];
        for (var i = 0; i < 6; i++) {
            this.sides.push(null);
        }
    }
    Hexagon.prototype.generate_opposite_direction = function (direction) {
        if (direction < 3) {
            return direction + 3;
        }
        else
            return direction - 3;
    };
    Hexagon.prototype.generate_neighbours = function () {
        var newlyCreatedHexagons = [];
        for (var i = 0; i < this.sides.length; i++) {
            if (this.sides[i] == null) {
                var newHexagon = new Hexagon(this.layer + 1);
                this.sides[i] = newHexagon;
                newHexagon.sides[this.generate_opposite_direction(i)] = this;
                newlyCreatedHexagons.push(newHexagon);
            }
        }
        for (var i = 0; i <= this.sides.length; i++) {
            if (this.sides[i] != null && this.sides[i + 1] != null) {
                var og_hex = this.sides[i];
                var connecting_hex = this.sides[i + 1];
                var connecting_side = this.generate_opposite_direction(i);
                if (connecting_side == 0) {
                    og_hex.sides[5] = connecting_hex;
                    connecting_hex.sides[this.generate_opposite_direction(connecting_side - 1)] = og_hex;
                }
                else {
                    og_hex.sides[connecting_side - 1] = connecting_hex;
                    connecting_hex.sides[this.generate_opposite_direction(connecting_side - 1)] = og_hex;
                }
            }
            if (this.sides[i] != null && this.sides[0] != null && i == this.sides.length - 1) {
                var og_hex = this.sides[i];
                var connecting_hex = this.sides[0];
                var connecting_side = this.generate_opposite_direction(i);
                og_hex.sides[connecting_side - 1] = connecting_hex;
                connecting_hex.sides[this.generate_opposite_direction(connecting_side - 1)] = og_hex;
            }
        }
        return newlyCreatedHexagons;
    };
    return Hexagon;
}());
