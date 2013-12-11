Rails.application.config.middleware.use OmniAuth::Builder do
 provider :instagram, 'caae8938fffc4e5b9f549695cd1e6933', '3a82993046cb400e8f19a181eba43358'
 provider :facebook, '1420603004840702', 'feea5433eb0ea3a4d7103a3b05ebedd4'

end