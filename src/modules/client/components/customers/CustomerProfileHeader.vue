<template>
  <div class="header">
    <div class="flex-row q-mb-md items-center justify-between">
      <div class="flex-row ellipsis">
        <ni-button class="q-mr-md" icon="arrow_back" @click="$router.go(-1)" />
        <span class="ellipsis page-title">{{ title }}</span>
        <ni-button class="q-ml-sm" icon="date_range" @click="goToPlanning" />
      </div>
      <ni-button :flat="false" v-if="!customer.stoppedAt && !isAuxiliaryInterface" class="justify-end"
        label="Arrêter" @click="stopSupportModal=true" />
      <ni-button :flat="false" v-else-if="customer.stoppedAt && !customer.archivedAt && !isAuxiliaryInterface"
        class="justify-end" label="Archiver" @click="validateCustomerArchive" />
    </div>
    <div class="row profile-info column">
      <div class="row items-center">
        <div :class="getDotClass(getStatus(this.customer))" />
        <div :class="getDotTextClass(getStatus(this.customer))">{{ STATUS_TYPES[getStatus(this.customer)] }}</div>
      </div>
      <div class="row items-center">
        <q-icon name="restore" class="q-mr-md" size="1rem" />
        <div class="q-mr-md">{{ statusInfos }}</div>
        <ni-button v-if="!isAuxiliaryInterface" icon="delete" @click="validateCustomerDeletion" />
      </div>
    </div>

    <stop-support-modal v-model="stopSupportModal" @hide="resetStopSupportModal" @submit="stopSupport"
      v-model:new-status="newStatus" :validations="v$.newStatus" :loading="modalLoading" :customer-name="title"
      :min-date="minStoppingDate" :stopping-date-error-message="setStoppingDateErrorMessage(v$.newStatus)" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import get from 'lodash/get';
import Customers from '@api/Customers';
import Button from '@components/Button';
import { NotifyPositive, NotifyNegative, NotifyWarning } from '@components/popup/notify';
import { formatDate, dateDiff, formatDateDiff, getStartOfDay, getEndOfDay } from '@helpers/date';
import { minDate } from '@helpers/vuelidateCustomVal';
import { ACTIVATED, STOPPED, ARCHIVED, STATUS_TYPES, REQUIRED_LABEL } from '@data/constants';
import { customerMixin } from 'src/modules/client/mixins/customerMixin';
import StopSupportModal from './infos/StopSupportModal';

