const APIFuncs = require('./api_modules/all');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome back to developing elvin'
    });
    res.send('MakerSpaces API running..');
});

/* Endpoints for  USERS */

// Retrieve a list of all users 
app.get('/api/users/secure/all', verifyToken, (req, res) => {
    APIFuncs.Users.getAllSecureUsers((result) => {
        res.json(result)
    });
});
// Retrieve a list of all users 
app.get('/api/users/all', (req, res) => {
    APIFuncs.Users.getAllUsers((result) => {
        res.json(result)
    });
});
// user login 
app.get('/api/user/login/:username/:password', (req, res) => {
    APIFuncs.Users.loginUser(req.params.username, req.params.password, (result) => {
        if (result != '') {
            //res.json(result);
            jwt.sign({ result }, 'secretkey', (err, token) => {
                res.json({
                    
                    result
                });
            });
            console.log('heeft inhoudt;')
        }
        else {
            res.sendStatus(403);
        }

    });

});
//User Register -- NOT FINISHED
app.get('/api/user/register/:username/:usermail/:password', (req, res) => {
    APIFuncs.Users.registerUser(req.params.username, req.params.usermail, req.params.password, (result) => res.json(result))
})

//User Groups -- NOT FINISHED
app.get('/api/users/all', verifyToken, (req, res) => {
    APIFuncs.Users.getAllUsers((result) => {
        res.json(result)
    });
});





app.get('/api/protected', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err){
            res.sendStatus(403);
        } else{
            res.json({
                text: 'this was protected',
                data
            });
        }
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created..',
                authData
            });
        }
    })


});

app.post('/api/login', (req, res) => {
    //MOCK USER
    const user = {
        id: 1,
        username: 'brad',
        email: 'XeeeAgmail.com'
    }

    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });

});

// Verify Token
function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //Set Token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        res.sendStatus(403);
    }


}

app.listen(5000, () => console.log('Server Started on port 5000'));

/* 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImJyYWQiLCJlbWFpbCI6IlhlZWVBZ21haWwuY29tIn0sImlhdCI6MTUyNjcyNDMxMn0.JmnFPj8-FE_kAwBpp3JTt0QZxsRuU04JHDQVL2gDmVM
*/