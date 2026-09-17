//const express = require('express');
import express from "express"; //import express
import "dotenv/config"
const app = express(); // tạo express application

const PORT = process.env.PORT || 8888; //init port

//tạo route
app.get('/', (req, res) => {
    res.send('Hello World!');
})

//run server trên port đã khởi tạo trước đó
//nạp các dữ liệu khai báo ở trên rồi chạy (ví dụ như route)
app.listen(PORT, () => {
    console.log('Server started on port', process.env.PORT);
})
