const db = require('../db');

const quotes = [
    "Lagi mau ngapain hari ini?",
    "Hari ini ada planning apa nih?",
    "Semangat terus leee!",
    "Fokus dan terus maju!",
    "Jangan lupa istirahat brodi!"
];

exports.dashboard = (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.render('dashboard', {
        username: req.session.user.username,
        quote: randomQuote
    });
};

exports.getSettings = (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('settings', { username: req.session.user.username });
};

exports.updateName = (req, res) => {
    const { username } = req.body;
    const id = req.session.user.id;
    db.query("UPDATE users SET username = ? WHERE id = ?", [username, id], (err) => {
        if (err) throw err;
        req.session.user.username = username;
        res.redirect('/dashboard');
    });
};

exports.deleteAccount = (req, res) => {
    const id = req.session.user.id;
    db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) throw err;
        req.session.destroy();
        res.send("Akun berhasil dihapus");
    });
};
