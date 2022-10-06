import journalApi from "../../api/journalApi";
import postData from "@/axios_res";
import { NEKOT } from "@/global";

export default {
  namespaced: true,
  state: {
    get_station: [],
  },
  getters: {
    _getStation: (state) => (list) => state[list],
  },
  mutations: {
    _setStationAvalible(state, data) {
      state[data.list] = data.res;
    },
  },
  actions: {
    async _loadStation({ commit }) {
      try {
        const RES = await journalApi.get("/Puestos.json");

        const available_station = [];
        for (let id of Object.keys(RES.data)) {
          available_station.push({
            id,
            ...RES.data[id],
          });
        }
        console.log(available_station);
        commit("_setStationAvalible", {
          list: "get_station",
          res: available_station,
        });
      } catch (error) {
        console.error("_loadStation", error);
      }
    },
    async postRecord_({ commit }, { DATA }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "POST", url: `record`, data: DATA });
        return RES;
      } catch (error) {
        console.error("postRecord_", error);
      }
    },
    async getRecord_({ commit }, { record }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "GET", url: `record/${record}` });
        return RES;
      } catch (error) {
        console.error("getRecord_", error);
      }
    },
    async recordHistory_({ commit }, { DATA }) {
      const { id_watchman, since, until, zone_id } = DATA;
      try {
        const RES = await postData({
          header: { x_token: NEKOT },
          method: "GET",
          url: `record_history/${zone_id}/${id_watchman}/${since}/${until}`,
        });
        return RES;
      } catch (error) {
        console.error("recordHistory_", error);
      }
    },
    async getRecords_({ commit }) {
      try {
        const RES = await postData({ header: { x_token: NEKOT }, method: "GET", url: `record` });
        if (!RES.msg) {
          commit("_setStationAvalible", {
            list: "get_station",
            res: RES,
          });
        }
        return RES;
      } catch (error) {
        console.error("getRecords_", error);
      }
    },
  },
};
