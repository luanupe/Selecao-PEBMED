const app = require('./server');

app.listen(process.env.SERVER_PORT, () => {
    console.log(`[log]: Server iniciado em ${process.env.SERVER_PORT}`);
});
