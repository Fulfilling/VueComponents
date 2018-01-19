<template>
  <input
    type="email"
    :name="name"
    :id="id"
    @keyup="verify"
    v-model="inputVal"
    />
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'EmailInputValidate',
    components: {
      axios
    },
    props: {
      value: {
        type: String,
        required: true
      },
      apiKey: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: false,
        default: 'email'
      },
      id: {
        type: String,
        required: false,
        default: 'field_email'
      },
      checkLevel: {
        type: String,
        default: 'deliverable',
        validator: (value) => ['deliverable', 'risky', 'unknown'].indexOf(value) !== -1
      }
    },
    data () {
      return {
        inputVal: this.value,
        resultOptions: {
          deliverable: {
            allowed: ['deliverable'],
            tradution: 'entregável'
          },
          risky: {
            allowed: ['deliverable', 'risky'],
            tradution: 'arriscado'
          },
          unknown: {
            allowed: ['deliverable', 'risky', 'unknown'],
            tradution: 'desconhecido'
          },
          undeliverable: {
            allowed: [],
            tradution: 'não entregue'
          }
        }
      }
    },
    methods: {
      verify () {
        if (!this.$_textIsEmail(this.inputVal)) {
          this.$emit('isValid', false, '', '')
          return false
        }
        let axiosData = {
          method: 'get',
          url: 'https://api.fulfilling.io/verify?email=' + this.inputVal + '&api_key=' + this.apiKey
        }
        axios(axiosData).then(response => {
          if (response.status !== 200) {
            this.$emit('isValid', false, response.data.message, response.data.did_you_mean)
            return false
          }
          if (this.resultOptions[this.checkLevel].allowed.indexOf(response.data.result) >= 0) {
            this.$emit('isValid', true, '', '')
            return false
          }
          this.$emit('isValid', false, this.resultOptions[response.data.result].tradution, response.data.did_you_mean)
        }).catch(error => {
          this.$emit('isValid', false, error.message, '')
        })
      },
      $_textIsEmail (text) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(text.toLowerCase())
      }
    },
    watch: {
      inputVal (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
