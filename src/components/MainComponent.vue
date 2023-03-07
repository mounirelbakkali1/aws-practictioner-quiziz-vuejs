<script>
import Steper from './SteperComponent.vue'
export default {
  components: { Steper },
  data: () => {
    return {
      questions: [
        {
          id: 1,
          question:
            'What is the name of the AWS service that allows you to create a virtual private network?',
          answers: [
            { id: 1, text: 'AWS VPN', correct: false },
            { id: 2, text: 'AWS VPC', correct: true },
            { id: 3, text: 'AWS VPN Gateway', correct: false },
            { id: 4, text: 'AWS VPC Gateway', correct: false }
          ]
        },
        {
          id: 2,
          question:
            'What is the name of the AWS service that allows you to create a virtual private network?',
          answers: [
            { id: 1, text: 'AWS VPN', correct: false },
            { id: 2, text: 'AWS VPC', correct: true },
            { id: 3, text: 'AWS VPN Gateway', correct: false },
            { id: 4, text: 'AWS VPC Gateway', correct: false }
          ]
        },
        {
          id: 3,
          question:
            'What is the name of the AWS service that allows you to create a virtual private network?',
          answers: [
            { id: 1, text: 'AWS VPN', correct: false },
            { id: 2, text: 'AWS VPC', correct: true },
            { id: 3, text: 'AWS VPN Gateway', correct: false },
            { id: 4, text: 'AWS VPC Gateway', correct: false }
          ]
        },
        {
          id: 4,
          question:
            'What is the name of the AWS service that allows you to create a virtual private network?',
          answers: [
            { id: 1, text: 'AWS VPN', correct: false },
            { id: 2, text: 'AWS VPC', correct: true },
            { id: 3, text: 'AWS VPN Gateway', correct: false },
            { id: 4, text: 'AWS VPC Gateway', correct: false }
          ]
        },
        {
          id: 5,
          question:
            'What is the name of the AWS service that allows you to create a virtual private network?',
          answers: [
            { id: 1, text: 'AWS VPN', correct: false },
            { id: 2, text: 'AWS VPC', correct: true },
            { id: 3, text: 'AWS VPN Gateway', correct: false },
            { id: 4, text: 'AWS VPC Gateway', correct: false }
          ]
        }
      ]
    }
  }
}
</script>

<template>
  <div>
    <Steper :questions="questions" />
  </div>
</template>
