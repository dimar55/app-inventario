import axios from "axios";
import config from '../utils/utils';
import Swal from "sweetalert2";

const buscarProducto = (thisI)=>{
    axios.get(config.server+"/producto/id/"+thisI.producto)
    .then((result)=>{
        if(result.data.success && result.data.body.length > 0){
            thisI.prod_no_existe = false;
            thisI.prod = result.data.body[0];
        }else{
            thisI.prod_no_existe = true;
        }
    })
}


export default {
    buscarProducto
}