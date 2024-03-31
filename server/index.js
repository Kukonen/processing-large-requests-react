const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(bodyParser.json());
app.use(cors())

let users = [];

for (let i = 1; i <= 1000000; ++i) {
    users.push({
        id: i,
        name: `Пользователь ${i}`,
        department: "Менеджер",
        company: "",
        jobTitle: ""
    });
}

// Заглушки для API
app.get('/users', (req, res) => {
    res.send(users);
});


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});