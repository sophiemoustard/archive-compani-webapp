import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { subject } from '@casl/ability';
import get from 'lodash/get';
import pick from 'lodash/pick';
import Courses from '@api/Courses';
import { NotifyNegative } from '@components/popup/notify';
import { INTRA, COURSE_TYPES, INTRA_HOLDING, INTER_B2B } from '@data/constants';
import {
  formatIdentity,
  formatDownloadName,
  readAPIResponseWithTypeArrayBuffer,
} from '@helpers/utils';
import { composeCourseName } from '@helpers/courses';
import { downloadFile } from '@helpers/file';
import { defineAbilitiesForCourse } from '@helpers/ability';

export const useCourses = (course) => {
  const $store = useStore();
  const $router = useRouter();

  const pdfLoading = ref(false);

  const isIntraCourse = computed(() => (get(course.value, 'type') === INTRA));

  const isInterCourse = computed(() => (get(course.value, 'type') === INTER_B2B));

  const isIntraHoldingCourse = computed(() => (get(course.value, 'type') === INTRA_HOLDING));

  const isVendorInterface = /\/ad\//.test($router.currentRoute.value.path);

  const isClientInterface = !isVendorInterface;

  const followUpMissingInfo = computed(() => {
    const missingInfo = [];
    if (!course.value.trainer._id) missingInfo.push('l\'intervenant(e)');
    if (!course.value.slots || !course.value.slots.length) missingInfo.push('minimum 1 créneau');

    if (!get(course.value, 'contact._id')) missingInfo.push('le contact pour la formation');
    else if (!get(course.value, 'contact.contact.phone')) missingInfo.push('le numéro du contact pour la formation');

    return missingInfo;
  });

  const followUpDisabled = computed(() => followUpMissingInfo.value.length > 0);

  const disableDocDownload = computed(() => followUpDisabled.value || pdfLoading.value);

  const isArchived = computed(() => !!course.value.archivedAt);

  const isIntraOrIntraHoldingOrVendor =
    computed(() => isIntraCourse.value || isIntraHoldingCourse.value || isVendorInterface);

  const vendorRole = computed(() => $store.getters['main/getVendorRole']);

  const courseType = computed(() => {
    const type = COURSE_TYPES.find(t => t.value === get(course.value, 'type'));
    return type ? type.label : '';
  });

  const trainerName = computed(() => formatIdentity(get(course.value, 'trainer.identity'), 'FL'));

  const salesRepresentativeName = computed(
    () => formatIdentity(get(course.value, 'salesRepresentative.identity'), 'FL')
  );

  const loggedUser = computed(() => $store.state.main.loggedUser);

  const displaySalesRepresentative = computed(() => {
    const ability = defineAbilitiesForCourse(pick(loggedUser.value, ['role']));

    const canReadSalesRepresentative = ability.can('read', subject('Course', course.value), 'sales_representative');
    return canReadSalesRepresentative && get(course.value, 'salesRepresentative._id');
  });

  const headerInfo = computed(() => [
    { icon: 'bookmark_border', label: courseType.value },
    ...(trainerName.value ? [{ icon: 'emoji_people', label: trainerName.value }] : []),
    ...(course.value.archivedAt ? [{ icon: 'circle', label: 'Archivée', iconClass: 'info-archived' }] : []),
    ...(displaySalesRepresentative.value ? [{ icon: 'fa fa-handshake', label: salesRepresentativeName.value }] : []),
  ]);

  const downloadAttendanceSheet = async () => {
    if (disableDocDownload.value) return;

    try {
      pdfLoading.value = true;
      const pdf = await Courses.downloadAttendanceSheet(course.value._id);
      const formattedName = formatDownloadName(`feuilles d'emargement ${composeCourseName(course.value, true)}`);
      const pdfName = `${formattedName}.pdf`;
      downloadFile(pdf, pdfName, 'application/octet-stream');
    } catch (e) {
      console.error(e);
      const decodedRep = readAPIResponseWithTypeArrayBuffer(e);
      if (decodedRep.statusCode === 404 && decodedRep.message) return NotifyNegative(decodedRep.message);
      NotifyNegative('Erreur lors du téléchargement de la feuille d\'émargement.');
    } finally {
      pdfLoading.value = false;
    }
  };

  return {
    // Computed
    isIntraCourse,
    isInterCourse,
    isIntraHoldingCourse,
    headerInfo,
    vendorRole,
    disableDocDownload,
    isVendorInterface,
    isClientInterface,
    isIntraOrIntraHoldingOrVendor,
    followUpDisabled,
    isArchived,
    pdfLoading,
    followUpMissingInfo,
    // Methods
    downloadAttendanceSheet,
  };
};
