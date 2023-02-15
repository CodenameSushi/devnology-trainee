"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
class Article {
    constructor(id, title, url, author, createdt) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.author = author;
        this.createdt = createdt;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getTitle() {
        return this.title;
    }
    setTitle(value) {
        this.title = value;
    }
    getUrl() {
        return this.url;
    }
    setUrl(value) {
        this.url = value;
    }
    getAuthor() {
        return this.author;
    }
    setAuthor(value) {
        this.author = value;
    }
    getCreatedAt() {
        return this.createdt;
    }
    setCreatedAt(value) {
        this.createdt = value;
    }
    toDBModel() {
        return {
            id: this.id,
            title: this.title,
            url: this.url,
            author: this.author,
            created_at: this.createdt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            title: this.title,
            url: this.url,
            author: this.author,
            createdAt: this.createdt
        };
    }
}
exports.Article = Article;
//# sourceMappingURL=Article.js.map