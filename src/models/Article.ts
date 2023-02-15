import { ArticleDB, ArticleModel } from "../types";

export class Article {
    constructor(
        private id: string,
        private title: string,
        private url: string,
        private author: string,
        private createdt: string
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(value:string):void {
        this.id = value
    }

    public getTitle():string {
        return this.title
    }

    public setTitle(value:string):void {
        this.title = value
    }

    public getUrl():string {
        return this.url
    }

    public setUrl(value:string):void {
        this.url = value
    }

    public getAuthor():string {
        return this.author
    }

    public setAuthor(value:string):void {
        this.author = value
    }

    public getCreatedAt():string {
        return this.createdt
    }

    public setCreatedAt(value:string):void {
        this.createdt = value
    }

    public toDBModel(): ArticleDB {
        return {
            id: this.id,
            title: this.title,
            url: this.url,
            author: this.author,
            created_at: this.createdt
        }
    }

    public toBusinessModel(): ArticleModel {
        return {
            id: this.id,
            title: this.title,
            url: this.url,
            author: this.author,
            createdAt: this.createdt
        }
    }
}