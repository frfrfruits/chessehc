<template>
  <div class="chessehc">
    <div v-for="board in reverseBoards" :key="board.time">
      t = {{ board.time }}
      <div class="board">
        <div v-for="(square, index) in board.squares.value" :key="index">
          <div
            class="square"
            v-bind:class="
              squareColor(
                square,
                index % board.squares.width,
                Math.floor(index / board.squares.width)
              )
            "
            @click="
              clickSquare(
                square,
                index % board.squares.width,
                Math.floor(index / board.squares.width),
                board.time
              )
            "
          >
            <div
              class="piece"
              v-bind:class="square.piece.styleClass()"
              v-if="square.piece"
            >
              {{ square.piece.text() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
enum Owner {
  me,
  you,
}

enum Tense {
  past,
  present,
  future,
}

enum TimeDirection {
  forward,
  inverted,
}
function MoveForwardPieces(data: Chessehc, x: number, y: number, t: number) {
  // suppress error
  if (data.selected_square === null) {
    return;
  }

  const selected_board_index = data.boards.findIndex((e) => e.time === t)!;

  let current_board = data.boards[selected_board_index];
  let next_board = data.boards[selected_board_index + 1];
  if (next_board === undefined) {
    // make future board
    data.boards.push(current_board.makeFuture());
  } else {
    const boards_size = data.boards.length;

    // move future pieces
    // copy future pieces
    for (let i = selected_board_index + 1; i < boards_size; ++i) {
      let board_i_selected_square = data.boards[i].squares.at(
        data.selected_square.x,
        data.selected_square.y
      );
      let board_i_clicked_square = data.boards[i].squares.at(x, y);
      if (
        board_i_clicked_square.piece === null ||
        (board_i_clicked_square.piece.direction === TimeDirection.forward &&
          board_i_clicked_square.piece.tense === Tense.future)
        // TODO: case that both forward and inverted future pieces in the same square
      ) {
        board_i_clicked_square.piece = board_i_selected_square.piece;
      } else {
        // blocked by other piece
        break;
      }
    }
    // delete future selected pieces
    for (let i = selected_board_index + 1; i < boards_size; ++i) {
      let board_i_selected_square = data.boards[i].squares.at(
        data.selected_square.x,
        data.selected_square.y
      );
      if (
        board_i_selected_square.piece !== null &&
        board_i_selected_square.piece.direction === TimeDirection.forward &&
        board_i_selected_square.piece.tense === Tense.future
      ) {
        board_i_selected_square.piece = null;
      } else {
        // blocked by other piece
        break;
      }
    }
  }
  // change tense of past pieces
  for (let i = selected_board_index - 1; i >= 0; --i) {
    let board_i_selected_square = data.boards[i].squares.at(
      data.selected_square.x,
      data.selected_square.y
    );
    let board_i_selected_piece_tence = board_i_selected_square.piece!.tense;
    board_i_selected_square.piece!.tense = Tense.past;
    if (board_i_selected_piece_tence === Tense.present) {
      // blocked by present piece
      break;
    }
  }
}
function MoveInvertedPieces(data: Chessehc, x: number, y: number, t: number) {
  // suppress error
  if (data.selected_square === null) {
    return;
  }

  let selected_board_index = data.boards.findIndex((e) => e.time === t)!;

  let current_board = data.boards[selected_board_index];
  let next_board = data.boards[selected_board_index - 1];
  if (next_board === undefined) {
    // make future board
    data.boards.unshift(current_board.makePast());
    selected_board_index = selected_board_index + 1;
  } else {
    // move future pieces
    // copy future pieces
    for (let i = selected_board_index - 1; i >= 0; --i) {
      let board_i_selected_square = data.boards[i].squares.at(
        data.selected_square.x,
        data.selected_square.y
      );
      let board_i_clicked_square = data.boards[i].squares.at(x, y);
      if (
        board_i_clicked_square.piece === null ||
        (board_i_clicked_square.piece.direction === TimeDirection.inverted &&
          board_i_clicked_square.piece.tense === Tense.future)
        // TODO: case that both forward and inverted future pieces in the same square
      ) {
        board_i_clicked_square.piece = board_i_selected_square.piece;
      } else {
        // blocked by other piece
        break;
      }
    }
    // delete future selected pieces
    for (let i = selected_board_index - 1; i >= 0; --i) {
      let board_i_selected_square = data.boards[i].squares.at(
        data.selected_square.x,
        data.selected_square.y
      );
      if (
        board_i_selected_square.piece !== null &&
        board_i_selected_square.piece.direction === TimeDirection.inverted &&
        board_i_selected_square.piece.tense === Tense.future
      ) {
        board_i_selected_square.piece = null;
      } else {
        // blocked by other piece
        break;
      }
    }
  }
  const boards_size = data.boards.length;
  // change tense of past pieces
  for (let i = selected_board_index + 1; i < boards_size; ++i) {
    let board_i_selected_square = data.boards[i].squares.at(
      data.selected_square.x,
      data.selected_square.y
    );
    let board_i_selected_piece_tence = board_i_selected_square.piece!.tense;
    board_i_selected_square.piece!.tense = Tense.past;
    if (board_i_selected_piece_tence === Tense.present) {
      // blocked by present piece
      break;
    }
  }
}

class Piece {
  owner: Owner;
  tense: Tense;
  direction: TimeDirection;
  constructor(owner: Owner, tense: Tense, direction: TimeDirection) {
    this.owner = owner;
    this.tense = tense;
    this.direction = direction;
  }
  text() {
    return this.owner == Owner.me ? "▲" : "▼";
  }
  styleClass() {
    switch (this.tense) {
      case Tense.past:
        return this.direction === TimeDirection.forward
          ? "piece-forward-past"
          : "piece-inverted-past";
      case Tense.present:
        return this.direction === TimeDirection.forward
          ? "piece-forward-present"
          : "piece-inverted-present";
      case Tense.future:
        return this.direction === TimeDirection.forward
          ? "piece-forward-future"
          : "piece-inverted-future";
    }
  }
  clone() {
    return new Piece(this.owner, this.tense, this.direction);
  }
  makeFuture() {
    if (this.tense === Tense.present) {
      if (this.direction === TimeDirection.forward) {
        return new Piece(this.owner, Tense.future, this.direction);
      } else {
        return null;
      }
    } else {
      return new Piece(this.owner, this.tense, this.direction);
    }
  }
  makePast() {
    if (this.tense === Tense.present) {
      if (this.direction === TimeDirection.forward) {
        return null;
      } else {
        return new Piece(this.owner, Tense.future, this.direction);
      }
    } else {
      return new Piece(this.owner, this.tense, this.direction);
    }
  }
  invert() {
    this.direction =
      this.direction === TimeDirection.forward
        ? TimeDirection.inverted
        : TimeDirection.forward;
  }
}

class Square {
  piece: Piece | null;
  constructor(piece: Piece | null) {
    this.piece = piece;
  }
  clone() {
    return new Square(this.piece ? this.piece.clone() : null);
  }
  makeFuture() {
    return new Square(this.piece ? this.piece.makeFuture() : null);
  }
  makePast() {
    return new Square(this.piece ? this.piece.makePast() : null);
  }
}
class Squares {
  width: number;
  value: Square[];
  constructor(width: number, value: Square[]) {
    this.width = width;
    this.value = value;
  }
  static empty(x: number, y: number) {
    return new Squares(
      x,
      Array(x * y)
        .fill({})
        .map((e) => new Square(null))
    );
  }
  at(x: number, y: number) {
    return this.value[y * this.width + x];
  }
  makeFuture() {
    return new Squares(
      this.width,
      this.value.map((e) => e.makeFuture())
    );
  }
  makePast() {
    return new Squares(
      this.width,
      this.value.map((e) => e.makePast())
    );
  }
}

class SelectedSquare {
  square_ref: Square;
  piece_ref: Piece;
  x: number;
  y: number;
  t: number;
  constructor(
    square_ref: Square,
    piece_ref: Piece,
    x: number,
    y: number,
    t: number
  ) {
    this.square_ref = square_ref;
    this.piece_ref = piece_ref;
    this.x = x;
    this.y = y;
    this.t = t;
  }
  clone() {
    return new SelectedSquare(
      this.square_ref,
      this.piece_ref,
      this.x,
      this.y,
      this.t
    );
  }
}

class Board {
  time: number;
  squares: Squares;
  constructor(time: number, squares: Squares) {
    this.time = time;
    this.squares = squares;
  }
  makeFuture() {
    return new Board(this.time + 1, this.squares.makeFuture());
  }
  makePast() {
    return new Board(this.time - 1, this.squares.makePast());
  }
}

import { defineComponent } from "vue";

interface Chessehc {
  boards: Board[];
  selected_square: null | SelectedSquare;
}

export default defineComponent({
  name: "Chessehc",
  data() {
    return {
      boards: [] as Board[],
      selected_square: null as null | SelectedSquare,
    } as Chessehc;
  },
  mounted() {
    let obj = Squares.empty(8, 8);
    this.boards = [new Board(0, obj)];
    for (let i = 0; i < 16; ++i) {
      this.boards[0].squares.value[i].piece = new Piece(
        Owner.you,
        Tense.present,
        TimeDirection.forward
      );
    }
    for (let i = 0; i < 16; ++i) {
      this.boards[0].squares.value[48 + i].piece = new Piece(
        Owner.me,
        Tense.present,
        TimeDirection.forward
      );
    }
    this.boards[0].squares.value[62].piece!.direction = TimeDirection.inverted;
    this.boards[0].squares.value[63].piece!.direction = TimeDirection.inverted;
    this.boards.push(this.boards[0].makeFuture());
    this.boards.unshift(this.boards[0].makePast());
  },
  methods: {
    clickSquare(square: Square, x: number, y: number, t: number) {
      if (this.selected_square === null) {
        // select
        if (square.piece) {
          if (square.piece.tense === Tense.future) {
            this.selected_square = new SelectedSquare(
              square,
              square.piece,
              x,
              y,
              t
            );
          }
        }
        return;
      }

      // if click same square
      if (square === this.selected_square.square_ref) {
        // cancel
        this.selected_square = null;
        return;
      }

      // move
      if (this.selected_square.t === t) {
        // move current piece
        square.piece = this.selected_square.piece_ref;
        square.piece.tense = Tense.present;
        this.selected_square.square_ref.piece = null;

        let selected_direction = this.selected_square.piece_ref.direction;
        if (selected_direction === TimeDirection.forward) {
          MoveForwardPieces(this, x, y, t);
        } else {
          MoveInvertedPieces(this, x, y, t);
        }

        this.selected_square = null;
      }
    },
    squareColor(square: Square, x: number, y: number) {
      if (
        this.selected_square !== null &&
        this.selected_square.square_ref === square
      ) {
        return "square-moving";
      }
      return (x + y) % 2 == 0 ? "square-black" : "square-white";
    },
  },
  computed: {
    reverseBoards(): Board[] {
      return this.boards.slice().reverse();
    },
  },
});
</script>

<style scoped>
.board {
  width: 256px;
  height: 256px;
  border: 4px solid black;
  margin-bottom: 50px;
  margin-left: 100px;
}
.square {
  width: 32px;
  height: 32px;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}
.square-black {
  background-color: rgb(160, 108, 41);
}
.square-white {
  background-color: rgb(255, 251, 230);
}
.square-moving {
  background-color: rgb(127, 236, 132);
}
.piece {
  font-size: 30px;
}
.piece-forward-past {
  color: rgb(116, 18, 38);
}
.piece-forward-present {
  color: crimson;
}
.piece-forward-future {
  color: rgb(245, 198, 207);
}
.piece-inverted-past {
  color: rgb(10, 10, 93);
}
.piece-inverted-present {
  color: rgb(26, 26, 204);
}
.piece-inverted-future {
  color: rgb(169, 169, 240);
}
</style>
