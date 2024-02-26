import { minLength } from '@vuelidate/validators';
import { REQUIRED_LABEL } from '@data/constants';

export const passwordMixin = {
  data () {
    return {
      passwordValidation: { minLength: minLength(6) },
    };
  },
  methods: {
    passwordError (validationObj) {
      if (validationObj.required.$response === false) return REQUIRED_LABEL;
      if (validationObj.minLength.$response === false) return 'Le mot de passe doit contenir au minimum 6 caractères.';
      return '';
    },
    passwordConfirmError (validationObj) {
      if (validationObj.required.$response === false) return REQUIRED_LABEL;
      if (validationObj.sameAs.$response === false) return 'Le mot de passe doit être identique.';
      return 'Mot de passe invalide.';
    },
  },
};
