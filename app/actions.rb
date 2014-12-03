require 'pry'
# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  User.all.to_json
end

post '/contacts/create' do

  response = Hash.new
  response[:result] = false
  @user = User.where(email: params[:email])
  if @user.empty?
    @user = User.new(
      firstname: params[:firstname],
      lastname: params[:lastname],
      email: params[:email],
      phone: params[:phone]
    )

    if @user.save
      response[:result] = true
      response[:id] = @user.id
    end
  else
    response[:error] = "Email already exists"
  end

  response.to_json
end

post '/contacts/search' do
  response = Hash.new
  response[:result] = false
  @user = User.where("firstname LIKE '%#{params[:keyword]}%' OR lastname LIKE '%#{params[:keyword]}%' OR email LIKE '%#{params[:keyword]}%' OR phone LIKE '%#{params[:keyword]}%' ")
  #binding.pry
  if !@user.empty?
    response[:result] = true
    response[:searchresult] = []
    @user.each_with_index do |user|
      contactFound = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone
      }
      response[:searchresult].push(contactFound)
      #binding.pry
    end
    
  else
    #binding.pry
    response[:error] = "No matches!"
  end
  response.to_json
end