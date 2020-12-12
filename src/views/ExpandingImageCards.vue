<template>
  <div class="container">
    <div class="panel"
         :class="{'active': pic.isActive}"
         v-for="(pic) in picArray" :key="pic.id"
         :style="{'background-image': `url(${pic.url})`}"
         @click="renderActive(pic)"
    >
      <h3>{{pic.text}}</h3>
    </div>
  </div>
</template>

<script>
export default {
name: "ExpandingImageCards",
  data () {
    return {
      picArray: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          text: 'Explore The World',
          isActive: true
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          text: 'Wild Forest',
          isActive: false
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
          text: 'Sunny Beach',
          isActive: false
        },
        {
          id: 4,
          url: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
          text: 'City on Winter',
          isActive: false
        },
        {
          id: 5,
          url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          text: 'Mountains - Clouds',
          isActive: false
        }
      ]
    }
  },
  methods: {
    renderActive (pic) {
      this.picArray = this.picArray.map(p => {
        if (pic.id === p.id) return {...p, isActive: true}
        else return {...p, isActive: false}
      })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
}

.panel {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 80vh;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  flex: 0.5;
  margin: 10px;
  position: relative;
  -webkit-transition: all 700ms ease-in;
}

.panel h3 {
  font-size: 24px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  opacity: 0;
}

.panel.active {
  flex: 5;
}

.panel.active h3 {
  opacity: 1;
  transition: opacity 0.3s ease-in 0.4s;
}

@media (max-width: 480px) {
  .container {
    width: 100vw;
  }

  .panel:nth-of-type(4),
  .panel:nth-of-type(5) {
    display: none;
  }
}
</style>
