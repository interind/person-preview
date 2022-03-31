<script>
  export default {
    props: {
      classForm: String,
      validator: Function,
      msgError: String,
      nameInput: String,
      modifier: String,
      valueCheck: String,
      msgPlaceholder: String,
      modelValue: String,
      modelModifiers: {
        default: () => ({})
      }
    },
    emits: ['update:modelValue'],
    data: () => ({
      inputClass: '',
    }),
    methods: {
      emitValue(e) {
        let value = e.target.value;
        if (this.modelModifiers.capitalize && value.length > 1) {
          value = `${value[0].toUpperCase()}${value.slice(1)}`;
        }
        this.$emit('update:modelValue', value)
      },
      createClassElement(str) {
        const classEl = `${this.classForm}__${str}`;
        return this.modifier ? `${classEl} ${classEl}_${this.modifier}` : classEl;
      },
      createModForInput() {
        if (this.msgError) {
          this.inputClass = `${this.createClassElement('input')} ${this.createClassElement('input')}_invalid`;
        }
        else if (this.valueCheck && !this.msgError) {
          this.inputClass = `${this.createClassElement('input')} ${this.createClassElement('input')}_valid`;
        } else {
          this.inputClass = this.createClassElement('input');
        }
      },
    },
    computed: {
      createModForPlaceholder() {
        if (this.valueCheck) {
          return `${this.createClassElement('placeholder')} ${this.createClassElement('placeholder')}_focus`;
        }
        return this.createClassElement('placeholder');
      },
      classNameLabel() {
        return this.createClassElement('label');
      },
      classNameError() {
        if (this.msgError) {
          return `${this.createClassElement('error')} ${this.createClassElement('error')}_active`;
        }
        return this.createClassElement('error');
      },
    },
    mounted() {
      if (this.valueCheck) {
          this.inputClass = `${this.createClassElement('input')} ${this.createClassElement('input')}_autofill`;
        }
      else {
        this.inputClass = this.createClassElement('input');
      }
    },
  }
</script>

<template>
  <label :for="nameInput" :class="classNameLabel">
    <input
      v-bind="$attrs"
      :name="nameInput"
      :class="inputClass"
      :value="modelValue"
      @blur="createModForInput"
      @input="emitValue"
      @change="validator"
    />
    <span :class="createModForPlaceholder">{{msgPlaceholder}}</span>
    <span :class="classNameError">{{msgError}}</span>
  </label>
</template>