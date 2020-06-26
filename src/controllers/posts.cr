module Controller
    module Posts
        extend self

        Query = Crecto::Repo::Query

        def all()
            Model::ConnDB.all(Model::Post, Query.order_by("id DESC"))
        end

        def post(env)
            id = env.params.url["id"]
            Model::ConnDB.all(Model::Post, Query.where(id: id.to_i))
        end

    end
end