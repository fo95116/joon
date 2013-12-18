Rails.application.config.middleware.use OmniAuth::Builder do
 provider :instagram, ENV['INSTAGRAM_ID'], ENV['INSTAGRAM_SECRET']
 # provider :facebook, '1420603004840702', 'feea5433eb0ea3a4d7103a3b05ebedd4'

end