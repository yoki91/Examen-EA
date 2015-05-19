$("#getUserByNameBtn").click(function () {
    getUser();
});

$("#createUserBtn").click(function() {
    window.location.href = "postUser.html"
});


$("#updateUserBtn").click(function () {
  window.location.href="updateUser.html"
});



$("#deleteUserBtn").click(function ()
{   var username = $("#librotitulo").val();
    deleteUser(username);
});


function deleteUser(username)
{
    var url = "http://localhost:3000/user/username/" + username;
    $.ajax({
        url: url,
        type: 'DELETE',
        crossDomain: true,
        success: function (data) {
           window.alert("User removed")
        },
        error: function (err) {
            window.alert("FAIL");
        }
    });
}


// Obtener zapatos por nombre
function getUser() {
    var username = $("#librotitulo").val();
    //console.log(username);
    var url = "http://localhost:3000/user/username/"+username;
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data)
        {

            $('#listName').html("");
            $('<h2>'+'Username:'+' ' + data.username + '</h2>').appendTo($('#listName'));
            $('<strong> Email: </strong> ' + data.email + '<br>').appendTo($('#listName'));
            $('<strong> Edad: </strong> ' + data.age + '<br>').appendTo($('#listName'));
            $('<strong> Nacionalidad: </strong> ' + data.nation + '<br>').appendTo($('#listName'));
            $('<strong> Nacionalidad: </strong> ' + data.descripcion + '<br>').appendTo($('#listName'));


            $('<strong> Busca: </strong>').appendTo($('#listName'));
            for (i=0;i<data.needs.length;i++)
            {
                $('<ul>'+'<li>'+data.needs[i]+'</li>'+'</ul>').appendTo($('#listName'));
            }

            $('<strong> Ofrece: </strong>').appendTo($('#listName'));
            for (i=0;i<data.offers.length;i++)
            {
                $('<ul>'+'<li>'+data.offers[i]+'</li>'+'</ul>').appendTo($('#listName'));
            }

            $('<br> <br>').appendTo($('#listName'));

        },
        error: function ()
        {
            window.alert("FAIL");
        }
    });
}