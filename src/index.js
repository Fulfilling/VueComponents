import EmailInputValidate from './EmailInputValidate'
module.exports = EmailInputValidate

EmailInputValidate.install = Vue => Vue.component(EmailInputValidate.name, EmailInputValidate)
EmailInputValidate.version = proccess.env.VERSION

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EmailInputValidate)
}
