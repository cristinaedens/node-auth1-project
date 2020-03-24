module.exports = (req, res, next) => {
    console.log('This is my middleware!', req.session)
        // check that we remember the client,
        // that the client logged in already
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ you: "shall not pass!" });
    }
};

// module.exports = () => {
//     return (req, res, next) => {
//         console.log('This is my middleware!', req.session)
//             // check that we remember the client,
//             // that the client logged in already
//         if (req.session && req.session.user) {
//             next();
//         } else {
//             res.status(401).json({ you: "shall not pass!" });
//         }
//     };
// }