<template>
  <div class="chessehc">
    <div v-for="(board, index) in boards" :key="index">
      <div class="board">
        <div
          v-for="(square, index) in board.squares"
          :key="index"
          :set="((x = index % 8), (y = Math.floor(index / 8)))"
        >
          <div
            class="square"
            v-bind:class="squareColor(square, x, y)"
            @click="clickSquare(square, x, y)"
          >
            <div class="piece" v-if="square.piece">
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
class Piece {
  owner: Owner;
  constructor(owner: Owner) {
    this.owner = owner;
  }
  text() {
    return this.owner == Owner.me ? "▲" : "▼";
  }
}
interface Square {
  piece: Piece | null;
  is_selected: boolean;
}

interface Board {
  squares: Square[];
}

import { defineComponent } from "vue";

export default defineComponent({
  name: "Chessehc",
  data() {
    return {
      boards: [] as Board[],
      selected_square: null as null | Square,
    };
  },
  mounted() {
    this.boards = Array(3)
      .fill({})
      .map((e) => ({
        squares: Array(8 * 8)
          .fill({})
          .map((e) => ({ piece: null, is_selected: false })),
      }));
    this.boards[1].squares[20].piece = new Piece(Owner.you);
    this.boards[1].squares[50].piece = new Piece(Owner.me);
  },
  methods: {
    clickSquare(square: Square, x: number, y: number) {
      if (this.selected_square) {
        if (square !== this.selected_square) {
          square.piece = this.selected_square.piece;
          this.selected_square.piece = null;
        }
        this.selected_square.is_selected = false;
        this.selected_square = null;
      } else {
        if (square.piece) {
          this.selected_square = square;
          square.is_selected = true;
          console.log(square.piece, x, y);
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
  width: 320px;
  height: 320px;
  border: 4px solid black;
  margin-bottom: 50px;
  margin-left: 100px;
}
.square {
  width: 40px;
  height: 40px;
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
  background-color: rgb(127, 127, 236);
}
.piece {
  font-size: 40px;
}
</style>