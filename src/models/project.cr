module Model
    class Project < Crecto::Model

        schema "projects" do # table name
            field :id, Int32, primary_key: true
            field :title, String
            field :description, String
            field :link, String
            field :repo, String
            field :logo, String
            field :author, String
        end
    
        validate_required [:title, :link]
    end
end