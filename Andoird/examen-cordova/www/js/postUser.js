$("#postUserBtn").click(function () {
    postUser();
});

// Post User
function postUser() {

        var username = $("#username").val();
        var pass=$("#pass").val();
        var email = $("#email").val();
        var age = $("#age").val();
        var nation= $("#nation").val();
        var descripcion= $("#descripcion").val();
        var needs= $("#needs").val();


        var needsArray=needs.split(",");
        console.log(needsArray);
        var offers= $("#offers").val();
        var offerArray=needs.split(",");


        var user = new Object();
        user.username = username;
        user.password=pass;
        user.email = email;
        user.age = age;
        user.nation=nation;
        user.descripcion=descripcion;
        user.needs=needsArray;
        user.offers=offerArray;



        var data = JSON.stringify(user);
        console.log(data);
        $.ajax({
            url: " http://localhost:3000/users",
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json',
            data: data,
            success: function (data) {
                window.alert("User creado");
            },
            error: function () {
                window.alert("FAIL: No se han cargado los eventos");
            }
        });
}