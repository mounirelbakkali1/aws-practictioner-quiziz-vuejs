<template>
  <div class="my-stepper">
    <div class="my-step-header">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="[
          'my-step-header-item',
          { active: index === currentStep, passed: index < currentStep }
        ]"
        @click="currentStep = index"
      >
        {{ step }}
      </div>
    </div>

    <div class="my-step-content">
      <div v-for="(step, index) in steps" :key="index" v-show="index === currentStep">
        <h2>{{ step }}</h2>
        <p>This is custom content for step {{ index }}.</p>
      </div>
    </div>

    <div class="my-step-buttons">
      <button v-if="currentStep > 0" @click="currentStep--" class="my-step-button">Back</button>

      <button
        @click="moveToNext"
        :disabled="currentStep === steps.length - 1"
        class="my-step-button"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    moveToNext() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++
      } else {
        alert('all done!')
      }
    }
  },
  data() {
    return {
      currentStep: 0,
      steps: ['Step 1', 'Step 2', 'Step 3']
    }
  }
}
</script>

<style>
.my-stepper {
  display: flex;
  flex-direction: column;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}

.my-step-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.my-step-header-item {
  font-weight: bold;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.my-step-header-item.active {
  background-color: #bdac95;
  color: #fff;
}

.my-step-header-item.passed {
  background-color: #ff9a00b8;
  color: #fff;
}

.my-step-content {
  margin-bottom: 20px;
}

.my-step-buttons {
  display: flex;
  justify-content: flex-end;
}

.my-step-button {
  margin-left: 10px;
  background-color: #001f53;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.my-step-button:hover:not(:disabled) {
  background-color: #0062cc;
}
</style>
