"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const sqlite3_1 = require("sqlite3");
const BaseError_1 = require("../errors/BaseError");
class ArticleController {
    constructor(articleBusiness) {
        this.articleBusiness = articleBusiness;
        this.getArticles = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    q: req.query.q
                };
                const output = yield this.articleBusiness.getArticles(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(sqlite3_1.ERROR);
                if (req.statusCode === 200) {
                    res.status(500);
                }
                if (error instanceof BaseError_1.BaseError) {
                    res.send(error.message);
                }
                else {
                    res.send("Erro inesperado");
                }
            }
        });
        this.createArticle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    title: req.body.title,
                    url: req.body.url,
                    author: req.body.author
                };
                const output = yield this.articleBusiness.createArticle(input);
                res.status(201).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.editArticle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    id: req.params.id,
                    title: req.body.title,
                    url: req.body.url,
                    author: req.body.author
                };
                const output = yield this.articleBusiness.editArticle(input);
                res.status(201).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.deleteArticle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.articleBusiness.deleteArticle(id);
                res.status(200).send("Artigo deletado com sucesso!");
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
    }
}
exports.ArticleController = ArticleController;
//# sourceMappingURL=ArticleController.js.map