/* 
    Path: /api/user
*/

const { Router } = require('express'); // router from express library
const { check } = require('express-validator'); // to use check for validate fields
const { newUser, login, renewToken } = require('../../controllers/user/userController'); // From folder controllers
const { validateFields } = require('../../middlewares/validateFields'); // Middleware validate fields
const { validateJWT } = require('../../middlewares/validateJWT'); // Middleware validate fields


const router = Router();

router.post('/new', validateJWT ,newUser);

router.post('/', 
    [
        check('email', 'El email es obligatorio.').isEmail(),
        check('password', 'La contraseña es obligatoria.').not().isEmpty(),
        validateFields
    ],
    login

);

// Renew Token
router.get('/renew', validateJWT, renewToken);



module.exports = router;