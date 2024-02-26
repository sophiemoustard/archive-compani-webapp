import { alenviAxios } from '@api/ressources/alenviAxios';

export default {
  async create (payload) {
    await alenviAxios.post(`${process.env.API_HOSTNAME}/courseslots`, payload);
  },
  async update (slotId, payload) {
    await alenviAxios.put(`${process.env.API_HOSTNAME}/courseslots/${slotId}`, payload);
  },
  async delete (slotId) {
    await alenviAxios.delete(`${process.env.API_HOSTNAME}/courseslots/${slotId}`);
  },
};
