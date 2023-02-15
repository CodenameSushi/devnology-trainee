import express from 'express'
import { ArticleBusiness } from '../business/ArticleBusiness'
import { ArticleController } from '../controller/ArticleController'
import { ArticlesDatabase } from '../database/ArticlesDatabase'
import { IdGenerator } from '../services/IdGenerator'

export const articleRouter = express.Router()

const articleController = new ArticleController(
    new ArticleBusiness(
        new ArticlesDatabase(),
        new IdGenerator()
    )
)

articleRouter.get("/", articleController.getArticles )
articleRouter.post("/", articleController.createArticle )
articleRouter.put("/:id", articleController.editArticle)
articleRouter.delete("/:id", articleController.deleteArticle)