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
      >
        {{ step }}
      </div>
    </div>

    <div class="my-step-content">
      <div v-for="(step, index) in steps" :key="index" v-show="index === currentStep">
        <h2>{{ step }}</h2>
        <div v-show="index === 1">
          <progress :max="totalQuestions" :value="currentQuestionIndex + 1"></progress>
          <span>{{ currentQuestionIndex + 1 }} / {{ totalQuestions }}</span>
          <div>
            <h3>{{ currentQuestion.question }}</h3>
            <div class="question-container">
              <div
                v-for="(answer, key) in currentQuestion.answers"
                :key="`question_${index}_answer_${key}`"
                class="option"
                @click="checkAnswer"
              >
                <input
                  type="radio"
                  :id="`question_${index}_answer_${key}`"
                  :name="`question_answer_${index}`"
                />
                <label :for="`question_${index}_answer_${key}`">{{ answer.text }}</label>
              </div>
            </div>
          </div>
          <div>
            <button
              @click="nextQuestion"
              :disabled="!selectedOption"
              class="btn btn-warning text-white"
            >
              Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-step-buttons">
      <button v-if="currentStep > 0" @click="currentStep--" class="my-step-button">Back</button>

      <button @click="moveToNext" :disabled="currentStep === steps.length" class="my-step-button">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questions: {
      type: Array,
      required: true
    }
  },
  methods: {
    moveToNext() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++
      } else {
        alert('all done!')
      }
    },
    // when click div with class option check the input radio
    checkAnswer(event) {
      const input = event.target.querySelector('input')
      input.checked = true
      // foreach option add class active and remove class active from other options
      const options = event.target.parentElement.querySelectorAll('.option')
      options.forEach((option) => {
        option.classList.remove('active')
      })
      event.target.classList.add('active')
      this.selectedOption = input.id
    },
    nextQuestion() {
      // if the current question is the last question then show the score
      if (this.currentQuestionIndex === this.questions.length - 1) {
        this.currentStep = 2
        return
      }
      this.currentQuestionIndex++
      this.selectedOption = null
    }
  },
  data() {
    return {
      currentQuestionIndex: 0,
      selectedOption: null,
      currentStep: 0,
      steps: ['info', 'quiz', 'score']
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex]
    },
    totalQuestions() {
      return this.questions.length
    }
  }
}
</script>

<style scoped>
.my-stepper {
  display: flex;
  flex-direction: column;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}
progress {
  width: 100%;
  height: 10px;
  background-color: #ddd;
}

progress::-webkit-progress-value {
  background-color: orange;
}
.my-step-header {
  display: flex;
  justify-content: space-around;
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
  min-height: 60vh;
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
.option {
  list-style: none;
  margin: 10px 0;
  padding: 25px;
  background-color: #2c2b26b3;
  color: white;
  min-height: 200px;
}
.question-container {
  /* display grid repeat 1 fr four times in large screen and 2 en medium screen and 1fr in small screen */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
  /* make minimum hight is 200px of each template */
}
.option.active {
  background-color: orange;
}

input[type='radio'] {
  visibility: hidden;
}
</style>
