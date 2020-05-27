import constants from "./constants";
import api from "../../api/api";
import Errors from "../utils/errors";
import { getHistory } from "../configStore";
const actions = {
    doReorder: async(data)=>{
        const res = await api.post(`/task/${data.taskId}/merge`, data);
    }
};

export default actions;
