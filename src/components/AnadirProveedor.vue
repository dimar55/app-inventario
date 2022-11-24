<template>
     <div class="ctn-saldo">
        <h1>Añadir Proveedor</h1>
        <div class="ctn-registrar-saldo">
            <div class="filtro">
                <div class="ctn-select">
                    <select name="" id="">
                        <option value="">NOMBRE</option>
                        <option value="">CODIGO</option>
                    </select>
                </div>
                <input type="text" placeholder="Buscar Proveedor">

                <button class="btn">BUSCAR</button>
            </div>
            <div class="ctn-tablita">
                <table class="tablita">
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <th>CODIGO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>cell1_1</td>
                            <td>cell2_1</td>
                        </tr>
                        <tr>
                            <td>cell1_2</td>
                            <td>cell2_2</td>
                        </tr>
                        <tr>
                            <td>cell1_3</td>
                            <td>cell2_3</td>
                        </tr>
                        <tr>
                            <td>cell1_4</td>
                            <td>cell2_4</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div class="btn-registrar"> 
                <button class="btn">Añadir</button>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'AnadirProveedor'
}
</script>

<style>
.ctn-saldo h1{
    text-align: center;
    color: #FFEAD1;
    font-size: 70px;
    font-weight: 400;
}

.ctn-registrar-saldo{
    margin: auto;
    background-color: #92DAD4;
    width: 800px;
    color: black;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px;
    font-size: 40px;
}

table.tablita {
  background-color: #FFFFFF;
  width: 350px;
  text-align: center;
  border-collapse: collapse;
}
table.tablita td, table.tablita th {
 
  border: 1px solid #000000;
  padding: 5px 2px;
}
table.tablita tbody td {
  font-size: 40px;
  font-weight: 400;
  color: #000000;
}
table.tablita thead {
  background: #55B77E;

}
table.tablita thead th {

  font-size: 40px;
  font-weight: 400;
  color: #FFFFFF;
  text-align: center;
}
table.tablita tfoot td {
  font-size: 40px;
}
table.tablita tfoot .links {
  text-align: right;
}
table.tablita tfoot .links a{
  display: inline-block;
  background: #792396;
  color: #FFFFFF;
  padding: 2px 8px;
  border-radius: 5px;
}

.ctn-tablita{
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.abono{
    display: flex;
    font-size: 40px;
    justify-content: center;
    padding-top: 20px;
   
}

.abono input{
    width: 200px;
    height: 46px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    font-size: 30px;
    padding-left: 20px;
    margin-left: 15px;
}

.totales{
    text-align: start;
}

.btn-registrar{
display: flex;
justify-content: center;
margin-top: 20px;
}

</style>