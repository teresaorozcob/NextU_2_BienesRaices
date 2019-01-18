var fs    = require("fs"),
    path  = require("path")
var _ = require("underscore");

var promise = require('es6-promise').Promise;
//require('es6-promise').polyfill()

module.exports = {
  saveData: function (dataType, newData, data){
    var dataPath = dataType == "users" ?
              __dirname + path.join("/data/users.json"):
              __dirname + path.join("/data/messages.json")
    data.current.push(newData)
    return new promise(function (resolve, reject){
      fs.writeFile(dataPath,JSON.stringify(data),function(err){
        if(err) reject(err)
        resolve("Ok")
      })
    })
  },

  getData: function(dataType) {
    //console.log("estamos en el tipo de data: " + dataType)

    var dataPath;
    /*var dataPath = dataType== "users" ?
                    __dirname + path.join('/data/users.json'):
                    //__dirname + path.join('/data/messages.json')*/
                    //__dirname + path.join('/data/propiedades.json')

    switch(dataType){
      case "users": 
        dataPath = __dirname + path.join('/data/users.json')
        break;
      case "messages":
        dataPath = __dirname + path.join('/data/users.json')
        break;
      case "propiedades":
        dataPath = __dirname + path.join('/data/propiedades.json')
        break;
      default: 
        break;
    }
                  
    return new Promise(function (resolve, reject){
      fs.readFile (dataPath, "utf8", function (err, readData){
        if(err) reject(err)
        resolve (JSON.parse(readData))
        //console.log(readData)
      })
    })
  },

  getDataBy: function(ciudad, tipo){
   // filtro  = 'Ciudad'
   //console.log("filtro: ", filtro)
    var dataPath = __dirname + path.join('/data/propiedades.json')

    return new Promise(function (resolve, reject){
      fs.readFile (dataPath, "utf8", function (err, readData){
        if(err){
          reject(err)
        }else{
          var data = JSON.parse(readData)
          //console.log("todos", data)
          console.log("ciudad: ", ciudad)
          console.log("tipo: ", tipo)

          var filtrado;
          if(ciudad != "0" && tipo != "0"){
            filtrado = _.where(data, {Ciudad: ciudad, Tipo: tipo})
          }else if(ciudad != "0" && tipo == "0"){
            filtrado = _.where(data, {Ciudad: ciudad})
          }else if(ciudad == "0" && tipo != "0"){
            filtrado = _.where(data, {Tipo: tipo})
          }
         /*
          if(ciudad == "0" && tipo != ""){
            filtrado = _.where(data, {Ciudad: ciudad, Tipo: tipo})
          }else if(ciudad != "" && tipo == ""){
            filtrado = _.where(data, {Ciudad: ciudad})
          }else if(ciudad == "" && tipo != ""){
            filtrado = _.where(data, {Tipo: tipo})
          }
*/




/*
          if(ciudad != ""){
            var filtrado = _.where(data, {Ciudad: ciudad, Tipo: tipo})
          }else{
            var filtrado = _.where(data, {Tipo: tipo})
          }
          

          if(tipo != ""){
            var filtrado = _.where(data, {Ciudad: ciudad, Tipo: tipo})
          }else{
            var filtrado = _.where(data, {Ciudad: ciudad})
          }
        */
          //var filtrado = _.where(data, {Ciudad: ciudad, Tipo: tipo})
          //console.log('filtrado: ', filtrado)
          //resolve(JSON.parse(filtrado))
          //resolve (JSON.parse(readData))
          resolve(filtrado)
        }        
      })
    })

/*
    switch(filtro){
      case "Ciudad":

    }
*/
  }
}
