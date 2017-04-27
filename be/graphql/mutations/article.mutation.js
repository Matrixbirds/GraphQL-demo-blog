'use strict';
module.exports = ({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
}, {Article}, Types) => {

    const {input: ArticleInputType, query: ArticleType} = Types.ArticleType;

    const createMutation = {
        type: ArticleType,
        args: {
            input: { type: new GraphQLNonNull(ArticleInputType) }
        },
        async resolve(object, {input}, {currentUser}) {
            const {dataValues: {id: user_id}} = await currentUser;
            Object.assign(input, {user_id: user_id});
            return Article.create(input);
        }
     };

    const editMutation = {
        type: ArticleType,
        args: {
            input: { type: new GraphQLNonNull(ArticleInputType) }
        },
        async resolve(object, {input}, {currentUser}) {
            const {dataValues: {id: user_id}} = await currentUser;
            const record = await Article.findOne({where: {id: input.id, user_id: user_id}})
            if (!record) throw Error(`Article id: ${id}'s Not Found`)
            return record.update(input, {fields: ['content', 'title']});
        }
    };

    const destroyMutation = {
        type: ArticleType,
        args: {
            input: { type: new GraphQLNonNull(ArticleInputType) }
        },
        async resolve(object, {input}, {currentUser}) {
            const {dataValues: {id: user_id}} = await currentUser;
            const record = await Article.findOne({where: {id: input.id, user_id: user_id}})
            if (!record) throw Error(`Article id: ${id}'s Not Found`)
            return record.destroy({});
        }
    };


    const ArticleMutation = {
        create: createMutation,
        edit: editMutation,
        destroy: destroyMutation,
    }
    return ArticleMutation;
}
