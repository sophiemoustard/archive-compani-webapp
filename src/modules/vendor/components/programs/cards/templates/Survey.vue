<template>
  <div>
    <ni-input caption="Question" v-model="card.question" required-field @focus="saveTmp('question')"
      @blur="updateCard('question')" :error="v$.card.question.$error" :error-message="questionErrorMsg"
      :disable="disableEdition" />
    <q-checkbox v-model="card.isMandatory" @update:model-value="updateCard('isMandatory')" label="Réponse obligatoire"
      class="q-mb-lg" dense :disable="disableEdition" />
    <div class="row gutter-profile">
      <ni-input class="col-md-6 col-xs-12" caption="Label gauche" v-model="card.label.left"
        @focus="saveTmp('label.left')" @blur="updateCardLabel('left')" :error="v$.card.label.left.$error"
        :error-message="labelErrorMessage('left')" :disable="disableEdition" />
      <ni-input class="col-md-6 col-xs-12" caption="Label droit" v-model="card.label.right"
        @focus="saveTmp('label.right')" @blur="updateCardLabel('right')" :error="v$.card.label.right.$error"
        :error-message="labelErrorMessage('right')" :disable="disableEdition" />
    </div>
  </div>
</template>

<script>
import set from 'lodash/set';
import get from 'lodash/get';
import useVuelidate from '@vuelidate/core';
import { required, requiredIf, maxLength } from '@vuelidate/validators';
import Cards from '@api/Cards';
import { NotifyPositive, NotifyNegative, NotifyWarning } from '@components/popup/notify';
import Input from '@components/form/Input';
import { SURVEY_LABEL_MAX_LENGTH, QUESTION_MAX_LENGTH } from '@data/constants';
import { templateMixin } from 'src/modules/vendor/mixins/templateMixin';

export default {
  name: 'Survey',
  props: {
    disableEdition: { type: Boolean, default: false },
  },
  components: {
    'ni-input': Input,
  },
  mixins: [templateMixin],
  setup () {
    return { v$: useVuelidate() };
  },
  validations () {
    return {
      card: {
        question: { required, maxLength: maxLength(QUESTION_MAX_LENGTH) },
        label: {
          left: {
            required: requiredIf(!!get(this.card, 'label.right')),
            maxLength: maxLength(SURVEY_LABEL_MAX_LENGTH),
          },
          right: {
            required: requiredIf(!!get(this.card, 'label.left')),
            maxLength: maxLength(SURVEY_LABEL_MAX_LENGTH),
          },
        },
      },
    };
  },
  methods: {
    labelErrorMessage (label) {
      if (get(this.v$, `card.label.${label}.required.$response`) === false) {
        return 'Les 2 labels doivent être renseignés ou vides.';
      }
      if (get(this.v$, `card.label[${label}].maxLength.$response`) === false) {
        return `${SURVEY_LABEL_MAX_LENGTH} caractères maximum.`;
      }

      return '';
    },
    async updateCardLabel (label) {
      try {
        if (this.tmpInput === this.card.label[label]) return;

        this.v$.card.label.$touch();
        if (get(this.v$, `card.label[${label}].maxLength.$response`) === false) {
          return NotifyWarning('Champ(s) invalide(s)');
        }

        await Cards.updateById(this.card._id, set({}, `label.${label}`, this.card.label[label].trim()));

        await this.refreshCard();
        NotifyPositive('Carte mise à jour.');
      } catch (e) {
        console.error(e);
        NotifyNegative('Erreur lors de la mise à jour de la carte.');
      }
    },
  },
};
</script>
