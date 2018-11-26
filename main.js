var provider = new firebase.auth.GoogleAuthProvider();
var usuario;
$("#inicioSesion").click(function (result) {

    //console.log("mi boton funciona");
    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log(result);
    });
});