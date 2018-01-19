# How use a Email Validate component

```html
<template>
  <form>
    <fieldset>
      <label for="field_email">E-mail:</label>
      <email-validate-component
      	:id="field_email"
        :apiKey="'my-api-key-fulfilling'"
        v-on:isValid="validateEmail"
        v-model="email">
      </email-validate-component>
    </fieldset>
    <fieldset>
      <button type="submit" @click.prevent="send">Send</button>
    </fieldset>
  </form>
</template>

<script>
  import EmailValidateComponent from './emailValidate.vue';

  export default {
    components: { EmailValidateComponent },
    data () {
      return {
        email,
        emailValidation: {
          isValid: false,
          message: '',
          didYouMean: ''
        }
      }
    },
    methods: {
      validateEmail (status, message, helper) {
        this.emailValidation.isValid = status
        this.emailValidation.message = message
        this.emailValidation.didYouMean = helper
      },
      send () {
        if (!this.emailValidation.isValid) {
          alert(
            'O e-mail informado é '
            + (this.emailValidation.message.length ? this.emailValidation.message : 'inválido')
            + (this.emailValidation.didYouMean.length ? '. Você quis dizer "' + this.emailValidation.didYouMean + '"' : '')
          )
          return false
        }
      }
    }
  }
</script>
```
