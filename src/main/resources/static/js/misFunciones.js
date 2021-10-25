function objetoCategoria() {
    $('#verObjetosCategoria').show();
    $('#verObjetosClient').hide();
    $('#verObjetosMotos').hide();
    $('#verObjetosMensajes').hide();
    $('#verObjetosReservas').hide();
    $('#verObjetosScore').hide();
    $('#verObjetosAdmin').hide();
    traerInfoCategoria();
}

function objetoMotos() {
    $('#verObjetosCategoria').hide();
    $('#verObjetosClient').hide();
    $('#verObjetosMotos').show();
    $('#verObjetosMensajes').hide();
    $('#verObjetosReservas').hide();
    $('#verObjetosScore').hide();
    $('#verObjetosAdmin').hide();
	traerInformacionMoto();
}

function objetoClientes() {
    $('#verObjetosCategoria').hide();
    $('#verObjetosClient').show();
    $('#verObjetosMotos').hide();
    $('#verObjetosMensajes').hide();
    $('#verObjetosReservas').hide();
    $('#verObjetosScore').hide();
    $('#verObjetosAdmin').hide();
	traerInformacionClient();

}

function objetoMensajes() {
    $('#verObjetosCategoria').hide();
    $('#verObjetosClient').hide();
    $('#verObjetosMotos').hide();
    $('#verObjetosMensajes').show();
    $('#verObjetosReservas').hide();
    $('#verObjetosScore').hide();
    $('#verObjetosAdmin').hide();
	traerInfoMensjaes();

}

function objetoReservas() {
    $('#verObjetosCategoria').hide();
    $('#verObjetosClient').hide();
    $('#verObjetosMotos').hide();
    $('#verObjetosMensajes').hide();
    $('#verObjetosReservas').show();
    $('#verObjetosScore').hide();
    $('#verObjetosAdmin').hide();
	traerInfoReservas();

}

function objetoScore() {
    $('#verObjetosCategoria').hide();
    $('#verObjetosClient').hide();
    $('#verObjetosMotos').hide();
    $('#verObjetosMensajes').hide();
    $('#verObjetosReservas').hide();
    $('#verObjetosScore').show();
    $('#verObjetosAdmin').hide();
	traerInfoScore();

}

function objetoAdmin() {
    $('#verObjetosCategoria').hide();
    $('#verObjetosClient').hide();
    $('#verObjetosMotos').hide();
    $('#verObjetosMensajes').hide();
    $('#verObjetosReservas').hide();
    $('#verObjetosScore').hide();
    $('#verObjetosAdmin').show();
	traerInformacionAdmin();

}


//FUNCIONES MOTO ---------------------

function traerInformacionMoto(){
	$.ajax({    
    url : 'http://144.22.58.155/api/Motorbike/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultadoMoto").empty();
                let miTabla ="<table  style='border:1px solid black'><tr><td style='width: 200px; color: red; text-align: center;'>NAME</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>BRAND</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>YEAR</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>DESCRIPCION</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>CATEGORY</td></tr>";
			miTabla +="<tr><td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td></tr>"; 
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
	        miTabla += "<td style='text-align: center;'>"+ respuesta[i].name+ '</td>'; 		
	        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].brand+ '</td>'; 		
	        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].year+ '</td>'; 		
	        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].description+ '</td>'; 		
	        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].category.name+ '</td>';
                miTabla += '<td><button  onclick="editarRegistroMoto('+respuesta[i].id+' )">Editar</button>';
		miTabla += '<td><button  onclick="eliminarRegistroMoto('+respuesta[i].id+' )">Eliminar</button>';
		miTabla += '</tr>';
		}
                miTabla += '</table>';
                $("#resultadoMoto").append(miTabla);
                $("#idMoto").val("");
		$("#nameMoto").val("");
		$("#brandMoto").val("");
		$("#yearMoto").val("");
		$("#descripMoto").val("");
                $('#listasMotos').show();
		pintarSelectMotoCat();
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function pintarSelectMotoCat(){
	$.ajax({    
    url : 'http://144.22.58.155/api/Category/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#categoriaMoto").empty();
		miSelect = '<option value="">Elige una opción</option>';
		//miSelect += '<option id="" ></option>';
		for (i=0; i<respuesta.length; i++){
	        miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 		
		}
	    $("#categoriaMoto").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en cargar las categorias:'+ status);
    }
});
	
}

