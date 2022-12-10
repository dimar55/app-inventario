import axios from "axios";
import config from '../utils/utils';



 const cargarClientes = async () => {
    return await axios.get(config.server+"/cliente")
        .then((result) => {
            if (result.data.success) return result.data.body;
        }).catch((err) => {
            console.log(err)
            return 0;
        })
}


export default {cargarClientes}