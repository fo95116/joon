Rails.application.config.middleware.use OmniAuth::Builder do
 provider :instagram, '5780ec8e8d6f47918ee23f31d835eff9', '3d010924b1a648089487a68c234a482c'
 provider :facebook, '612969355436541', '3a2a8dfd341d9a83b5b50493fae13965'

end