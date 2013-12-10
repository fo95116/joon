Rails.application.config.middleware.use OmniAuth::Builder do
 provider :instagram, 'caae8938fffc4e5b9f549695cd1e6933', '3a82993046cb400e8f19a181eba43358'
 provider :facebook, 'FACEBOOK_ID', 'FACEBOOK_SECRET'

end