import { alenviAxios } from '@api/ressources/alenviAxios';

export default {
  async list (params) {
    const repetitions = await alenviAxios.get(`${process.env.API_HOSTNAME}/repetitions`, { params });
    return repetitions.data.data.repetitions;
  },
  async delete (id, params) {
    await alenviAxios.delete(`${process.env.API_HOSTNAME}/repetitions/${id}`, { params });
  },
};
