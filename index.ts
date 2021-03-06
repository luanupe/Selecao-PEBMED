const app = require('./server');

app.listen(process.env.SERVER_PORT, process.env.SERVER_ADDRESS, () => {
    console.log(`[log]: Server iniciado em ${process.env.SERVER_PORT}`);
});
