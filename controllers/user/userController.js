const { response } = require('express');
const User = require('../../models/User');
const brcr = require('bcryptjs');
const { generateJWT } = require('../../helpers/jwt');

const newUser = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const existsEmail = await User.findOne({ email });

        if ( existsEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registradp'
            })
        }

        const user = new User( req.body ); // User instance
        
        // encrypt password
        const salt = brcr.genSaltSync();
        user.password = brcr.hashSync( password, salt ); 
        
        await user.save(); // New user to DB
        
        // Generate token
        const token = await generateJWT( user._id );

        res.status(200).json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Oops! Error'
        });
    }

}


const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // Verify Email
        const userDB = await User.findOne({ email });
        
        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email y/o contraseña no válido'
            });
        }

        // Verify pass
        const validPass = brcr.compareSync( password, userDB.password );
        if ( !validPass ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email y/o contraseña no válido'
            });
        }

        // Generate Json Web Token
        const token = await generateJWT( userDB._id );


        res.json({
            ok: true,
            msg: 'Hola mundo',
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Oops! Error'
        });
    }

}

// Renew Token
const renewToken = async (req, res = response) => {

    const uid = req.uid;
    
        const token = await generateJWT( uid );
    
        const usLog = await User.findById( uid );
    
    
    res.json({
        ok:true,
        token,
        usLog
    })

}

module.exports = {
    newUser,
    login,
    renewToken
}