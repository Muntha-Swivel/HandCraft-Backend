"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./schema/user.schema");
const session_schema_1 = require("./schema/session.schema");
const product_schema_1 = require("./schema/product.schema");
const order_schema_1 = require("./schema/order.schema");
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const requireUser_1 = __importDefault(require("./middleware/requireUser"));
const isAdmin_1 = __importDefault(require("./middleware/isAdmin"));
const user_controller_1 = require("./controller/user.controller");
const session_controller_1 = require("./controller/session.controller");
const product_controller_1 = require("./controller/product.controller");
const order_controller_1 = require("./controller/order.controller");
function routes(app) {
    app.get("/", (req, res) => {
        res.send("hello world Dude!").status(200);
    });
    //user
    app.post("/api/users", (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    //sessions
    app.post("/api/sessions", (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.get("/api/sessions", requireUser_1.default, session_controller_1.getUserSessionsHandler);
    app.delete("/api/sessions", requireUser_1.default, session_controller_1.deleteSessionHandler);
    //product routes
    app.get("/api/product", product_controller_1.getAllProductHandler);
    app.get("/api/product/:productId", product_controller_1.getProductHandler);
    app.post("/api/product", [requireUser_1.default, isAdmin_1.default, (0, validateResource_1.default)(product_schema_1.createProductSchema)], product_controller_1.createProductHandler);
    app.put("/api/product/:productId", [requireUser_1.default, isAdmin_1.default, (0, validateResource_1.default)(product_schema_1.updateProductSchema)], product_controller_1.updateProductHandler);
    app.delete("/api/product/:productId", [requireUser_1.default, isAdmin_1.default, (0, validateResource_1.default)(product_schema_1.deleteProductSchema)], product_controller_1.deleteProductHandler);
    //order routes
    app.post("/api/order", [requireUser_1.default, (0, validateResource_1.default)(order_schema_1.createOrderSehema)], order_controller_1.createOrderHandler);
}
exports.default = routes;
