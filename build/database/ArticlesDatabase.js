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
exports.ArticlesDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class ArticlesDatabase extends BaseDatabase_1.BaseDataBase {
    findArticles(q) {
        return __awaiter(this, void 0, void 0, function* () {
            let articleDB;
            if (q) {
                const result = yield BaseDatabase_1.BaseDataBase
                    .connection(ArticlesDatabase.TABLE_ARTICLES)
                    .where("title", "LIKE", `%${q}%`);
                articleDB = result;
            }
            else {
                const result = yield BaseDatabase_1.BaseDataBase
                    .connection(ArticlesDatabase.TABLE_ARTICLES);
                articleDB = result;
            }
            return articleDB;
        });
    }
    findArticleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [articleDB] = yield BaseDatabase_1.BaseDataBase
                .connection(ArticlesDatabase.TABLE_ARTICLES)
                .where({ id });
            return articleDB;
        });
    }
    findArticleByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const [articleDB] = yield BaseDatabase_1.BaseDataBase
                .connection(ArticlesDatabase.TABLE_ARTICLES)
                .where({ url });
            return articleDB;
        });
    }
    insertArticle(newArticleDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDataBase
                .connection(ArticlesDatabase.TABLE_ARTICLES)
                .insert(newArticleDB);
        });
    }
    editArticle(newArticleDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDataBase
                .connection(ArticlesDatabase.TABLE_ARTICLES)
                .update(newArticleDB)
                .where({ id: newArticleDB.id });
        });
    }
    deleteArticle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDataBase
                .connection(ArticlesDatabase.TABLE_ARTICLES)
                .del().where({ id });
        });
    }
}
exports.ArticlesDatabase = ArticlesDatabase;
ArticlesDatabase.TABLE_ARTICLES = "articles";
//# sourceMappingURL=ArticlesDatabase.js.map