const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/usersModel');

router.post("/register", (req, res) => {
    const userInfo = req.body;

    // the pasword will be hashed and re-hashed 2 ^ 8 time
    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

    userInfo.password = hash;

    Users.add(userInfo)
        .then(user => {
            res.json(user);
        })
        .catch(err => res.send(err));
});

router.post("/login", (req, res, next) => {
    const { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            console.log(user);
            if (user && bcrypt.compareSync(password, user.password)) {
                // remember this client
                console.log('what ever this is')
                req.session.user = {
                    id: user.id,
                    username: user.username,
                };
                console.log(req.session)
                res.status(200).json({ hello: user.username });
            } else {
                res.status(401).json({ message: "invalid credentials" });
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: error.message });
        });
});

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res
                    .status(500)
                    .json({
                        message: "you can checkout any time you like, but you can never leave....",
                    });
            } else {
                res.status(200).json({ message: "logged out successful" });
            }
        });
    } else {
        res.status(200).json({ message: "I don't know you" });
    }
});

module.exports = router;