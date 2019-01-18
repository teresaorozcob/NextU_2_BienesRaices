var bodyParser 	= require ("body-parser"),
		http				= require ("http"),
		express			= require ("express")

		chat				= require ("./Chat"),
		propiedades = require('./Propiedades')
		
		deleteUser	= require ("./lib")
		socketio			= require ("socket.io")


var PORT				= port = process.env.PORT || 8083,
		app					= express(),
		Server			= http.createServer(app),
		io					= socketio(Server,{
			path : "/socketio"
		})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use("/chat", chat)
app.use("/propiedades", propiedades)


app.use(express.static("public"))

Server.listen(PORT, ()=>{
	console.log("Server BIENES RAÍCES is running");
})

//socket
io.on("connection", function(socket){
	console.log("new user connected, socket: "+socket.id);

	socket.on("userJoin", function(user){
		//Escucha al evento
		socket.user = user
		socket.broadcast.emit("userJoin", [user])
	})

	socket.on ("message", function (message){
			//
			socket.broadcast.emit("message", message)
	})

	socket.on("disconnect", function(){
		//disconnect
		if(socket.hasOwnProperty("user")){
			deleteUser(socket.user, function (err, confirm){
				if (err) console.log(err)
			})
		}
	})
})
