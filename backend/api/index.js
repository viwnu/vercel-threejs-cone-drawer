"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import { createProxyMiddleware } from 'http-proxy-middleware'
const os_1 = __importDefault(require("os"));
const calculateTriangles_1 = __importDefault(require("./calculateTriangles"));
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cors_1.default)({
    exposedHeaders: '*'
}));
// app.use('/api', createProxyMiddleware({ target: `http://localhost:${port}`, changeOrigin: true }))
//Here we are configuring express to use body-parser as middle-ware.
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/', express_1.default.static('../dist'));
app.post('/api', (req, res) => {
    console.log('req.body: ', req.body);
    const dataToSend = (0, calculateTriangles_1.default)(req.body);
    res.send(dataToSend);
});
app.listen(port, () => {
    console.log(`Server running at http://${os_1.default.hostname()}:${port}/`);
});
