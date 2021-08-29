<template>
  <div class="chessehc">
    <div v-for="board in boards" :key="board.time">
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
        return new Piece(this.owner, Tense.past, this.direction);
      }
    } else {
      return new Piece(this.owner, this.tense, this.direction);
    }
  }
  makePast() {
    if (this.tense === Tense.present) {
      if (this.direction === TimeDirection.forward) {
        return new Piece(this.owner, Tense.past, this.direction);
      } else {
        return new Piece(this.owner, Tense.future, this.direction);
      }
    } else {
      return new Piece(this.owner, this.tense, this.direction);
    }
  }
}

class Square {
  piece: Piece | null;
  is_selected: boolean;
  constructor(piece: Piece | null, is_selected: boolean) {
    this.piece = piece;
    this.is_selected = is_selected;
  }
  clone() {
    return new Square(this.piece ? this.piece.clone() : null, this.is_selected);
  }
  makeFuture() {
    return new Square(
      this.piece ? this.piece.makeFuture() : null,
      this.is_selected
    );
  }
  makePast() {
    return new Square(
      this.piece ? this.piece.makePast() : null,
      this.is_selected
    );
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
        .map((e) => new Square(null, false))
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

class SquarePoint {
  square: Square;
  x: number;
  y: number;
  t: number;
  constructor(square: Square, x: number, y: number, t: number) {
    this.square = square;
    this.x = x;
    this.y = y;
    this.t = t;
  }
  clone() {
    return new SquarePoint(this.square, this.x, this.y, this.t);
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

export default defineComponent({
  name: "Chessehc",
  data() {
    return {
      boards: [] as Board[],
      selected_square: null as null | SquarePoint,
    };
  },
  mounted() {
    let obj = Squares.empty(8, 8);
    this.boards = [new Board(0, obj)];
    this.boards[0].squares.value[20].piece = new Piece(
      Owner.you,
      Tense.present,
      TimeDirection.forward
    );
    this.boards[0].squares.value[40].piece = new Piece(
      Owner.me,
      Tense.present,
      TimeDirection.inverted
    );
    this.boards[0].squares.value[50].piece = new Piece(
      Owner.me,
      Tense.present,
      TimeDirection.forward
    );
    this.boards.push(this.boards[0].makeFuture());
    this.boards.unshift(this.boards[0].makePast());
  },
  methods: {
    clickSquare(square: Square, x: number, y: number, t: number) {
      if (this.selected_square !== null && this.selected_square.t === t) {
        if (square !== this.selected_square.square) {
          // square.piece = this.selected_square.piece;
          // this.selected_square.piece = null;
          let selected_direction = this.selected_square.square.piece!.direction;
          let moving_time =
            selected_direction === TimeDirection.forward ? 1 : -1;
          let next_time = t + moving_time;
          let next_board = this.boards.find((e) => e.time === next_time)!;
          let next_next_time = next_time + moving_time;
          let clicked_next_time_square = next_board.squares.at(x, y);
          let selected_next_time_square = next_board.squares.at(
            this.selected_square.x,
            this.selected_square.y
          );
          clicked_next_time_square.piece = selected_next_time_square.piece;
          clicked_next_time_square.piece!.tense = Tense.present;
          selected_next_time_square.piece = null;
          let next_next_board = this.boards.find(
            (e) => e.time === next_next_time
          );
          this.selected_square.square.piece!.tense = Tense.past;
          if (next_next_board === undefined) {
            if (selected_direction === TimeDirection.forward) {
              this.boards.push(next_board.makeFuture());
            } else {
              this.boards.unshift(next_board.makePast());
            }
          }
        }
        this.selected_square.square.is_selected = false;
        this.selected_square = null;
      } else {
        if (square.piece) {
          if (square.piece.tense === Tense.present) {
            this.selected_square = new SquarePoint(square, x, y, t);
            square.is_selected = true;
          }
        }
      }
    },
    squareColor(square: Square, x: number, y: number) {
      if (square.is_selected) {
        return "square-moving";
      }
      return (x + y) % 2 == 0 ? "square-black" : "square-white";
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
