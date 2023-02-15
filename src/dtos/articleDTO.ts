import { ArticleModel } from "../types";

export interface GetArticlesInput {
    q: unknown
}

export type GetArticlesOutput = ArticleModel[]

export interface CreateArticleInput {
    title: unknown,
    url: unknown,
    author: unknown

}

export interface CreateArticleOutput {
    message: string,
    article: ArticleModel
}

export interface EditArticleInput {
    id: string | undefined,
    title: string | undefined,
    url: string | undefined,
    author: string | undefined
}