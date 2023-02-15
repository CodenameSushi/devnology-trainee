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
exports.ArticleBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const Article_1 = require("../models/Article");
class ArticleBusiness {
    constructor(articleDatabase, idGenerator) {
        this.articleDatabase = articleDatabase;
        this.idGenerator = idGenerator;
        this.getArticles = (input) => __awaiter(this, void 0, void 0, function* () {
            const { q } = input;
            if (typeof q !== 'string' && q !== undefined) {
                throw new BadRequestError_1.BadRequestError("'q' deve ser string ou undefined");
            }
            const articlesDB = yield this.articleDatabase.findArticles(q);
            const articles = articlesDB.map((articleDB) => {
                const article = new Article_1.Article(articleDB.id, articleDB.title, articleDB.url, articleDB.author, articleDB.created_at);
                return article.toBusinessModel();
            });
            const output = articles;
            return output;
        });
        this.createArticle = (input) => __awaiter(this, void 0, void 0, function* () {
            const { title, url, author } = input;
            if (typeof title !== 'string') {
                throw new BadRequestError_1.BadRequestError("'title' must be string");
            }
            if (typeof url !== 'string') {
                throw new BadRequestError_1.BadRequestError("'url' must be string");
            }
            if (typeof author !== 'string') {
                throw new BadRequestError_1.BadRequestError("'author' must be string");
            }
            const id = this.idGenerator.generate();
            const articleDBExists = yield this.articleDatabase.findArticleById(id);
            if (articleDBExists) {
                throw new BadRequestError_1.BadRequestError("'id' already exists");
            }
            const articleUrlExists = yield this.articleDatabase.findArticleByUrl(url);
            if (articleUrlExists) {
                throw new BadRequestError_1.BadRequestError("'url' already exists");
            }
            const newArticle = new Article_1.Article(id, title, url, author, new Date().toISOString());
            const newArticleDB = newArticle.toDBModel();
            yield this.articleDatabase.insertArticle(newArticleDB);
            const output = {
                message: "Artigo cadastrado com sucesso!",
                article: newArticle.toBusinessModel()
            };
            return output;
        });
        this.editArticle = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, title, url, author } = input;
            if (title !== undefined) {
                if (typeof title !== 'string' && title !== undefined) {
                    throw new BadRequestError_1.BadRequestError("'title' deve ser 'string' ou 'undefined'");
                }
            }
            if (url !== undefined) {
                if (typeof url !== 'string' && url !== undefined) {
                    throw new BadRequestError_1.BadRequestError("'url' deve ser 'string' ou 'undefined'");
                }
            }
            if (author !== undefined) {
                if (typeof author !== 'string' && author !== undefined) {
                    throw new BadRequestError_1.BadRequestError("'author' deve ser 'string' ou 'undefined'");
                }
            }
            const articleDBExists = yield this.articleDatabase.findArticleById(id);
            if (!articleDBExists) {
                throw new BadRequestError_1.BadRequestError("Artigo nao encontrado!");
            }
            const newArticle = new Article_1.Article(articleDBExists.id, title || articleDBExists.title, url || articleDBExists.url, author || articleDBExists.author, articleDBExists.created_at);
            const newArticleDB = newArticle.toDBModel();
            yield this.articleDatabase.editArticle(newArticleDB);
            const output = {
                message: "Artigo editado com sucesso",
                article: newArticle.toBusinessModel()
            };
            return output;
        });
        this.deleteArticle = (id) => __awaiter(this, void 0, void 0, function* () {
            if (typeof id !== 'string') {
                throw new BadRequestError_1.BadRequestError("'id' must be a string");
            }
            const articleDBExists = yield this.articleDatabase.findArticleById(id);
            if (!articleDBExists) {
                throw new BadRequestError_1.BadRequestError("Article not Found");
            }
            const newArticle = new Article_1.Article(articleDBExists.id, articleDBExists.title, articleDBExists.url, articleDBExists.author, articleDBExists.created_at);
            yield this.articleDatabase.deleteArticle(id);
            const output = {
                message: "Artigo deletado com sucesso!",
                article: newArticle.toBusinessModel()
            };
        });
    }
}
exports.ArticleBusiness = ArticleBusiness;
//# sourceMappingURL=ArticleBusiness.js.map