import { ArticleDB } from "../types";
import { BaseDataBase } from "./BaseDatabase";

export class ArticlesDatabase extends BaseDataBase {
    public static TABLE_ARTICLES = "articles"

    public async findArticles(q: string | undefined){

        let articleDB

        if(q){
            const result: ArticleDB[] = await BaseDataBase
                .connection(ArticlesDatabase.TABLE_ARTICLES)
                .where("title", "LIKE", `%${q}%`)

            articleDB = result 
        }else{
            const result: ArticleDB[] = await BaseDataBase
                .connection(ArticlesDatabase.TABLE_ARTICLES)
                
            articleDB = result 
        }

        return articleDB
    }

    public async findArticleById(id:string){
        const [articleDB]: ArticleDB[] | undefined[] = await BaseDataBase
            .connection(ArticlesDatabase.TABLE_ARTICLES)
            .where({id})

        return articleDB
    }

    public async findArticleByUrl(url:string){
        const [articleDB]: ArticleDB[] | undefined[] = await BaseDataBase
            .connection(ArticlesDatabase.TABLE_ARTICLES)
            .where({url})

        return articleDB
    }

    public async insertArticle(newArticleDB: ArticleDB) {
        await BaseDataBase
            .connection(ArticlesDatabase.TABLE_ARTICLES)
            .insert(newArticleDB)
    }

    public async deleteArticle(id:string){
        await BaseDataBase
            .connection(ArticlesDatabase.TABLE_ARTICLES)
            .del().where({id})
    }
}