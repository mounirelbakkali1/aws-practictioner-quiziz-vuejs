<script>
import Question from './QuestionComponent.vue'
export default {
  components: {
    Question
  },
  props: {
    questions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      steps: ['info', 'quiz', 'score'],
      currentQuestionIndex: 0,
      selectedOption: null,
      selectedOptions: new Set(),
      currentStep: 0,
      interval: null,
      counterInterval: null,
      counter: 10,
      score: 0,
      template: '',
      i: 0
    }
  },

  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex]
    },
    totalQuestions() {
      return this.questions.length
    }
  },
  watch: {
    currentStep(val) {
      switch (val) {
        case 0:
          this.currentQuestionIndex = 0
          this.selectedOptions.clear()
          break
        case 1:
          this.counterInterval = setInterval(() => {
            this.counter--
          }, 1000)
          this.interval = setInterval(() => {
            if (this.currentQuestionIndex === this.questions.length - 1) {
              this.moveToNext()
              clearInterval(this.interval)
            }
            this.nextQuestion()
          }, 10000)
          break
        case 2:
          clearInterval(this.interval)
          clearInterval(this.counterInterval)
          this.calculateScore()
          // for each question create a template to show the correct answer with green color and the selected answer with red color if the selected answer is wrong

          this.template = ''
          this.i = 0
          this.questions.forEach((question, index) => {
            let options = ''
            let _class = ''
            //let test = false;
            question.options.forEach((option) => {
              const selectedAnswer = Array.from(this.selectedOptions).find(
                (option) => option[0] == index
              )
              if (
                selectedAnswer[1] == question.answers.correct &&
                question.answers.correct == option.id
              ) {
                _class = 'correct'
              } else if (
                selectedAnswer[1] != question.answers.correct &&
                selectedAnswer[1] == option.id
              )
                _class = 'wrong'
              else _class = ''
              options += `<div class="option ${_class}"><div style="display:flex"><span>${option.id}</span>${option.content}</div></div>`
            })

            this.template += `
        <div>
        <p>Question ${question.id}/10}</p>
        <h3 style="padding:30px 0px">${question.question}</h3>
          ${options}
          <p class='score_question_comment'><img src='../assets/img/icons8-ok-48.png'>${question.answers.comment}</p>
        </div>`
            this.i++
          })

          // this.questions.forEach((question, index) => {
          //   const selectedAnswer = Array.from(this.selectedOptions).find(
          //     (option) => option[0] == index
          //   )

          //   this.template += `
          //     <div class="question-container">
          //       <h6>${question.question}</h6>
          //       <div class="option ${
          //         selectedAnswer && selectedAnswer[1] == question.answers.correct
          //           ? 'correct'
          //           : 'wrong'
          //       }">
          //         <input type="radio" id="question_${index}_answer_${
          //     question.answers.correct - 1
          //   }" name="question_answer_${index}" checked />
          //               <label for="question_${index}_answer_${question.answers.correct - 1}">${
          //     question.options[question.answers.correct - 1].content
          //   }</label>
          //       </div>
          //       ${
          //         selectedAnswer && selectedAnswer[1] != question.answers.correct
          //           ? `
          //         <div class="option wrong">
          //           <input type="radio" id="question_${index}_answer_${
          //               selectedAnswer[1] - 1
          //             }" name="question_answer_${index}" checked />
          //           <label for="question_${index}_answer_${selectedAnswer[1] - 1}">${
          //               question.options[selectedAnswer[1] - 1].content
          //             }</label>
          //         </div>
          //       `
          //           : ''
          //       }
          //     </div>
          //   `
          // })

          break
      }
    },
    selectedOption(val) {
      if (val != null) this.selectedOptions.add(val)
    },
    currentQuestionIndex(val) {
      if (val === this.questions.length - 1) {
        console.table(Array.from(this.selectedOptions))
        this.moveToNext()
        return
      }
    }
  },

  methods: {
    moveToNext() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++
      } else {
        clearInterval(this.counterIntervals)
      }
    },

    nextQuestion() {
      document.querySelectorAll('.option').forEach((option) => {
        option.classList.remove('active')
      })
      // if the current question is the last question then show the score
      this.currentQuestionIndex++
      this.selectedOption = null
      this.counter = 10
    },
    calculateScore() {
      const correctAnswers = this.questions.map((question) => question.answers.correct)
      // compare the correct answers with the selected answers and calculate the score
      this.score = correctAnswers.reduce((acc, curr, index) => {
        const selectedAnswer = Array.from(this.selectedOptions).find((option) => option[0] == index)
        if (selectedAnswer && selectedAnswer[1] === curr) {
          return acc + 1
        }
        return acc
      }, 0)
      console.log('correctAnswers', correctAnswers)
      this.$emit('score', this.score)
    }
  }
}
</script>
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
          <p>{{ counter }} seconds</p>
          <progress :max="totalQuestions" :value="currentQuestionIndex + 1"></progress>
          <span>{{ currentQuestionIndex + 1 }} / {{ totalQuestions }}</span>
          <Question
            :currentQuestion="currentQuestion"
            :index="currentQuestionIndex"
            @selectedOption="selectedOption = $event"
          />
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
        <div v-show="index === 2">
          <div v-html="template"></div>
          <div>
            <h3>Your score is {{ score }} / {{ totalQuestions }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="my-step-buttons">
      <!-- <button v-if="currentStep > 0" @click="currentStep--" class="my-step-button">Back</button> -->
      <button
        @click="moveToNext"
        :disabled="currentStep === steps.length - 1 || currentStep === 1"
        class="my-step-button"
      >
        Next
      </button>
    </div>
  </div>
</template>
<style>
.wrong {
  border: 3px solid red !important;
}
.correct {
  border: 3px solid green !important;
}
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
