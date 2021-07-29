module Controller
    module Projects
        extend self

        Query = Crecto::Repo::Query

        def all()
            Model::ConnDB.all(Model::Project, Query.order_by("id DESC"))
        end

    end
end