function guardarInfoMoto(){
	let selected = $("#categoriaMoto").children(":selected").attr("value");
	if (selected.length > 0) {
	
	let misDatos = {

        brand: $("#brandMoto").val(),
        model: $("#model").val(),
        year: $("#yearMoto").val(),
        name: $("#nameMoto").val(),
		category:{id:selected},
		description: $("#descripMoto").val()
		
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://144.22.58.155/api/Motorbike/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado!");
        	traerInformacionMoto();	
			}
		}
	});
	}
	else
	{
		alert('Debe escoger categoria');
    }
}

function editarRegistroMoto (idMoto){
    $('#listasMotos').hide();
    $.ajax({    
    url : 'http://144.22.58.155/api/Motorbike/'+idMoto,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
                        $("#idMoto").val(respuesta.id);
			$("#nameMoto").val(respuesta.name);
			$("#brandMoto").val(respuesta.brand);
                         $("#yearMoto").val(respuesta.year);
			$("#descripMoto").val(respuesta.description);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
    });
}

function actualizarInfoMoto(){
	let misDatos = {
		id: $("#idMoto").val(),
                brand: $("#brandMoto").val(),
                year: $("#yearMoto").val(),
                name: $("#nameMoto").val(),
                description: $("#descripMoto").val()

	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://144.22.58.155/api/Motorbike/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 : function() {
                    alert("Registro Actualizado");
                    traerInformacionMoto();	
                    }
		}
	});
}

function eliminarRegistroMoto(idMoto){
	$.ajax(    
    'http://144.22.58.155/api/Motorbike/'+idMoto,
	{type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Registro Eliminado!");
        	traerInformacionMoto();
			}
		}
	});
}


//FUNCIONES CATEGORIA ---------------------

function traerInfoCategoria(){
	$.ajax({    
    url : 'http://144.22.58.155/api/Category/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultadoCategoria").empty();
                let miTabla = "<table  style='border:1px solid black'><tr><td style='width: 200px; color: red; text-align: center;'>NAME</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>DESCRIPCION</td></tr>";
			miTabla +="<tr><td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td></tr>";    
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
                        miTabla += "<td style='text-align: center;'>"+ respuesta[i].name+ '</td>'; 				
                        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].description+ '</td>';
                        miTabla += '<td><button  onclick="editarRegistroCategory('+respuesta[i].id+' )">Editar</button>';
                        miTabla += '<td><button  onclick="eliminarRegistroCategory('+respuesta[i].id+' )">Eliminar</button>';
                        miTabla += '</tr>';
		}
                miTabla += '</table>';
                $("#resultadoCategoria").append(miTabla);
                $("#idCategory").val("");
                $("#nameCategory").val("");
                $("#descripCategory").val("");
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function guardarInfoCategoria(){
	let misDatos = {
		name: $("#nameCategory").val(),
        description: $("#descripCategory").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://144.22.58.155/api/Category/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado!");
        	traerInfoCategoria();	
			}
		}
	});
}

function editarRegistroCategory (idCategory){
	$.ajax({    
    url : 'http://144.22.58.155/api/Category/'+idCategory,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
                        $("#idCategory").val(respuesta.id);
			$("#nameCategory").val(respuesta.name);
			$("#descripCategory").val(respuesta.description);		
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function actualizarInfoCategoria(){
	let misDatos = {
		id: $("#idCategory").val(),
                name: $("#nameCategory").val(),
                description: $("#descripCategory").val()

	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://144.22.58.155/api/Category/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 : function() {
                    alert("Registro Actualizado");
                    traerInfoCategoria();	
                    }
		}
	});
}

