<template>
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
    <button @click="nextQuestion" :disabled="!selectedOption" class="btn btn-warning text-white">
      Next Question
    </button>
  </div>
</template>

<script></script>
