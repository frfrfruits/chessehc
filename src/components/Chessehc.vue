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
function InvertTimeDirection(direction: TimeDirection) {
  return direction === TimeDirection.forward
    ? TimeDirection.inverted
    : TimeDirection.forward;
}

function DeleteFutureSelectedPieces(
  data: Chessehc,
  current_board: Board,
  direction: TimeDirection
) {
  // suppress error
  if (data.selected_square === null) {
    return;
  }

  for (let board of current_board.futureBoards(direction)) {
    let board_i_selected_square = board.squares.at(
      data.selected_square.x,
      data.selected_square.y
    );
    if (
      board_i_selected_square.piece !== null &&
      board_i_selected_square.piece.direction === direction &&
      board_i_selected_square.piece.tense === Tense.future
    ) {
      board_i_selected_square.piece = null;
    } else {
      // blocked by other piece
      break;
    }
  }
}

function MovePieces(data: Chessehc, x: number, y: number, t: number) {
  // suppress error
  if (data.selected_square === null) {
    return;
  }

  let direction = data.selected_square.piece_ref.direction;
  let current_board = data.boards.at(t);
  let next_board = current_board.peekNext(direction);
  if (next_board === undefined) {
    // make future board
    data.boards.makeNew(direction);
  } else {
    // move future pieces
    // copy future pieces
    for (let board of current_board.futureBoards(direction)) {
      let board_i_selected_square = board.squares.at(
        data.selected_square.x,
        data.selected_square.y
      );
      let board_i_clicked_square = board.squares.at(x, y);
      if (
        board_i_clicked_square.piece === null ||
        (board_i_clicked_square.piece.direction === direction &&
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
    DeleteFutureSelectedPieces(data, current_board, direction);
  }
  // change tense of past pieces
  for (let board of current_board.futureBoards(
    InvertTimeDirection(direction)
  )) {
    let board_i_selected_square = board.squares.at(
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

function DeleteInvertedFutureSelectedPieces(
  data: Chessehc,
  selected_board_index: number
) {
  // suppress error
  if (data.selected_square === null) {
    return;
  }

  for (let i = selected_board_index - 1; i >= 0; --i) {
    let board_i_selected_square = data.boards.value[i].squares.at(
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
    return this;
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
  boards_ref: Boards;
  constructor(time: number, squares: Squares, boards_ref: Boards) {
    this.time = time;
    this.squares = squares;
    this.boards_ref = boards_ref;
  }
  makeFuture() {
    return new Board(this.time + 1, this.squares.makeFuture(), this.boards_ref);
  }
  makePast() {
    return new Board(this.time - 1, this.squares.makePast(), this.boards_ref);
  }
  peekNext(direction: TimeDirection) {
    return this.boards_ref.at(
      this.time + (direction === TimeDirection.forward ? 1 : -1)
    );
  }
  peekPrevious(direction: TimeDirection) {
    return this.boards_ref.at(
      this.time + (direction === TimeDirection.forward ? -1 : 1)
    );
  }
  futureBoards(direction: TimeDirection) {
    return this.boards_ref.futureBoards(this.time, direction);
  }
}

class BoardIterator {
  boards: Boards;
  index: number;
  direction: TimeDirection;
  boards_size: number;
  constructor(boards: Boards, t: number, direction: TimeDirection) {
    this.boards = boards;
    this.index = boards.value.findIndex((e) => e.time === t);
    this.direction = direction;
    this.boards_size = boards.value.length;
  }
  next() {
    if (this.direction === TimeDirection.forward) {
      this.index++;
    } else {
      this.index--;
    }
    const boards = this.boards;
    const i = this.index;
    const boards_size = this.boards_size;
    return {
      value: boards.value[i],
      done: this.direction === TimeDirection.forward ? i >= boards_size : i < 0,
    };
  }
}

class Boards {
  value: Board[];
  constructor(value: Board[]) {
    this.value = value;
  }
  at(t: number) {
    return this.value.find((e) => e.time === t)!;
  }
  makeNew(direction: TimeDirection) {
    return direction === TimeDirection.forward
      ? this.makeFuture()
      : this.makePast();
  }
  makeFuture() {
    this.value.push(this.value[this.value.length - 1].makeFuture());
  }
  makePast() {
    this.value.unshift(this.value[0].makePast());
  }
  futureBoards(t: number, direction: TimeDirection) {
    return {
      [Symbol.iterator]: () => {
        return new BoardIterator(this, t, direction);
      },
    };
  }
}

import { defineComponent } from "vue";

interface Chessehc {
  boards: Boards;
  selected_square: null | SelectedSquare;
  will_invert: boolean;
}

export default defineComponent({
  name: "Chessehc",
  data() {
    return {
      boards: new Boards([]),
      selected_square: null as null | SelectedSquare,
      will_invert: false,
    } as Chessehc;
  },
  mounted() {
    let obj = Squares.empty(8, 8);
    this.boards.value = [new Board(0, obj, this.boards)];
    for (let i = 0; i < 16; ++i) {
      this.boards.value[0].squares.value[i].piece = new Piece(
        Owner.you,
        Tense.present,
        TimeDirection.forward
      );
    }
    for (let i = 0; i < 16; ++i) {
      this.boards.value[0].squares.value[48 + i].piece = new Piece(
        Owner.me,
        Tense.present,
        TimeDirection.forward
      );
    }
    this.boards.makeFuture();
    this.boards.makePast();

    // console.log("start");
    // let j = 0;
    // for (let i of this.boards.futureBoards(1, TimeDirection.inverted)) {
    //   j++;
    //   if (j > 10) {
    //     break;
    //   }
    //   console.log(i);
    // }
    // console.log("Lo");
  },
  methods: {
    clickSquare(square: Square, x: number, y: number, t: number) {
      if (this.selected_square === null) {
        // select
        if (square.piece) {
          if (square.piece.tense === Tense.past) {
            return;
          }
          this.selected_square = new SelectedSquare(
            square,
            square.piece,
            x,
            y,
            t
          );
          if (square.piece.tense === Tense.present) {
            this.will_invert = true;
            let direction = this.selected_square.piece_ref.direction;
            DeleteFutureSelectedPieces(this, this.boards.at(t), direction);
            this.selected_square.piece_ref.invert();
            this.selected_square.square_ref = this.boards
              .at(t)
              .peekPrevious(direction)
              .squares.at(x, y);
            this.selected_square.square_ref.piece =
              this.selected_square.piece_ref.clone();
            this.selected_square.square_ref.piece.tense = Tense.future;
            this.selected_square.piece_ref =
              this.selected_square.square_ref.piece;
            this.selected_square.t =
              t + direction === TimeDirection.forward ? -1 : 1;
          }
        }
        return;
      }

      // if click same square
      if (square === this.selected_square.square_ref) {
        // cancel
        if (this.will_invert) {
          this.will_invert = false;
          if (
            this.selected_square.piece_ref.direction === TimeDirection.inverted
          ) {
            this.boards
              .at(this.selected_square!.t + 1)!
              .squares.at(x, y)
              .piece!.invert();
          } else {
            this.boards
              .at(this.selected_square!.t - 1)!
              .squares.at(x, y)
              .piece!.invert();
          }
        }
        this.selected_square = null;
        return;
      }

      // move
      if (this.selected_square.t === t) {
        // move current piece
        square.piece = this.selected_square.piece_ref;
        square.piece.tense = Tense.present;
        this.selected_square.square_ref.piece = null;

        MovePieces(this, x, y, t);

        if (this.will_invert) {
          this.will_invert = false;
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
      return this.boards.value.slice().reverse();
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
