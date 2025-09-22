const db = require('../db');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => res.render('login');
exports.getRegister = (req, res) => res.render('register');

exports.postLogin = (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
        if (err) throw err;
        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.send("Login gagal");
        }
        req.session.user = results[0];
        res.redirect('/dashboard');
    });
};

exports.postRegister = async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    db.query("INSERT INTO users SET ?", { username, password: hashed }, (err) => {
        if (err) throw err;
        res.redirect('/login');
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
