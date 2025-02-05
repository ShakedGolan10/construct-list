"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middleware_1 = require("./middleware");
const auth_routes_1 = __importDefault(require("./api/auth/auth.routes"));
const items_routes_1 = __importDefault(require("./api/items/items.routes"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
const publicPath = path_1.default.join(__dirname, 'public');
app.use(express_1.default.static(publicPath));
if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:5173'],
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
}
app.use('/api', middleware_1.authMiddleware);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/items', items_routes_1.default);
const serveFrontend = (req, res) => {
    const htmlFile = path_1.default.join(publicPath, 'index.html');
    if (fs_1.default.existsSync(htmlFile)) {
        res.sendFile(htmlFile);
    }
    else {
        res.status(200).json({ message: `Server is live at port ${port}!` });
    }
};
app.get('*', serveFrontend);
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
