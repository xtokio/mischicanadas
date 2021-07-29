module Model
    class Post < Crecto::Model

        schema "posts" do # table name
            field :id, Int32, primary_key: true
            field :title, String
            field :description, String
            field :filename, String
            field :author, String
        end
    
        validate_required [:title, :filename]
    end
end