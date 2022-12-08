import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";

const cargarcliente =(cedula) =>{
    //console.log(cedula);
    axios.get(config.server+"/cliente/cedula/"+cedula)
    .then((result)=>{
        if(result.data.success && result.data.body.length > 0){
            //this.cliente = result.data.body[0];
            console.log( result.data.body[0]);
            return result.data.body[0];
        }else{
            return 0;
        }
    }).catch((err)=>{
        console.log(err);
    })
} 

const hola = ()=>{
    console.log("hola");
}

export default {cargarcliente, hola}