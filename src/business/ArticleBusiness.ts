import { ArticlesDatabase } from "../database/ArticlesDatabase";
import { CreateArticleInput, CreateArticleOutput,  EditArticleInput,  GetArticlesOutput } from "../dtos/articleDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { Article } from "../models/Article";
import { IdGenerator } from "../services/IdGenerator";


export class ArticleBusiness {
    constructor(
        private articleDatabase: ArticlesDatabase,
        private idGenerator: IdGenerator
    ) {}

    public getArticles = async (input:any): Promise<GetArticlesOutput> => {
        const { q } = input 

        if(typeof q !== 'string' && q !== undefined){
            throw new BadRequestError("'q' deve ser string ou undefined")
        }

        const articlesDB = await this.articleDatabase.findArticles(q)

        const articles = articlesDB.map((articleDB) => {
            const article = new Article(
                articleDB.id,
                articleDB.title,
                articleDB.url,
                articleDB.author,
                articleDB.created_at
            )
            return article.toBusinessModel()
        })

        const output: GetArticlesOutput = articles
        
        return output
    }


    public createArticle = async (input: CreateArticleInput): Promise<CreateArticleOutput> => {
        const {title, url, author} = input

        if(typeof title !== 'string'){
            throw new BadRequestError("'title' must be string")
        }
        if(typeof url !== 'string'){
            throw new BadRequestError("'url' must be string")
        }
        if(typeof author !== 'string'){
            throw new BadRequestError("'author' must be string")
        }

        const id = this.idGenerator.generate()

        const articleDBExists = await this.articleDatabase.findArticleById(id)

        if(articleDBExists){
            throw new BadRequestError("'id' already exists")
        }

        const articleUrlExists = await this.articleDatabase.findArticleByUrl(url)

        if(articleUrlExists){
            throw new BadRequestError("'url' already exists")
        }

        const newArticle = new Article(
            id,
            title,
            url,
            author,
            new Date().toISOString()
        )

        const newArticleDB = newArticle.toDBModel()
        await this.articleDatabase.insertArticle(newArticleDB)

        const output: CreateArticleOutput = {
            message: "Artigo cadastrado com sucesso!",
            article: newArticle.toBusinessModel()
        }

        return output
    }

    public editArticle = async (input: EditArticleInput): Promise<CreateArticleOutput> => {
        const { id, title, url, author } = input

        if(title !== undefined){
            if(typeof title !== 'string' && title !== undefined){
                throw new BadRequestError("'title' deve ser 'string' ou 'undefined'");
            }
        }
        if(url !== undefined){
            if(typeof url !== 'string' && url !== undefined){
                throw new BadRequestError("'url' deve ser 'string' ou 'undefined'");
            }
        }
        if(author !== undefined){
            if(typeof author !== 'string' && author !== undefined){
                throw new BadRequestError("'author' deve ser 'string' ou 'undefined'");
            }
        }


        const articleDBExists  = await this.articleDatabase.findArticleById(id)

        if(!articleDBExists){
            throw new BadRequestError("Artigo nao encontrado!")
        }

        const newArticle = new Article(
            articleDBExists.id,
            title || articleDBExists.title,
            url || articleDBExists.url,
            author || articleDBExists.author,
            articleDBExists.created_at
        )

        const newArticleDB = newArticle.toDBModel()
        await this.articleDatabase.editArticle(newArticleDB)

        const output: CreateArticleOutput = {
            message: "Artigo editado com sucesso",
            article: newArticle.toBusinessModel()
        }

        return output 
           

    }

    public deleteArticle = async (id:string) => {
        if(typeof id !== 'string'){
            throw new BadRequestError("'id' must be a string")
        }

        const articleDBExists = await this.articleDatabase.findArticleById(id)

        if(!articleDBExists){
            throw new BadRequestError("Article not Found")
        }

        const newArticle = new Article(
            articleDBExists.id,
            articleDBExists.title,
            articleDBExists.url,
            articleDBExists.author,
            articleDBExists.created_at
        )

        await this.articleDatabase.deleteArticle(id)

        const output: CreateArticleOutput = {
            message: "Artigo deletado com sucesso!",
            article: newArticle.toBusinessModel()
        }
    }
}

