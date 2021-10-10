<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Fast Typing Application</h1>
      <p class="lead">
        Press the space button to change the word
      </p>

      <div v-if="isFinished" class="card">
        <div class="alert alert-success">END GAME</div>
        <div class="card-body">
          True : {{ trueCount }} - False : {{ falseCount }}
        </div>
      </div>

      <div v-else class="head-card">
        <div class="card">
          <div class="card-body">
            <span
              :class="index == 0 ? writingWordComputed : null"
              class="words"
              v-for="(word, index) in words.filter((word, index) => index < 30)"
              >{{ word }}
            </span>
          </div>
        </div>
        <div class="input-group mt-3">
          <input
            type="text"
            class="form-control"
            placeholder="Recipient's username"
            v-model="writingWord"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary disabled" type="button">
              {{ time }} sn.
            </button>
            <button
              @click="updated"
              class="btn btn-outline-secondary"
              type="button"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wordlist from "../assets/words.json";
// import wordlist from "../assets/words_dictionary.json";

export default {
  data() {
    return {
      words: [],
      writingWord: null,
      isTrue: true,
      time: 60,
      trueCount: 0,
      falseCount: 0,
      isFinished: false,
      isContinue: false,
      wordlist: wordlist,
    };
  },

  watch: {
    writingWord(val) {
      if (!this.isContinue) {
        this.timeProccess();
      }

      let word = this.words[0].slice(0, val.length);
      let userWord = val.replace(" ", "");
      console.log(this.isFinished);
      this.isTrue = word === userWord;

      if (val.indexOf(" ") !== -1) {
        if (this.isTrue) {
          this.trueCount++;
        } else {
          this.falseCount++;
        }
        this.words.splice(0, 1);
        this.writingWord = null;
      }
    },
  },
  computed: {
    writingWordComputed: function() {
      return this.isTrue ? "firstWord words" : "words bg-danger";
    },
  },

  methods: {
    timeProccess: function() {
      this.isContinue = true;

      let interval = setInterval(this.toggleTime, 1000);
    },
    toggleTime: function() {
      if (this.time <= 0) {
        this.time = 0;
        this.isFinished = true;
      } else {
        this.time--;
      }
    },
    updated: function() {
      location.reload();
    },
  },

  mounted() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.ceil(Math.random() * 150);
    this.words = this.wordlist.sort(() => Math.random() - 0.5).splice(0, 200);
    // this.words = this.wordlist.splice(0, 5);
  },
};
</script>

<style scoped>
.words {
  margin-right: 10px;
  font-size: 22px;
  border-radius: 5px;
  padding: 5px 10px;
}

.firstWord {
  background-color: #898787;
}
</style>
