export default class {
  constructor(board) {
  	this.arr = board.map(item => [...item].filter(key => key != " "));
		this.hexArr = [       [-1,0],[-1,1],
					  			[0,-1],        [0,1],
					  			[1,-1],[1,0]        ];
		this.array_hex = [];
		this.array_poligon = [];
		this.win = "";
		this.winner_hex = [];
		this.winner_p = [];	
  }

  findHexOrPoligon(a,b){
		return this.hexArr.some( item => (a[0]+item[0] == b[0] && a[1]+item[1] == b[1]) )
	}

	thereIsField(multiArray,arr){
		return multiArray.some( item => this.pushField(item,arr) )
	}

	pushField(bigArr,smallArr){
		return bigArr.some( key => this.findHexOrPoligon(smallArr,key) )
	}

	hexPoligon(arrHP,str){
		this.arr.map( (item,i) => item.map( (key,j) => this.findNeighborhoods(arrHP,key,str,i,j) ) );
	}

	findWinner(arr1,arr2,arr,n){
		arr1.map( item => {
			item.reduce((acm,value) => {
				if(!arr2.includes(value[n])){
					arr2.push(value[n])
					return arr2;
				}
			},arr2)
			if(arr2.length != arr.length && arr){
				arr2 = [];
			}
		} )
	}

	hexOrPoligon(){
		if(this.winner_hex.length == this.arr[0].length){
			this.win = "X";
		}
		if(this.winner_p.length == this.arr.length){
			this.win = "O";
		}
		return this.win;
	}

	findNeighborhoods(array,field,hexPoligon,hIndex,pIndex){
		let mArr = [hIndex,pIndex];
		if(field != hexPoligon){
			return;
		}
		if(array.length == 0){
			array.push([mArr]);
			return;
		}
		let count_arr = [];
		for(let c=0;c<array.length;c++){
			for(let k=0;k<array[c].length;k++){
				if(!this.findHexOrPoligon(mArr,array[c][k])){
					continue;
				}
				count_arr.push(c);
				if(count_arr.length == 2){
					let concatArr = array[count_arr[0]].concat(array[count_arr[1]]);
					array[c] = concatArr;
					array.splice(count_arr[0],1);
					c--;
					count_arr = [];
					continue;
				}
				if(this.pushField(array[c],mArr)){
					array[c].push(mArr);
					break
				}
			}
		}
		if(!this.thereIsField(array,mArr)){
			array.push([mArr]);
		}
	}

  winner(number) {
  	this.hexPoligon(this.array_hex,"X");
		this.hexPoligon(this.array_poligon,"O");
		this.findWinner(this.array_hex,this.winner_hex,this.arr[0],1);
		this.findWinner(this.array_poligon,this.winner_p,this.arr,0);
  	return this.hexOrPoligon();
  }
}
