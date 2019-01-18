//import { timingSafeEqual } from "crypto";

//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()
buscarPropiedades()


/*======= FUNCIONALIDAD BUSCADOR ========*/
/*$("#buscar").on("click", function(){

})*/

function buscarPropiedades() {
  let btnBuscar = $('#buscar')
  btnBuscar.on('click', function(){
    //alert("aaa")
    InitApi(document,window, undefined, jQuery)//dnetro render prop
  })
}


//============= ruta base de la API =====//
function InitApi(document,window, undefined, $){

  
  (function() {
    
    return Propiedades = {
      apiUrl: "/Propiedades",
      
      
      Init: function(){
        var self = this

        //this.getPropiedadesAll()
        self.getPropiedadesAll()
        self.getCiudades()
        self.getTipos()



      },

      ajaxRequest: function (url, type, data){
        return $.ajax({
          url: url,
          type: type,
          data: data
        })
      },
      //GET:
      getPropiedadesAll: function() {
        var self = this

        //acciones con el btn:    

        let btnBuscar = $('#buscar')
          btnBuscar.on('click', function(){
            //alert("ppp")
            var ciudad = $("#ciudad").val();
            var tipo = $("#tipo").val();

            self.getPropiedadesBy(ciudad, tipo)
            
          })

        var endpoint = self.apiUrl + "/propiedades"
        self.ajaxRequest(endpoint, "GET", {})
          .done(function(data){
            var propiedades = data

            self.renderPropiedades(propiedades)
          }).fail(function(err){
            console.log("error del ajax: ", err)
          })

      },
      getPropiedadesBy: function(ciudad, tipo){
        //alert("tipo: "+  tipo)
        var self = this

        ciudad = ciudad == "" ? "0" : ciudad
        tipo = tipo == "" ? "0" : tipo
        console.log(ciudad + " / " + tipo)
        var endpoint = self.apiUrl + "/propiedades/" + ciudad + "/" + tipo
        //alert(endpoint)      
        self.ajaxRequest(endpoint, 'GET', {})
          .done(function(data){
            //alert("data ciudad:" + ciudad + "/// " + data)
            var propiedades = data

            self.renderPropiedades(propiedades)
          }).fail(function(err){
            console.log("error del ajax: ", err)
          })


      },
      getCiudades: function(){
        var self = this

        var endpoint = self.apiUrl + "/ciudades"        
        self.ajaxRequest(endpoint, 'GET', {})
            .done(data=>{              
              var $ciudades = $("#ciudad");
              //$ciudades.html("")
               $.each(data, (i,ciudad)=>{
                  $ciudades.append(`<option value="${ciudad}">${ciudad}</option>`);
              })
            })
            .fail(err=>{
              console.log(err);
            });
      },
      getTipos: function(){
        var self = this

        var endpoint = self.apiUrl + "/tipos"        
        self.ajaxRequest(endpoint, 'GET', {})
            .done(data=>{              
              var $tipos = $("#tipo");
               $.each(data, (i,tipo)=>{
                  $tipos.append(`<option value="${tipo}">${tipo}</option>`);
              })
            })
            .fail(err=>{
              console.log(err);
            });
      },
      //RENDER:
      renderPropiedades: function(propiedades){
        var self= this
        var propiedadesList = $(".lista")
        propiedadesList.html("")
        var propiedadesTemplate = '' +
          '<div class="card horizontal">' +
          '<div class="card-image">' +     
          '<img src="img/home.jpg">' +    
          '</div>' +
          '<div class="card-stacked"> ' +
           ' <div class="card-content"> '+
              '<div>' +
                '<b>Direccion: </b>:direccion:' +
              '</div>' +
              '<div>' +
                '<b>Ciudad: </b>:ciudad:' +
              '</div>'+
              '<div>'+
                '<b>Telefono: </b>:telefono:'+
              '</div>'+
              '<div>'+
                ' <b>Código postal: </b>:cp:'+
              '</div>'+
              '<div>'+
                ' <b>Precio: </b>:precio:'+
              '</div>'+
              '<div>'+
                '<b>Tipo: </b>:tipo:'+
              '</div>'+
            '</div>'+
            '<div class="card-action right-align">'+
              '<a href="#">Ver más</a>'+
            '</div>'+
            '</div>'+
          '</div>'
          propiedades.map(function(propiedad){
            //alert(propiedad)
            var newPropiedad = propiedadesTemplate.replace(":direccion:", propiedad.Direccion)
              .replace(":ciudad:", propiedad.Ciudad)
              .replace(":telefono:", propiedad.Telefono)
              .replace(":cp:", propiedad.Codigo_Postal)
              .replace(":precio:", propiedad.Precio)
              .replace(":tipo:", propiedad.Tipo)

            propiedadesList.append(newPropiedad)          
          })        
      }
      
    }
  })()
  Propiedades.Init()
  setTimeout(()=>{
    $('select').material_select();
  },1000);
}
//InitApi(document,window, undefined, jQuery)