export default {
  name: 'CustomerProfileHeader',
  mixins: [customerMixin],
  props: {
    title: { type: String, required: true },
  },
  components: {
    'ni-button': Button,
    'stop-support-modal': StopSupportModal,
  },
  setup () { return { v$: useVuelidate() }; },
  data () {
    return {
      STATUS_TYPES,
      get,
      getStartOfDay,
      modalLoading: false,
      stopSupportModal: false,
      newStatus: { stopReason: '', stoppedAt: '' },
    };
  },
  computed: {
    ...mapState('customer', ['customer']),
    statusInfos () {
      switch (this.getStatus(this.customer)) {
        case ACTIVATED:
          return !this.customer.firstIntervention
            ? `Date de création: ${this.displayDateInfo(this.customer.createdAt)}`
            : `Première intervention: ${this.displayDateInfo(this.customer.firstIntervention.startDate)}`;
        case STOPPED: return `Date d'arrêt: ${this.displayDateInfo(this.customer.stoppedAt)}`;
        case ARCHIVED: return `Date d'archive: ${this.displayDateInfo(this.customer.archivedAt)}`;
        default: return 'N/A';
      }
    },
    minStoppingDate () {
      return getStartOfDay(new Date(this.customer.createdAt)).toISOString();
    },
    isAuxiliaryInterface () {
      return /\/auxiliaries\//.test(this.$route.path);
    },
  },
  validations () {
    return {
      newStatus: {
        stoppedAt: {
          required,
          minDate: minDate(this.minStoppingDate),
        },
        stopReason: { required },
      },
    };
  },
  methods: {
    displayDateInfo (date) {
      return `${formatDate(date)} (${formatDateDiff(dateDiff(new Date(), date))})`;
    },
    goToPlanning () {
      if (this.customer.subscriptions.length) {
        return this.$router.push({ name: 'ni planning customers', query: { targetedCustomerId: this.customer._id } });
      }

      return NotifyWarning('Le/la bénéficiaire n\'a pas de souscription.');
    },
    async deleteCustomer () {
      try {
        await Customers.remove(this.customer._id);
        NotifyPositive('Bénéficiaire supprimé(e).');
        this.$router.push({ name: 'ni customers' });
      } catch (e) {
        console.error(e);
        if (e.status === 403) NotifyNegative('Vous ne pouvez pas supprimer le/la bénéficiaire.');
        if (e.msg) NotifyNegative('Erreur lors de la suppression.');
      }
    },
    validateCustomerDeletion () {
      if (this.customer.firstIntervention) return NotifyWarning('Le/la bénéficiaire est lié(e) à des interventions.');
      this.$q.dialog({
        title: 'Confirmation',
        message: 'Confirmez-vous la suppression&nbsp;?',
        html: true,
        ok: 'OK',
        cancel: 'Annuler',
      }).onOk(this.deleteCustomer)
        .onCancel(() => NotifyPositive('Suppression annulée.'));
    },
    getDotClass (value) {
      return {
        'dot dot-green': value === ACTIVATED,
        'dot dot-orange': value === STOPPED,
        'dot dot-grey': value === ARCHIVED,
      };
    },
    getDotTextClass (value) {
      return {
        'text-green-600': value === ACTIVATED,
        'text-orange-700': value === STOPPED,
        'text-copper-grey-700': value === ARCHIVED,
      };
    },
    async refreshCustomer () {
      try {
        await this.$store.dispatch('customer/fetchCustomer', { customerId: this.customer._id });
      } catch (e) {
        console.error(e);
        NotifyNegative('Erreur lors du chargement des données.');
      }
    },
    setStoppingDateErrorMessage (validations) {
      if (!validations.stoppedAt.minDate) return 'La date d\'arrêt ne peut être antérieure à la date de création.';

      return REQUIRED_LABEL;
    },
    resetStopSupportModal () {
      this.v$.newStatus.$reset();
      this.newStatus = { stopReason: '', stoppedAt: '' };
    },
    async stopSupport () {
      try {
        this.modalLoading = true;
        const payload = {
          stoppedAt: getEndOfDay(new Date(this.newStatus.stoppedAt)),
          stopReason: this.newStatus.stopReason,
        };
        await Customers.updateById(this.customer._id, payload);

        this.stopSupportModal = false;
        NotifyPositive('Bénéficiaire arrêté(e).');
        await this.refreshCustomer();
      } catch (e) {
        console.error(e);
        NotifyNegative('Erreur lors de l\'arrêt.');
      } finally {
        this.modalLoading = false;
      }
    },
    validateCustomerArchive () {
      this.$q.dialog({
        title: 'Confirmation',
        message: 'Êtes-vous sûr(e) de vouloir archiver cette personne&nbsp;? <br /><br /> Elle n’apparaîtra plus'
        + ' dans les balances clients et vous ne pourrez plus la facturer, ni la prélever.',
        html: true,
        ok: 'Oui',
        cancel: 'Non',
      }).onOk(this.archiveCustomer)
        .onCancel(() => NotifyPositive('Archivage annulé.'));
    },
    async archiveCustomer () {
      try {
        const payload = { archivedAt: new Date() };
        await Customers.updateById(this.customer._id, payload);

        NotifyPositive('Bénéficiaire archivé(e).');
        await this.refreshCustomer();
      } catch (e) {
        console.error(e);
        if (e.status === 403 && e.data.message !== 'Forbidden') return NotifyNegative(e.data.message);
        NotifyNegative('Erreur lors de l\'archivage.');
      }
    },
  },
};
</script>

<style lang="sass" scoped>
  .column
    flex-direction: column
</style>
