var express = require("express");
var Storage = require("../Storage")
var Router  = express.Router()
var promise = require('es6-promise').Promise;//necesario cuando el sistema no reconoce promise

Router.get("/propiedades",function(req,res){
	//get Usuario
  Storage.getData("propiedades")
        .then(function(propiedades){
          res.json(propiedades)
        }).catch(function(error){
          res.sendStatus(500).json(error)
        })
})

Router.get("/propiedades/:Ciudad/:Tipo",function(req,res){
  var ciudad = req.params.Ciudad
  var tipo = req.params.Tipo

  console.log("ciudad: ", ciudad)
  console.log("tipo: ", tipo)
  Storage.getDataBy(ciudad, tipo)
        .then(function(propiedades){
          res.json(propiedades)
        }).catch(function(error){
          res.sendStatus(500).json(error)
        })
})

Router.get("/ciudades", (req, res)=>{  
  Storage.getData('propiedades')
          .then(ciudades=>{
            var ciudadesUnique = [];
            ciudades.forEach(function(o) {
              if(ciudadesUnique.indexOf(o.Ciudad) < 0){
                 ciudadesUnique.push(o.Ciudad);
              }
            })
            res.json(ciudadesUnique)
          })
          .catch(error=>{
            res.sendStatus(500).json(error);
          })
})

Router.get("/tipos", (req, res)=>{
  Storage.getData('propiedades')
          .then(tipos=>{
            var tiposUnique = [];
            tipos.forEach(function(o) {
              if(tiposUnique.indexOf(o.Tipo) < 0){
                 tiposUnique.push(o.Tipo);
              }
            })
            res.json(tiposUnique)
          })
          .catch(error=>{
            res.sendStatus(500).json(error);
          })
})
module.exports = Router