function eliminarRegistroCategory(idCategory){
	$.ajax(    
    'http://144.22.58.155/api/Category/'+idCategory,
	{type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Registro Eliminado!");
        	traerInfoCategoria();
			}
		}
	});
}



//FUNCIONES CLIENTE ---------------------

function traerInformacionClient(){
	$.ajax({    
    url : 'http://144.22.58.155/api/Client/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultadoClient").empty();
                let miTabla = "<table  style='border:1px solid black'><tr><td style='width: 200px; color: red; text-align: center;'>NAME</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>EMAIL</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>AGE</td></tr>";
			miTabla +="<tr><td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td></tr>";    
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
                        miTabla += "<td style='text-align: center;'>"+ respuesta[i].name+ '</td>'; 				
                        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].email+ '</td>';
                        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].age+ '</td>';
                        miTabla += '<td><button  onclick="editarRegistroClient('+respuesta[i].idClient+' )">Editar</button>';
                        miTabla += '<td><button  onclick="eliminarRegistroClient('+respuesta[i].idClient+' )">Eliminar</button>';
                        miTabla += '</tr>';
		}
        miTabla += '</table>';
	    $("#resultadoClient").append(miTabla);
		$("#idClient").val("");
		$("#nameClient").val("");
		$("#emailClient").val("");
		$("#passwordClient").val("");
                $("#ageClient").val("");
                $("#emailClient").attr("readonly", false);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function guardarInfoClient(){
	let misDatos = {
		name: $("#nameClient").val(),
        email: $("#emailClient").val(),
		password: $("#passwordClient").val(),
        age: $("#ageClient").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://144.22.58.155/api/Client/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado!");
        	traerInformacionClient();	
			}
		}
	});
}

function editarRegistroClient(idClient){
    $("#emailClient").attr("readonly", true);
    $.ajax({    
    url : 'http://144.22.58.155/api/Client/'+idClient,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
                        $("#idClient").val(respuesta.idClient);
			$("#nameClient").val(respuesta.name);
			$("#emailClient").val(respuesta.email);
                         $("#passwordClient").val(respuesta.password);
			$("#ageClient").val(respuesta.age);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
    });
}

function actualizarInfoClient(){
	let misDatos = {
		idClient: $("#idClient").val(),
                name: $("#nameClient").val(),
                email: $("#emailClient").val(),
                password: $("#passwordClient").val(),
                age: $("#ageClient").val()

	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://144.22.58.155/api/Client/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 : function() {
                    alert("Registro Actualizado");
                    traerInformacionClient();	
                    }
		}
	});
}

function eliminarRegistroClient(idClient){
	$.ajax(    
    'http://144.22.58.155/api/Client/'+idClient,
	{type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Registro Eliminado!");
        	traerInformacionClient();
			}
		}
	});
}


//FUNCIONES MENSAJES ---------------------

function traerInfoMensjaes(){
	$.ajax({    
    url : 'http://144.22.58.155/api/Message/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultadoMensajes").empty();
        let miTabla ="<table  style='border:1px solid black'><tr><td style='width: 200px; color: red; text-align: center;'>CLIENTE</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>MOTORBIKE</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>MESSAGE</td></tr>";
			miTabla +="<tr><td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td></tr>"; 
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
			miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].client.name+ '</td>'; 
                        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].motorbike.name+ '</td>'; 	
			miTabla += "<td style='text-align: center;'>"+ respuesta[i].messageText+ '</td>'; 
                        miTabla += '<td><button  onclick="editarRegistroMessage('+respuesta[i].idMessage+' )">Editar</button>';
                        miTabla += '<td><button  onclick="eliminarRegistroMessage('+respuesta[i].idMessage+' )">Eliminar</button>';
			miTabla += '</tr>';
		}
        miTabla += '</table>';
	    $("#resultadoMensajes").append(miTabla);
                $("#idMessageMes").val("");
                $("#messageTextMes").val("");
                $('#listasMensajes').show();

		pintarSelectMesMoto();
		pintarSelectMesClient();
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function pintarSelectMesMoto(){
	$.ajax({    
    url : 'http://144.22.58.155/api/Motorbike/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#mensajeMoto").empty();
		miSelect = '<option value="">Elige Moto</option>';
		for (i=0; i<respuesta.length; i++){
	        miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 		
		}
	    $("#mensajeMoto").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en cargar las Motos:'+ status);
    }
});
	
}

