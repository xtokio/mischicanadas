# TODO: Write documentation for `Mischicanadas`
require "dotenv"

# Load ENV variables
Dotenv.load("/var/www/crystal/apps/mischicanadas/.env")
# Dotenv.load #("/Users/luis/Desktop/Code/Crystal/apps/mischicanadas/.env")
PUBLIC_PATH = ENV["PUBLIC_PATH"]
PORT        = ENV["PORT"].to_i

require "kemal"
require "kemal-session"
require "sqlite3"
require "crecto"
require "./models/*"
require "./controllers/*"

public_folder PUBLIC_PATH
localhost = "http://127.0.0.1:#{PORT}"

module Mischicanadas
  VERSION = "0.1.0"

  # TODO: Put your code here
  Kemal::Session.config.secret = "9e7abe8ae041296820a0b69ef0e4a397c87f5866f454d35d432840bc98cfd789439addc260bb6f9a058e88faa7e4a4e416e39d05273f459dd3373dc6387cf69c"
  
  static_headers do |response, filepath, filestat|
    response.headers.add("Cache-control", "public")
    response.headers.add("Cache-control", "max-age=31557600")
    response.headers.add("Cache-control", "s-max-age=31557600")
    response.headers.add("Content-Size", filestat.size.to_s)
  end

  error 404 do
    error_code = "404"
    error_message = "Page / Resource not found"
    render "src/views/error_page.ecr", "src/layouts/base.ecr"
  end

  error 500 do
    error_code = "500"
    error_message = "Server error"
    render "src/views/error_page.ecr", "src/layouts/base.ecr"
  end

  get "/" do |env|
    posts = Controller::Posts.all()

    render "src/views/index.ecr" , "src/layouts/base.ecr"
  end

  get "/post/:id" do |env|
    
    post = Controller::Posts.post(env)

    response = HTTP::Client.get("#{localhost}/assets/mischicanadas/post/#{post[0].filename}")
    response_post = response.body

    render "src/views/post.ecr" , "src/layouts/base.ecr"
  end

  get "/projects" do |env|
    
    projects = Controller::Projects.all()

    render "src/views/projects.ecr" , "src/layouts/base.ecr"
  end

  get "/profile" do |env|
    render "src/views/profile.ecr" , "src/layouts/base.ecr"
  end

end
Kemal.run(PORT)