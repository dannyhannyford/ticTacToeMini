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
        this.gameOver = false;
        this.winner = "Draw";
        this.render();
        this.renderText();
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
                box.addEventListener('click', () => this.mark(idx,cdx));
                tRow.appendChild(box)
            })
            tableBody.append(tRow);
        })

        table.appendChild(tableBody);
        //table
        document.body.appendChild(table);
        // //Restart button
        const rsButton = document.createElement('button');
        rsButton.innerText = 'Restart Game';
        rsButton.addEventListener('click', () => this.boardWipe());
        document.body.appendChild(rsButton);
    }
    
    renderText() {
        //currentPlayer
        const header = document.createElement('header');
        if(this.gameOver) {
            header.innerText = this.winner+ " wins!";
            document.body.appendChild(header);
        } else {
            header.innerText = this.player+ "'s Turn";
            document.body.appendChild(header);
        }
    }

    clear() {
        let oldTable = document.querySelector('table');
        oldTable.parentNode.removeChild(oldTable);
        let head = document.querySelector('header');
        head.parentNode.removeChild(head);
        let button = document.querySelector('button');
        button.parentNode.removeChild(button);
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
        this.player = this.x;
        this.gameOver = false;
        this.winner = 'Draw';
        this.renderText();
    }

    //y === top middle bottom
    //x === left middle right
    mark(y, x) {
        if (this.player === this.x) {
            if (this.board[y][x].length === 0) {
                this.board[y][x].push('X');
                this.clear();
                this.checkBoardState();
                this.render();
                if (this.gameOver === false) {
                    this.player = this.o;
                }
                this.renderText();
            }
        } else {
            if (this.board[y][x].length === 0) {
                this.board[y][x].push('O');
                this.clear();
                this.checkBoardState();
                this.render();
                if (this.gameOver === false) {
                    this.player = this.x;
                }
                this.renderText();
            }
        }
    }

    checkBoardState() {
        //checking horizontally
        //checks if board is full for draw condition
        let total = 0;
        this.board.forEach( row => {
            let ocount = 0;
            let xcount = 0;
            row.forEach( col => {
                if(col[0] === 'X') {
                    xcount++;
                    total++;
                    if (xcount >= 3) {
                        this.win(this.player);
                    } else if (total === 9) {
                        this.win();
                    }
                }
                if (col[0] === 'O') {
                    ocount++
                    total++
                    if (ocount >= 3) {
                        this.win(this.player);
                    } else if (total === 9) {
                        this.win();
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
                //console.log('row[i]', row[i]);
                if(row[i] === 'X') {
                    xcount++;
                    if (xcount >= 3) {
                        this.win(this.player);
                    }
                }
                if (row[i] === 'O') {
                    ocount++
                    if (ocount >= 3) {
                        this.win(this.player);
                    }
                }
            })
        }
        //checking diagonally
        //yes this is lazy
        if (this.board[1][1] === 'X') {
            if (this.board[0][0] === 'X' && this.board [2][2] === 'X') {
                this.win(this.player);
            }
            if (this.board[2][0] === 'X' && this.board[0][2] === 'X') {
                this.win(this.player);
            }
        }
        if (this.board[1][1] === 'O') {
            if (this.board[0][0] === 'O' && this.board [2][2] === 'O') {
                this.win(this.player);
            }
            if (this.board[2][0] === 'O' && this.board[0][2] === 'O') {
                this.win(this.player);
            }
        }
    }

    //render winner or draw message
    win(player) {
        this.gameOver = true;
        if (player) {
            this.winner = this.player
        }
        
    }
    
    

}
//click to set up a new game
let tic = new Board;