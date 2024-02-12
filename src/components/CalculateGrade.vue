<template>
  <div class="background">
  <v-container class="calculator-container " >
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
              <v-text-field v-model="score" label="Score"></v-text-field>
            </div>

            <!-- Button to calculate grade -->
            <v-btn color="success" @click="calculateGrade" class="mt-4">Calculate Grade</v-btn>

            <!-- Display calculated results -->
            <div v-if="showResults" class="text-center mt-4">
              <h2 class="text-h6">Results:</h2>
              <h1>Grade is : {{ Grade }}</h1>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: null,
      Grade: '',
      showResults: false,
    };
  },
  methods: {
    calculateGrade() {
      // Validate input
      if (this.score === null || this.score === '' || isNaN(this.score) || this.score < 0 || this.score > 100) {
        alert('Please input a valid score between 0 and 100.');
        return;
      }

      // Calculate grade
      if (this.score >= 80) {
        this.Grade = 'A';
      } else if (this.score >= 70) {
        this.Grade = 'B';
      } else if (this.score >= 60) {
        this.Grade = 'C';
      } else if (this.score >= 50) {
        this.Grade = 'D';
      } else {
        this.Grade = 'F';
      }

      // Display results
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

  background-color: #5f5c5c; /* Set your desired shade of grey */
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: 500;
}
</style>