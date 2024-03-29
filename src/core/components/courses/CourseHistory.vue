<template>
  <div class="history">
    <div class="history-cell">
      <div class="history-title">
        <div class="history-title-text">
          {{ formatedHistory.title.pre }}
          <span class="history-type">{{ formatedHistory.title.type }}</span>
          {{ formatedHistory.title.post }}
          <span class="history-info"> {{ formatedHistory.title.infos }}.</span>
        </div>
        <ni-button class="history-button" v-if="formatedHistory.details" color="primary" size="sm" icon="remove_red_eye"
          @click="toggleDetails" />
      </div>
      <div class="history-details" v-if="displayDetails">
        <div>{{ formatedHistory.details }}</div>
      </div>
      <div class="history-signature">
        <img :src="getAvatar(courseHistory.createdBy)" class="avatar history-avatar">
        <div>{{ historySignature }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';
import {
  SLOT_CREATION,
  DEFAULT_AVATAR,
  SLOT_DELETION,
  SLOT_EDITION,
  TRAINEE_ADDITION,
  TRAINEE_DELETION,
  ESTIMATED_START_DATE_EDITION,
  DD_MM_YYYY,
  HHhMM,
  COMPANY_ADDITION,
  COMPANY_DELETION,
} from '@data/constants';
import Button from '@components/Button';
import CompaniDate from '@helpers/dates/companiDates';
import { formatIdentity } from '@helpers/utils';

export default {
  name: 'CourseHistory',
  props: {
    courseHistory: { type: Object, required: true },
  },
  components: {
    'ni-button': Button,
  },
  data () {
    return {
      displayDetails: false,
    };
  },
  computed: {
    formatedHistory () {
      switch (this.courseHistory.action) {
        case TRAINEE_DELETION:
          return { title: this.getTraineeDeletionTitle() };
        case TRAINEE_ADDITION:
          return { title: this.getTraineeAdditionTitle() };
        case COMPANY_ADDITION:
          return { title: this.getCompanyAdditionTitle() };
        case COMPANY_DELETION:
          return { title: this.getCompanyDeletionTitle() };
        case SLOT_DELETION:
          return {
            title: this.getSlotDeletionTitle(),
            details: this.getSlotDeletionDetails(),
          };
        case SLOT_EDITION:
          return {
            title: this.getSlotEditionTitle(),
            details: this.getSlotEditionDetails(),
          };
        case ESTIMATED_START_DATE_EDITION:
          return {
            title: this.getEstimatedStartDateEditionTitle(),
            details: this.getEstimatedStartDateEditionDetails(),
          };
        case SLOT_CREATION:
        default:
          return {
            title: this.getSlotCreationTitle(),
            details: this.getSlotCreationDetails(),
          };
      }
    },
    historySignature () {
      const date = CompaniDate(this.courseHistory.createdAt).format(DD_MM_YYYY);
      const hour = CompaniDate(this.courseHistory.createdAt).format(HHhMM);
      const user = formatIdentity(this.courseHistory.createdBy.identity, 'FL');

      return `${user} le ${date} à ${hour}.`;
    },
  },
  methods: {
    toggleDetails () {
      this.displayDetails = !this.displayDetails;
    },
    getAvatar (user) {
      return get(user, 'picture.link') || DEFAULT_AVATAR;
    },
    getSlotCreationTitle () {
      const date = CompaniDate(this.courseHistory.slot.startDate).format(DD_MM_YYYY);
      const startHour = CompaniDate(this.courseHistory.slot.startDate).format(HHhMM);
      const endHour = CompaniDate(this.courseHistory.slot.endDate).format(HHhMM);
      const infos = `${date} de ${startHour} à ${endHour}`;

      return { pre: 'Nouveau', type: 'créneau', post: 'le', infos };
    },
    getSlotCreationDetails () {
      return get(this.courseHistory, 'slot.address.fullAddress') || get(this.courseHistory, 'slot.meetingLink') ||
        'Pas d\'adresse renseignée.';
    },
    getSlotDeletionTitle () {
      const date = CompaniDate(this.courseHistory.slot.startDate).format(DD_MM_YYYY);

      return { pre: 'Suppression du', type: 'créneau', post: 'du', infos: date };
    },
    getSlotDeletionDetails () {
      let address = '.\r\nPas d\'adresse renseignée.';
      if (get(this.courseHistory, 'slot.address.fullAddress')) {
        address = ` au ${get(this.courseHistory, 'slot.address.fullAddress')}`;
      } else if (get(this.courseHistory, 'slot.meetingLink')) {
        address = ` sur ${get(this.courseHistory, 'slot.meetingLink')}`;
      }

      return `Créneau initialement prévu de ${CompaniDate(this.courseHistory.slot.startDate).format(HHhMM)}`
        + ` à ${CompaniDate(this.courseHistory.slot.endDate).format(HHhMM)}${address}`;
    },
    getSlotEditionTitle () {
      if (this.courseHistory.update.startDate && this.courseHistory.update.startHour) {
        const previousStartDate = CompaniDate(this.courseHistory.update.startDate.from).format(DD_MM_YYYY);
        const startDate = CompaniDate(this.courseHistory.update.startDate.to).format(DD_MM_YYYY);
        const startHour = CompaniDate(this.courseHistory.update.startHour.to).format(HHhMM);
        const endHour = CompaniDate(this.courseHistory.update.endHour.to).format(HHhMM);

        return {
          pre: 'Nouvelles',
          type: 'date et horaire',
          post: ' pour le créneau du',
          infos: `${previousStartDate} : le ${startDate} de ${startHour} à ${endHour}`,
        };
      }
      if (this.courseHistory.update.startDate) {
        const from = CompaniDate(this.courseHistory.update.startDate.from).format(DD_MM_YYYY);
        const to = CompaniDate(this.courseHistory.update.startDate.to).format(DD_MM_YYYY);

        return { type: 'Créneau', post: ' déplacé du', infos: `${from} au ${to}` };
      }
      if (this.courseHistory.update.startHour) {
        const date = CompaniDate(this.courseHistory.update.startHour.from).format(DD_MM_YYYY);
        const startHour = CompaniDate(this.courseHistory.update.startHour.to).format(HHhMM);
        const endHour = CompaniDate(this.courseHistory.update.endHour.to).format(HHhMM);

        return { type: 'Nouvel horaire', post: ' pour le créneau du', infos: `${date} : ${startHour} - ${endHour}` };
      }
      return '';
    },
    getSlotEditionDetails () {
      if (this.courseHistory.update.startDate && this.courseHistory.update.startHour) {
        const previousStartDate = CompaniDate(this.courseHistory.update.startDate.from).format(DD_MM_YYYY);
        const previousStartHour = CompaniDate(this.courseHistory.update.startHour.from).format(HHhMM);
        const previousEndHour = CompaniDate(this.courseHistory.update.endHour.from).format(HHhMM);

        return `Créneau initialement prévu le ${previousStartDate} de ${previousStartHour} à ${previousEndHour}`;
      }
      if (this.courseHistory.update.startHour) {
        const previousStartHour = CompaniDate(this.courseHistory.update.startHour.from).format(HHhMM);
        const previousEndHour = CompaniDate(this.courseHistory.update.endHour.from).format(HHhMM);

        return `Créneau initialement prévu de ${previousStartHour} à ${previousEndHour}`;
      }
      return '';
    },
    getTraineeAdditionTitle () {
      return {
        pre: 'Ajout d\'un(e)',
        type: 'stagiaire',
        post: 'à la formation\u00A0:',
        infos: `\r\n${formatIdentity(this.courseHistory.trainee.identity, 'FL')}`,
      };
    },
    getTraineeDeletionTitle () {
      return {
        pre: 'Retrait d\'un(e)',
        type: 'stagiaire',
        post: 'de la formation\u00A0:',
        infos: `\r\n${formatIdentity(this.courseHistory.trainee.identity, 'FL')}`,
      };
    },
    getEstimatedStartDateEditionTitle () {
      return {
        pre: 'Nouvelle',
        type: 'date de démarrage souhaitée',
        post: 'le',
        infos: CompaniDate(this.courseHistory.update.estimatedStartDate.to).format(DD_MM_YYYY),
      };
    },
    getEstimatedStartDateEditionDetails () {
      if (this.courseHistory.update.estimatedStartDate.from) {
        const previousStartDate = CompaniDate(this.courseHistory.update.estimatedStartDate.from).format(DD_MM_YYYY);

        return `Début précédemment souhaité le ${previousStartDate}`;
      }
      return '';
    },
    getCompanyAdditionTitle () {
      return {
        pre: 'Rattachement d\'une',
        type: 'structure',
        post: 'à la formation\u00A0:',
        infos: `\r\n${this.courseHistory.company.name}`,
      };
    },
    getCompanyDeletionTitle () {
      return {
        pre: 'Détachement d\'une',
        type: 'structure',
        post: 'de la formation\u00A0:',
        infos: `\r\n${this.courseHistory.company.name}`,
      };
    },
  },
};
</script>
