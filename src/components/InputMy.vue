<script>
  export default {
    props: {
      nameInput: String,
      typeInput: String,
      classForm: String,
      validator: Function,
      msgError: String,
      modelValue: String,
      modelModifiers: {
        default: () => ({})
      }
    },
    emits: ['update:modelValue'],
    methods: {
      emitValue(e) {
        let value = e.target.value
        if (this.modelModifiers.capitalize && value.length > 1) {
          value = `${value[0].toUpperCase()}${value.slice(1)}`;
        }
        this.$emit('update:modelValue', value)
      }
    },
    computed: {
      classNameLabel() {
        return `${this.classForm}__label`;
      },
      classNameInput() {
        return `${this.classForm}__input`;
      },
      classNameError() {
        if (this.msgError) {
          return `${this.classForm}__error ${this.classForm}__error_active`;
        }
        return `${this.classForm}__error`;
      },
    }
  }
</script>

<template>
  <label :for="nameInput" :class="classNameLabel">
    <input
      :id="nameInput"
      :type="typeInput"
      :name="nameInput"
      :class="classNameInput"
      :value="modelValue"
      @input="emitValue"
      @change="validator"
    />
    <span :class="classNameError">{{msgError}}</span>
  </label>
</template>