function pintarSelectMesClient(){
	$.ajax({    
    url : 'http://144.22.58.155/api/Client/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#mensajeClient").empty();
		miSelect = '<option value="">Elige Cliente</option>';
		for (i=0; i<respuesta.length; i++){
	        miSelect += '<option value='+ respuesta[i].idClient+ '>'+respuesta[i].name+'</option>'; 		
		}
	    $("#mensajeClient").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en cargar las Motos:'+ status);
    }
});
	
}

function guardarInfoMensaje(){

	let selectedMoto = $("#mensajeMoto").children(":selected").attr("value");
	let selectedClient = $("#mensajeClient").children(":selected").attr("value");

	if (selectedClient.length > 0) {
		if (selectedMoto.length > 0) {
			let misDatos = {

				messageText: $("#messageTextMes").val(),
				client:{idClient:selectedClient},
				motorbike:{id:selectedMoto}

			};
			let datosJson = JSON.stringify(misDatos); 
			$.ajax(    
			'http://144.22.58.155/api/Message/save',
			{data: datosJson,
			type : 'POST',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
  
			statusCode : {
				201 :  function() {
					alert("Registro Guardado!");
					traerInfoMensjaes();	
					}
				}
			});
		}
		else
		{
			alert('Debe escoger una Moto');
		}
	}
	else
		{
			alert('Debe escoger un Cliente');
		}
}

function editarRegistroMessage (idMess){
    $('#listasMensajes').hide();

    $.ajax({    
    url : 'http://144.22.58.155/api/Message/'+idMess,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
                        $("#idMessageMes").val(respuesta.idMessage);
			$("#messageTextMes").val(respuesta.messageText);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
    });
}

function actualizarInfoMensaje(){
	let misDatos = {
		idMessage: $("#idMessageMes").val(),
                messageText: $("#messageTextMes").val()

	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://144.22.58.155/api/Message/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 : function() {
                    alert("Registro Actualizado");
                    traerInfoMensjaes();	
                    }
		}
	});
}

function eliminarRegistroMessage(idMessage){
	$.ajax(    
    'http://144.22.58.155/api/Message/'+idMessage,
	{type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Registro Eliminado!");
        	traerInfoMensjaes();
			}
		}
	});
}


//FUNCIONES RESERVAS ---------------------

function traerInfoReservas(){
	$.ajax({    
    url : 'http://144.22.58.155/api/Reservation/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultadoReservas").empty();
        let miTabla ="<table  style='border:1px solid black'><tr><td style='width: 200px; color: red; text-align: center;'>startDate</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>devolutionDate</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>MOTOBIKE</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>idClient</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>NAME</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>EMAIL</td>";
                        miTabla +="<td style='width: 200px; color: red; text-align: center;'>STATUS</td></tr>";
			miTabla +="<tr><td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
                        miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td></tr>"; 
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
			miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].startDate+ '</td>'; 
			miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].devolutionDate+ '</td>';
			miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].motorbike.name+ '</td>'; 
                        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].client.idClient+ '</td>'; 	
			miTabla += "<td style='text-align: center;'>"+ respuesta[i].client.name+ '</td>'; 
			miTabla += "<td style='text-align: center;'>"+ respuesta[i].client.email+ '</td>';
                        miTabla += "<td style='text-align: center;'>"+ respuesta[i].status+ '</td>'; 
                        miTabla += '<td><button  onclick="editarRegistroReservation('+respuesta[i].idReservation+' )">Editar</button>';
                        miTabla += '<td><button  onclick="eliminarRegistroReservation('+respuesta[i].idReservation+' )">Eliminar</button>';
			miTabla += '</tr>';
		}
        miTabla += '</table>';
	    $("#resultadoReservas").append(miTabla);
            $("#idReservationMes").val("");    
            $('#listasReservas').show();
            $('#listasReservasStatus').hide();
            $("#startDateRes").val("");
	    $("#devolutionDateRes").val("");
            $("#statusRes").val("");
	    pintarSelectResMoto();
	    pintarSelectResClient();
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function pintarSelectResMoto(){
	$.ajax({    
    url : 'http://144.22.58.155/api/Motorbike/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#reservaMoto").empty();
		miSelect = '<option value="">Elige Moto</option>';
		for (i=0; i<respuesta.length; i++){
	        miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 		
		}
	    $("#reservaMoto").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en cargar las Motos:'+ status);
    }
});
	
}

