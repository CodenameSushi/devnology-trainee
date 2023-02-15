import { ArticlesDatabase } from "../database/ArticlesDatabase";
import { CreateArticleInput, CreateArticleOutput,  GetArticlesOutput } from "../dtos/articleDTO";
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

