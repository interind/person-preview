<script>
  export default {
    props: {
      nameInput: String,
      typeInput: String,
      classForm: String,
      validator: Function,
      msgError: String,
      modifier: String,
      msgPlaceholder: String,
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
      },
      createClassElements(str) {
        const classEl = `${this.classForm}__${str}`;
        return this.modifier ? `${classEl} ${classEl}_${this.modifier}` : classEl;
      }
    },
    computed: {
      classNameLabel() {
        return this.createClassElements('label');
      },
      classNamePlaceholder() {
        return this.createClassElements('placeholder');
      },
      classNameInput() {
        return this.createClassElements('input');
      },
      classNameError() {
        if (this.msgError) {
          return `${this.createClassElements('error')} ${this.createClassElements('error')}_active`;
        }
        return this.createClassElements('error');
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
    <span :class="classNamePlaceholder">{{msgPlaceholder}}</span>
    <span :class="classNameError">{{msgError}}</span>
  </label>
</template>