function pintarSelectResClient(){
	$.ajax({    
    url : 'http://144.22.58.155/api/Client/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#reservaClient").empty();
		miSelect = '<option value="">Elige Cliente</option>';
		for (i=0; i<respuesta.length; i++){
	        miSelect += '<option value='+ respuesta[i].idClient+ '>'+respuesta[i].name+'</option>'; 		
		}
	    $("#reservaClient").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en cargar las Motos:'+ status);
    }
});
	
}

function guardarInfoReservas(){

	let selectedMoto = $("#reservaMoto").children(":selected").attr("value");
	let selectedClient = $("#reservaClient").children(":selected").attr("value");

	if (selectedClient.length > 0) {
		if (selectedMoto.length > 0) {
			let misDatos = {

				startDate: $("#startDateRes").val(),
				devolutionDate: $("#devolutionDateRes").val(),
				client:{idClient:selectedClient},
				motorbike:{id:selectedMoto},
                                score:{sco: "SIN CALIFICAR"},
                                score:{messa:" "}

			};
			let datosJson = JSON.stringify(misDatos); 
			$.ajax(    
			'http://144.22.58.155/api/Reservation/save',
			{data: datosJson,
			type : 'POST',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
  
			statusCode : {
				201 :  function() {
					alert("Registro Guardado!");
					traerInfoReservas();	
					}
				}
			});
		}
		else
		{
			alert('Debe escoger una Moto');
		}
	}
	else
		{
			alert('Debe escoger un Cliente');
		}
}

function editarRegistroReservation (idReservation){
    $('#listasReservas').hide();
    $('#listasReservasStatus').show();
    $.ajax({    
    url : 'http://144.22.58.155/api/Reservation/'+idReservation,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
                        $("#idReservationMes").val(respuesta.idReservation);
			$("#startDateRes").val(respuesta.startDate);
                        $("#devolutionDateRes").val(respuesta.devolutionDate);

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
    });
}

function actualizarInfoReservas(){
        let selectedStatus = $("#statusRes").children(":selected").attr("value");
	let misDatos = {
		idReservation: $("#idReservationMes").val(),
                startDate: $("#startDateRes").val(),
                devolutionDate: $("#devolutionDateRes").val(),
                status:selectedStatus

	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://144.22.58.155/api/Reservation/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 : function() {
                    alert("Registro Actualizado");
                    traerInfoReservas();	
                    }
		}
	});
}

function eliminarRegistroReservation(idReservation){
	$.ajax(    
    'http://144.22.58.155/api/Reservation/'+idReservation,
	{type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Registro Eliminado!");
        	traerInfoReservas();
			}
		}
	});
}

//FUNCIONES SCORE ---------------------

