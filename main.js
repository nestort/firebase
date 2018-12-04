var provider = new firebase.auth.GoogleAuthProvider();
var usuario;
$('#inicioSesion').click(    
    function(result){        
        firebase.auth().signInWithPopup(provider).then(
               function(result){
                usuario = {
                    nombre: result.user.displayName,
                    uid: result.user.uid,
                    email: result.user.email,
                    foto: result.user.photoURL,
                    termino:true,
                    puntos:0
                };   
                $('#seccionSesion').hide();
                $('#seccion').append("<input type='text' id='Inputnota'><button id='bttnNota'>crear nota</button>");
                firebase.database().ref("Notas/"+usuario.uid).on("child_added",function(value){                    
                    var nota=value;                   
                    $('#seccion').append("<p id="+nota.key+">"+nota.val()+ "     <a class='EliminarNota'>Eliminar</a></p>");
                    Eliminarnota();
                });
               
                firebase.database().ref('Usuarios/' + usuario.uid).set(usuario);
                Agregarnotas();
            }
        );
        
    }
);
function Agregarnotas(){
$('#bttnNota').click( function (result){    
    var nota=$('#Inputnota').val();
    firebase.database().ref('Notas/' + usuario.uid).push(nota);
});
}
function Eliminarnota(){
$('.EliminarNota').click( function (result){
    llave=$(this).parent().attr('id');
   
    firebase.database().ref('Notas/' + usuario.uid+'/'+llave).remove();
    $( "#"+llave ).remove();
});
} 