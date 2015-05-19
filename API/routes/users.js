module.exports=function(app) {

    var User = require('../models/user/schema.js');
    var crypto = require('crypto');

//GET users

    findAllUsers = function (req, res) {
        User.find(function (err, users) {
            if (!err) {
                res.send(users);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    };

//GET user by id
    findUser = function (req, res) {
        User.findOne({"_id": req.params._id}, function (err, user) {
            if (!err) {
                res.send(user);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    }



    findUserByname = function (req, res)
    {
        User.findOne({"username": req.params.username}, function (err, user)
        {
            if (!err) {
                res.send(user);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    }




//POST User
    addUser = function (req, res) {
        console.log('POST user');
        console.log(req.body);
        var name=req.body.username;
        var pass = req.body.password
        var passEncriptada = encriptar(name, pass)


        User.findOne({username: name},function(err, user){

            if (!user){

                var user = new User({
                    nick: req.body.nick,
                    username: name,
                    password: passEncriptada,
                    email: req.body.email,
                    age: req.body.age,
                    nation: req.body.nation,
                    needs: req.body.needs,
                    offers: req.body.offers,
                    description: req.body.description
                });
                user.save(function (err) {

                    if (!err) {
                        console.log('User added');
                    }
                    else {

                        console.log('ERROR', +err);
                    }
                })

            res.send(user._id);

            }
            else{
                res.send('Usuario existe!')
            }

        })
    }

//DELETE User

    deleteUser = function (req, res) {
        console.log('DELETE user');
        console.log(req.params._id);

        User.findOne({"_id": req.params._id}, function (err, user) {
            user.remove(function (err) {
                if (!err)
                    console.log('Removed');
                else {
                    console.log('ERROR' + err);
                }
            })
        });

        res.send('User removed');
    }


    //DELETE Userby Username
    deleteUserByname = function (req, res) {
        console.log('DELETE user');
        console.log(req.params.username);

        User.findOne({"username": req.params.username}, function (err, user) {
            user.remove(function (err) {
                if (!err)
                    console.log('Removed');
                else {
                    console.log('ERROR' + err);
                }
            })
        });

        res.send('User removed');
    }







//UPDATE User

    updateUser = function (req, res) {
        console.log('UPDATE user');
        User.findOneAndUpdate({"username": req.params.username},req.body, function (err, user) {
            console.log(user._id);

            user.set(function (err) {
                if (!err) {
                    console.log('Updated');
                }
                else {
                    console.log('ERROR' + err);
                }

            })
        });

        res.send('User Modified');
    }

    function encriptar(user, pass) {

        // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
        var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex')
        return hmac
    }

    //Login

        loginUser = function (req, res){
            console.log('LOGIN user');

            var name=req.body.username;
            var pass=req.body.password;
            var passEncriptada = encriptar(name, pass)

            User.findOne({"username": name}, function (err, user) {
                if(user){
                    if(user.password === passEncriptada)
                        res.send(user)
                    else

                        res.send('contrase�a incorrecta')

                        }else{
                    res.send('No existe este usuario!')
                }


             });
        }

//endpoints
    app.get('/users', findAllUsers);
    app.get('/user/:_id', findUser);

    app.get('/user/username/:username',findUserByname);

    app.post('/users', addUser);
    app.put('/user/username/:username', updateUser);

    app.delete('/user/:_id', deleteUser);
    app.delete('/user/username/:username', deleteUserByname);

    app.post('/login', loginUser)
}