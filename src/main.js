import Vue from 'vue'
import App from './App.vue'

Vue.directive("color", {
  bind(el,binding){
    if(binding.arg === 'bck' ){
      el.style.color = binding.value
    }else{
      el.style.color = 'red'
    }
    
  }

});


new Vue({
  el: '#app',
  render: h => h(App)
})
