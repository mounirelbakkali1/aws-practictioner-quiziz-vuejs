<script>
export default {
  props: {
    currentQuestion: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
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
      this.$emit('selectedOption', [input.id.split('_')[1], new Number(input.id.split('_')[3]) + 1])
    }
  }
}
</script>

<template>
  <div>
    <h3>{{ currentQuestion.question }}</h3>
    <div class="question-container">
      <div
        v-for="(answer, key) in currentQuestion.options"
        :key="`question_${index}_answer_${key}`"
        class="option"
        @click="checkAnswer"
      >
        <input
          type="radio"
          :id="`question_${index}_answer_${key}`"
          :name="`question_answer_${index}`"
        />
        {{ answer.content }}
      </div>
    </div>
  </div>
</template>

<style></style>
