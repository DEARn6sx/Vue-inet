<template>
  <v-container class="calculator-container background">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-card-title>
            <h1 class="text-h6">Grade Calculator</h1>
          </v-card-title>
          <v-card-text>
            <!-- Input field for the score -->
            <div class="text-center">
              <label for="score">Input Score</label>
              <v-text-field v-model="score" id="score" label="Score"></v-text-field>
            </div>

            <!-- Button to calculate grade -->
            <v-btn color="success" @click="calculateGrade" class="mt-4">Calculate Grade</v-btn>

            <!-- Display calculated results -->
            <div v-if="showResults" class="text-center mt-4">
              <h2 class="text-h6">Results:</h2>
              <h1>Grade is : {{ letterGrade }}</h1>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      score: 0,
      letterGrade: '',
      showResults: false,
    };
  },
  methods: {
    calculateGrade() {
      // Calculate total score, percentage, and letter gr

      if (this.score >= 80 && this.score <=  100) {
        this.letterGrade = 'A';
      } else if (this.score >= 70 && this.score <=  79) {
        this.letterGrade = 'B';
      } else if (this.score >= 60 && this.score <=  69) {
        this.letterGrade = 'C';
      } else if (this.score >= 50 && this.score <=  59) {
        this.letterGrade = 'D';
      } else if (this.score >= 0 && this.score <=  49) {
        this.letterGrade = 'F';
      } else {
        this.letterGrade = 'บ่';
      }
      // Set showResults to true to display the calculated results
      this.showResults = true;
    },
  },
};
</script>


<style scoped>
.calculator-container {
  height: 100vh; /* Full viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}

.background {
  background-color: #7a7878; /* Set your desired shade of grey */
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: 500;
}
</style>