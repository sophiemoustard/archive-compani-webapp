<template>
  <div>
    <p class="text-weight-bold">Identité</p>
    <div class="row gutter-profile q-mb-lg">
      <ni-input v-model.trim="userProfile.identity.firstname" caption="Prénom"
        @focus="saveTmp('identity.firstname')" @blur="updateUser('identity.firstname')" />
      <ni-input v-model.trim="userProfile.identity.lastname" caption="Nom" @focus="saveTmp('identity.lastname')"
        @blur="updateUser('identity.lastname')" :error="v$.userProfile.identity.lastname.$error" />
      <ni-select caption="Civilité" :error="v$.userProfile.identity.title.$error" v-model="userProfile.identity.title"
        :options="civilityOptions" @focus="saveTmp('identity.title')" @blur="updateUser('identity.title')" />
      <div class="col-12 col-md-6 row items-center">
        <div class="col-xs-11">
          <ni-input ref="userEmail" name="emailInput" caption="Adresse email" type="email" lower-case
            :error="v$.userProfile.local.email.$error" :error-message="emailError(v$.userProfile)"
            :disable="emailLock" v-model.trim="userProfile.local.email" @focus="saveTmp('local.email')" />
        </div>
        <div :class="['col-xs-1', 'row', 'justify-end', { 'cursor-pointer': emailLock }]">
          <ni-button :icon="lockIcon" color="copper-grey-500" @click="toggleEmailLock(!emailLock)" />
        </div>
      </div>
      <ni-input v-model.trim="userProfile.contact.phone" @focus="saveTmp('contact.phone')"
        :error-message="phoneNbrError(v$.userProfile)" @blur="updateUser('contact.phone')" caption="Téléphone"
        :error="v$.userProfile.contact.phone.$error" />
    </div>
    <div class="row gutter-profile q-mb-xl">
      <ni-input caption="Biographie" v-model="userProfile.biography" type="textarea"
        @blur="updateUser('biography')" @focus="saveTmp('biography')" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { required, email } from '@vuelidate/validators';
import { validationMixin } from '@mixins/validationMixin';
import get from 'lodash/get';
import set from 'lodash/set';
import Users from '@api/Users';
import Input from '@components/form/Input';
import Button from '@components/Button';
import Select from '@components/form/Select';
import { userMixin } from '@mixins/userMixin';
import { TRAINER, CIVILITY_OPTIONS, MR, MRS } from '@data/constants';
import { frPhoneNumber } from '@helpers/vuelidateCustomVal';
import useVuelidate from '@vuelidate/core';

export default {
  name: 'ProfileInfo',
  mixins: [validationMixin, userMixin],
  setup () { return { v$: useVuelidate() }; },
  components: {
    'ni-input': Input,
    'ni-button': Button,
    'ni-select': Select,
  },
  data () {
    return {
      tmpInput: '',
      emailLock: true,
      civilityOptions: CIVILITY_OPTIONS.filter(opt => [MR, MRS].includes(opt.value)),
    };
  },
  validations () {
    return {
      userProfile: {
        identity: { lastname: { required }, title: { required } },
        local: { email: { required, email } },
        contact: { phone: { required, frPhoneNumber } },
      },
    };
  },
  computed: {
    ...mapState({
      userProfile: state => (TRAINER === get(state.main.loggedUser, 'role.vendor.name')
        ? state.main.loggedUser
        : state.userProfile.userProfile),
    }),
    ...mapGetters({ vendorRole: 'main/getVendorRole' }),
  },
  mounted () {
    this.v$.userProfile.$touch();
    this.isLoaded = true;
  },
  methods: {
    saveTmp (path) {
      if (this.tmpInput === '') this.tmpInput = get(this.userProfile, path);
    },
    async updateAlenviUser (path) {
      try {
        const value = get(this.userProfile, path);
        const payload = set({}, path, value);

        await Users.updateById(this.userProfile._id, payload);
        await this.refreshUser();
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async refreshUser () {
      TRAINER === this.vendorRole
        ? await this.$store.dispatch('main/fetchLoggedUser', this.userProfile._id)
        : await this.$store.dispatch('userProfile/fetchUserProfile', { userId: this.userProfile._id });
    },
  },
};
</script>
