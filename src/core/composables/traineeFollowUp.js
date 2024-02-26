import get from 'lodash/get';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import Courses from '@api/Courses';
import { NotifyNegative } from '@components/popup/notify';
import { useCourses } from '@composables/courses';
import { formatIdentity } from '@helpers/utils';

export const useTraineeFollowUp = (profileId) => {
  const $store = useStore();
  const learners = ref([]);
  const learnersLoading = ref(false);

  const company = computed(() => $store.getters['main/getCompany']);

  const loggedUser = computed(() => $store.state.main.loggedUser);

  const { isClientInterface } = useCourses();

  const formatRow = trainee => (
    { ...trainee, identity: { ...trainee.identity, fullName: formatIdentity(trainee.identity, 'FL') } }
  );

  const getFollowUp = async () => {
    try {
      learnersLoading.value = true;
      const loggedUserHolding = get(loggedUser.value, 'holding._id') || null;
      const query = isClientInterface
        ? { ...loggedUserHolding ? { holding: loggedUserHolding } : { company: company.value._id } }
        : null;
      const course = await Courses.getFollowUp(profileId.value, query);

      if (course) learners.value = Object.freeze(course.trainees.map(formatRow));
    } catch (e) {
      console.error(e);
      NotifyNegative('Erreur lors de la récupération des apprenants');
      learners.value = [];
    } finally {
      learnersLoading.value = false;
    }
  };

  return {
    // Data
    learners,
    learnersLoading,
    // Methods
    getFollowUp,
  };
};
