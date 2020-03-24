const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const usersRouter = require("../users/usersRouter");
const authRouter = require("../auth/authRouter");
const restricted = require("../auth/restricted-middleware");


const server = express();

const sessionConfig = {
    name: 'cookie',
    secret: 'This is classified information!',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: process.env.NODE_ENV === 'development' ? true : false, //is it in development? if so, false. if not, true. // do we send a cookie over https only? (Production should ALWAYS be true)
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true, // GDPR laws require to check with client
}

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get('/', (req, res) => {
        res.status(200).json({ Message: 'This is super secret Cristina-Edens Code! DO NOT COPY MY STUFF!' })
    })
    // ╔═══╗─────╔╗─╔═══╗──────────╔═╗╔═╗────╔═══╗────╔╗
    // ╚╗╔╗║────╔╝╚╗║╔═╗║──────────║║╚╝║║────║╔═╗║────║║
    // ─║║║╠══╦═╬╗╔╝║║─╚╬══╦══╦╗─╔╗║╔╗╔╗╠╗─╔╗║║─╚╬══╦═╝╠══╗
    // ─║║║║╔╗║╔╗╣║─║║─╔╣╔╗║╔╗║║─║║║║║║║║║─║║║║─╔╣╔╗║╔╗║║═╣
    // ╔╝╚╝║╚╝║║║║╚╗║╚═╝║╚╝║╚╝║╚═╝║║║║║║║╚═╝║║╚═╝║╚╝║╚╝║║═╣
    // ╚═══╩══╩╝╚╩═╝╚═══╩══╣╔═╩═╗╔╝╚╝╚╝╚╩═╗╔╝╚═══╩══╩══╩══╝
    // ────────────────────║║─╔═╝║──────╔═╝║
    // ────────────────────╚╝─╚══╝──────╚══╝
    // ───╔═══╗─────╔╗────────╔═══╗─╔╗
    // ───║╔═╗║────╔╝╚╗───────║╔══╝─║║
    // ───║║─╚╬═╦╦═╩╗╔╬╦═╗╔══╗║╚══╦═╝╠══╦═╗╔══╗
    // ╔══╣║─╔╣╔╬╣══╣║╠╣╔╗╣╔╗║║╔══╣╔╗║║═╣╔╗╣══╣
    // ╚══╣╚═╝║║║╠══║╚╣║║║║╔╗║║╚══╣╚╝║║═╣║║╠══║
    // ───╚═══╩╝╚╩══╩═╩╩╝╚╩╝╚╝╚═══╩══╩══╩╝╚╩══╝

module.exports = server;