window.onload = getUsers();

// Obtener todos los zapatos
function getUsers() {

    $.ajax({
        url: "http://localhost:3000/users",
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data)
        {
            for (i = 0; i < data.length; i++) {
                $('<h2>'+'Username:'+' ' + data[i].username + '</h2>').appendTo($('#list'));
                $('<strong> Email: </strong> ' + data[i].email + '<br>').appendTo($('#list'));
                $('<strong> Edad: </strong> ' + data[i].age + '<br>').appendTo($('#list'));
                $('<strong> Nacionalidad: </strong> ' + data[i].nation + '<br>').appendTo($('#list'));


                $('<strong> Busca: </strong>').appendTo($('#list'));
                for (j=0;j<data[i].needs.length;j++)
                {
                    $('<ul>'+'<li>'+data[i].needs[j]+'</li>'+'</ul>').appendTo($('#list'));
                }

                $('<strong> Ofrece: </strong>').appendTo($('#list'));
                for (j=0;j<data[i].offers.length;j++)
                {
                    $('<ul>'+'<li>'+data[i].offers[j]+'</li>'+'</ul>').appendTo($('#list'));
                }

                $('<br> <br>').appendTo($('#list'));
            }
        },
        error: function () {
            window.alert("FAIL");
        }
    });
}

// --------------------------------------------------------------------------------------------------
// UPDATE

$("#putUserBtn").click(function () {
    putUser();
});

// Put Libro
function putUser() {
    var username = $("#username").val();

    if (username != "")
    {
        var username = $("#username").val();
        var email = $("#email").val();
        var age = $("#age").val();
        var descripcion=$("#descripcion").val();

        var needs= $("#needs").val();


        var needsArray=needs.split(",");

        console.log(needsArray);

        var offers= $("#offers").val();
        var offerArray=needs.split(",");

        var user = new Object();
        if (username != "")
            user.username = username;
        if (email != "")
            user.email = email;
        if (age != "")
            user.age = age;
        if (descripcion != "")
            user.descripcion = descripcion;
        if(needsArray !="")
            user.needs=needsArray;
        if(offerArray !="")
            user.offers=offerArray;



        var data = JSON.stringify(user);

        var url = "http://localhost:3000/user/username/" + username;

        $.ajax({
            url: url,
            type: 'PUT',
            crossDomain: true,
            contentType: 'application/json',
            data: data,
            success: function (data) {
                window.location.reload();
            },
            error: function () {
                window.alert("FAIL");
            }
        });
    }
    else
    {
        window.alert("Debes poner un titulo");
    }
}