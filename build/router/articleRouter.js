"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRouter = void 0;
const express_1 = __importDefault(require("express"));
const ArticleBusiness_1 = require("../business/ArticleBusiness");
const ArticleController_1 = require("../controller/ArticleController");
const ArticlesDatabase_1 = require("../database/ArticlesDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
exports.articleRouter = express_1.default.Router();
const articleController = new ArticleController_1.ArticleController(new ArticleBusiness_1.ArticleBusiness(new ArticlesDatabase_1.ArticlesDatabase(), new IdGenerator_1.IdGenerator()));
exports.articleRouter.get("/", articleController.getArticles);
exports.articleRouter.post("/", articleController.createArticle);
exports.articleRouter.put("/:id", articleController.editArticle);
exports.articleRouter.delete("/:id", articleController.deleteArticle);
//# sourceMappingURL=articleRouter.js.map