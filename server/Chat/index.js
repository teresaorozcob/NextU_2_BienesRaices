/**
 *
 */
var express = require("express");
var Storage = require("../Storage")
var Router  = express.Router()
var promise = require('es6-promise').Promise;//necesario cuando el sistema no reconoce promise

Router.get("/users",function(req,res){
	//get Usuario
  Storage.getData("users")
        .then(function(users){
          res.json(users)
        }).catch(function(error){
          res.sendStatus(500).json(error)
        })
})
Router.get("/messages",function(req,res){
	//get messages
  Storage.getData("messages")
        .then(function(messages){
          res.json(messages)
        }).catch(function(error){
          res.sendStatus(500).json(error)
        })
})
Router.post("/users",function(req,res){
	//post Usuario
  var user = req.body.user
  Storage.getData("users")
          .then(function (users){
            return new promise(function (resolve, reject){
              Storage.saveData("users",user,users)
                      .then(function (message){
                        resolve(message)
                      }).catch(function(err){
                        reject(err)
                      })
            })
          }).then(function(message){
            res.json(message)
          }).catch(function(err){
            res.sendStatus(500).json(err)
          })
})
Router.post("/messages",function(req,res){
	//post messages
  var message = req.body.message
  Storage.getData("messages")
          .than(function (messages){
            return new promise(function (resolve, reject){
              Storage.saveData("message",message,messages)
                      .then(function (message){
                        resolve(message)
                      }).catch(function(err){
                        reject(err)
                      })
            })
          }).then(function(message){
            res.json(message)
          }).catch(function(err){
            res.sendStatus(500).json(err)
          })
})

module.exports = Router
