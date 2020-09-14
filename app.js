class Board {
    constructor() {
        this.board = [
            [[], [], []],
            [[], [], []],
            [[], [], []]
        ];
        this.x = 'X';
        this.o = 'O';
        this.player = this.x;
        
        this.render();
    }
    render() {
        //on click mark(this.player, y x)
        const table = document.createElement('table');
        const tableBody = document.createElement('tbody');

        this.board.forEach( (row, idx) => {
            let tRow = document.createElement('tr');

            row.forEach( (col, cdx) => {
                let box = document.createElement('td');
                box.appendChild(document.createTextNode(col));
                tRow.appendChild(box)
            })
            tableBody.append(tRow);
        })

        table.appendChild(tableBody);
        // //Restart button
        // table.appendChild()
        document.body.appendChild(table);
    }

    clear() {
        let oldTable = document.querySelector('table');
        oldTable.parentNode.removeChild(oldTable);
    }


        //y === top middle bottom
        //x === left middle right
    mark(player, y, x) {
        if (player === this.x) {
            if (this.board[y][x].length === 0) {
                this.board[y][x].push(this.x);
                this.clear();
                this.render();
                this.checkBoardState();
                this.player = this.y;
            }
        } else {
            if (this.board[y][x].length === 0) {
                this.board[y][x].push(this.y);
                this.clear();
                this.render();
                this.checkBoardState();
                this.player = this.x;
            }
        }
    }

    checkBoardState() {
        //checking horizontally
        //checks if board is full for draw
        let total = 0;
        this.board.forEach( row => {
            let ocount = 0;
            let xcount = 0;
            row.forEach( col => {
                if(col === this.x) {
                    xcount++;
                    total++;
                    if (xcount === 3) {
                        this.win(this.player);
                    } else if (total === 9) {
                        this.win();
                    }
                }
                if ( col === this.o) {
                    ocount++
                    total++
                    if (ocount === 3) {
                        win(this.player);
                    } else if (total === 9) {
                        win();
                    }
                }
            });
        })
        //checking vertically
        //go through the column
        for (let i = 0; i < 3; i++) {
            let xcount = 0;
            let ocount = 0;
            this.board.forEach( (row, rdx) => {
                if(row[i] === 1) {
                    xcount++;
                    if (xcount === 3) {
                        this.win(this.player);
                    }
                }
                if ( row[i] === 0) {
                    ocount++
                    if (ocount === 3) {
                        this.win(this.player);
                    }
                }
            })
        }
        //checking diagonally
        total = 0;
        if (this.board[1][1] === 0) {
            if (this.board[0][0] === 0 && this.board [2][2] === 0) {
                this.win(this.player)
            }
            if (this.board[2][0] === 0 && this.board[0][2] === 0) {
                this.win(this.player)
            }
        }
        if (this.board[1][1] === 1) {
            if (this.board[0][0] === 1 && this.board [2][2] === 1) {
                this.win(this.player)
            }
            if (this.board[2][0] === 1 && this.board[0][2] === 1) {
                this.win(this.player)
            }
        }
    }

    //render winner or draw message
    win(player = 'draw') {
        if (player === this.x) {
            console.log('X wins');
        } else if (player === this.y) {
            console.log('O wins');
        } else {
            console.log(player);
        }
    }
    //reset board
    boardWipe() {
        this.board.forEach( row => {
            row.forEach( col  => {
                col.pop();
            })
        })
        this.clear();
        this.render();
    }
    

}
//click to set up a new game
let tic = new Board;