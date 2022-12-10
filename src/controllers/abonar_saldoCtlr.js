import axios from "axios";
import config from '../utils/utils';


const cargarcliente = async (cedula) =>{
     return await axios.get(config.server+"/cliente/cedula/"+cedula)
    .then((result)=>{
        if(result.data.success && result.data.body.length > 0){
            return result.data.body[0];
        }else{
            return 0;
        }
    }).catch((err)=>{
        console.log(err);
    })
} 






export default {cargarcliente}