<template>
  <div class="main_wrapper">
    <canvas id="canvas" :width="canvas.width" :height="canvas.height"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp"
            @mousemove="onMouseMove"
    ></canvas>
    <div class="toolbox">
      <button id="decrease" @click="decreaseBtn">-</button>
      <span id="size">{{brushSize}}</span>
      <button id="increase" @click="increaseBtn">+</button>
      <input type="color" id="color" v-model="color" />
      <button id="clear" @click="clear">Clear</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DrawingTool",
    data () {
      return {
        canvas: {
          width: 800,
          height: 500
        },
        brushSize: 30,
        isPressed: false,
        x: undefined,
        y: undefined,
        ctx: null,
        color: "black"
      }
    },
    mounted() {
      this.ctx = document.querySelector('canvas').getContext("2d")
    },
    methods: {
      onMouseDown (e) {
        this.isPressed = true
        this.x = e.offsetX
        this.y = e.offsetY
      },
      onMouseUp () {
        this.isPressed = false
        this.x = undefined;
        this.y = undefined;
      },
      onMouseMove (e) {
        if (this.isPressed) {
          const x2 = e.offsetX;
          const y2 = e.offsetY;

          this.drawCircle(x2, y2);
          this.drawLine(this.x, this.y, x2, y2);
          this.x = x2;
          this.y = y2;
        }
      },
      drawCircle(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.brushSize, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill()
      },
      drawLine(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.brushSize * 2;
        this.ctx.stroke();
      },
      increaseBtn () {
        this.brushSize += 5
        if (this.brushSize > 50) {
          this.brushSize = 50
        }
      },
      decreaseBtn () {
        this.brushSize -= 5
        if (this.brushSize < 5) {
          this.brushSize = 5
        }
      },
      clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }
</script>

<style scoped>
  .main_wrapper {
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    min-height: 100vh;
  }

  canvas {
    border: 2px solid #2c3e50;
  }

  .toolbox {
    background-color: #2c3e50;
    border: 1px solid #2c3e50;
    display: flex;
    padding: 1rem;
    width: 804px;
  }

  .toolbox > * {
    background-color: #fff;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    margin: 0.25rem;
    height: 50px;
    width: 50px;
    cursor: pointer;
  }

  #decrease, #increase, #size {
    font-size: 2rem;
  }
  .toolbox > *:last-child {
    margin-left: auto;
  }
  @media only screen and (max-width: 768px) {
    .main_wrapper {
      display: none;
    }
  }
</style>