function traerInfoScore(){
	$.ajax({    
    url : 'http://144.22.58.155/api/Reservation/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultadoScore").empty();
        let miTabla ="<table  style='border:1px solid black'><tr><td style='width: 200px; color: red; text-align: center;'>MESSAGE</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>SCORE</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>MOTOBIKE</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>CLIENT</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>NAME</td></tr>";
			miTabla +="<tr><td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td></tr>"; 
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
			miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].score.messa+ '</td>'; 
			miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].score.sco+ '</td>';
			miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].motorbike.name+ '</td>'; 
                        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].client.idClient+ '</td>'; 	
			miTabla += "<td style='text-align: center;'>"+ respuesta[i].client.name+ '</td>'; 
                        miTabla += '<td><button  onclick="editarRegistroScore('+respuesta[i].idReservation+' )">Editar</button>';
			miTabla += '</tr>';
		}
        miTabla += '</table>';
	    $("#resultadoScore").append(miTabla);
             $("#idReservationMesSc").val(""); 
             $("#idScoreSc").val(""); 
            $("#scoSc").val("");    
            $("#messaSc").val("");
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}



function editarRegistroScore (idReservation){

    $.ajax({    
    url : 'http://144.22.58.155/api/Reservation/'+idReservation,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
                        $("#idReservationMesSc").val(respuesta.idReservation);
                        $("#idScoreSc").val(respuesta.score.id_score);
			$("#scoSc").val(respuesta.score.sco);
                        $("#messaSc").val(respuesta.score.messa);

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
    });
}

function actualizarInfoScore(){
	let misDatos = {
		idReservation: $("#idReservationMesSc").val(),
                score:{id_score:$("#idScoreSc").val() ,sco:$("#scoSc").val(),messa:$("#messaSc").val()}

	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://144.22.58.155/api/Reservation/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 : function() {
                    alert("Registro Actualizado");
                    traerInfoScore();	
                    }
		}
	});
}




//FUNCIONES ADMIN ---------------------

function traerInformacionAdmin(){
	$.ajax({    
    url : 'http://144.22.58.155/api/Admin/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultadoAdmin").empty();
        let miTabla = "<table  style='border:1px solid black'><tr><td style='width: 200px; color: red; text-align: center;'>NAME</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>EMAIL</td></tr>";
			miTabla +="<tr><td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td></tr>";    
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
                        miTabla += "<td style='text-align: center;'>"+ respuesta[i].name+ '</td>'; 				
                        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].email+ '</td>';
                        miTabla += '<td><button  onclick="editarRegistroAdmin('+respuesta[i].id+' )">Editar</button>';
                        miTabla += '<td><button  onclick="eliminarRegistroAdmin('+respuesta[i].id+' )">Eliminar</button>';
                        miTabla += '</tr>';
		}
        miTabla += '</table>';
	    $("#resultadoAdmin").append(miTabla);
		$("#idAdmin").val("");
		$("#nameAdmin").val("");
		$("#emailAdmin").val("");
		$("#passwordAdmin").val("");
                $("#emailAdmin").attr("readonly", false);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function guardarInfoAdmin(){
	let misDatos = {
		name: $("#nameAdmin").val(),
                email: $("#emailAdmin").val(),
		password: $("#passwordAdmin").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://144.22.58.155/api/Admin/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado!");
        	traerInformacionAdmin();	
			}
		}
	});
}

function editarRegistroAdmin(idAdmin){
    $("#emailAdmin").attr("readonly", true);
    $.ajax({    
    url : 'http://144.22.58.155/api/Admin/'+idAdmin,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
                        $("#idAdmin").val(respuesta.id);
			$("#nameAdmin").val(respuesta.name);
			$("#emailAdmin").val(respuesta.email);
                         $("#passwordAdmin").val(respuesta.password);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
    });
}

function actualizarInfoAdmin(){
	let misDatos = {
		id: $("#idAdmin").val(),
                name: $("#nameAdmin").val(),
                email: $("#emailAdmin").val(),
                password: $("#passwordAdmin").val()

	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://144.22.58.155/api/Admin/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 : function() {
                    alert("Registro Actualizado");
                    traerInformacionAdmin();	
                    }
		}
	});
}

function eliminarRegistroAdmin(idAdmin){
    $.ajax(    
    'http://144.22.58.155/api/Admin/'+idAdmin,
    {type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		204 :  function() {
			alert("Registro Eliminado!");
        	traerInformacionAdmin();
			}
		}
    });
}

