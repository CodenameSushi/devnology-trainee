import { Request, Response } from "express";
import { ERROR } from "sqlite3";
import { ArticleBusiness } from "../business/ArticleBusiness";
import { CreateArticleInput, GetArticlesInput } from "../dtos/articleDTO";
import { BaseError } from "../errors/BaseError";


export class ArticleController {
    constructor(
        private articleBusiness: ArticleBusiness
    ) {}

    public getArticles = async (req:Request, res:Response) => {
        try {
            const input: GetArticlesInput = {
                q: req.query.q
            }

            const output = await this.articleBusiness.getArticles(input)
            res.status(200).send(output)
            
        } catch (error) {
            console.log(ERROR)
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof BaseError) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        
        }
    }

    public createArticle = async (req:Request, res:Response) => {
        try {
            const input: CreateArticleInput = {
                title: req.body.title,
                url: req.body.url,
                author: req.body.author
            }

            const output = await this.articleBusiness.createArticle(input)
            
            res.status(201).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deleteArticle = async (req:Request, res:Response) => {
        try {
            const id = req.params.id

            await this.articleBusiness.deleteArticle(id)

            res.status(200).send("Artigo deletado com sucesso!")
            
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}

