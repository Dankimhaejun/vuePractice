<template>
  <div>
    <div id="screen" v-bind:class="state" @click="onClickScreen">
      {{ message }}
    </div>
    <template v-if="result.length">
      <div>평균시간 : {{ average }}ms</div>
      <button @click="onReset">리셋</button>
    </template>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;

export default {
  data() {
    return {
      result: [],
      state: 'waiting',
      message: '클릭해서 시작하세요.'
      // average: 0
    };
  },
  computed: {
    average() {
      return (
        this.result.reduce((prev, curr) => prev + curr, 0) /
          this.result.length || 0
      );
    }
  },
  methods: {
    onReset() {
      this.result = [];
    },
    onClickScreen() {
      if (this.state === 'waiting') {
        this.state = 'ready';
        this.message = '초록색이 되면 클릭하세요';
        setTimeout(() => {
          this.state = 'now';
          this.message = '지금 클릭하세요';
          startTime = new Date();
        }, Math.floor(Math.random() * 1000 + 2000));
      } else if (this.state === 'ready') {
        clearTimeout(timeout);
        this.state = 'waiting';
        this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요!';
      } else if (this.state === 'now') {
        endTime = new Date();
        this.state = 'waiting';
        this.message = '클릭해서 시작하세요';
        this.result.push(endTime - startTime);
      }
    }
  }
};
</script>

<style scoped>
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}
#screen.waiting {
  background-color: aqua;
}
#screen.ready {
  background-color: red;
}
#screen.now {
  background-color: green;
}
</style>
