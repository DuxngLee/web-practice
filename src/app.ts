//const express = require('express');
import express from "express"; //import express
import "dotenv/config"
import webRoutes from "./routes/web";
import getConnection from "./config/database";

const app = express(); // tạo express application
const PORT = process.env.PORT || 8888; //init port

//config view engine
app.set('view engine', 'ejs');
app.set('views',  __dirname + '/../src/views');

//CONFIG request.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

webRoutes(app);
//run server trên port đã khởi tạo trước đó
//nạp các dữ liệu khai báo ở trên rồi chạy (ví dụ như route)
app.listen(PORT, () => {
    console.log('Server started on port', process.env.PORT);
    console.log(__dirname + '/../src/views');
})
