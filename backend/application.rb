require 'sinatra'
require "mailgun-ruby"
require 'net/http'

before do
  content_type :json
  headers 'Access-Control-Allow-Origin' => '*',
          'Access-Control-Allow-Methods' => ['POST']
end

set :protection, false
set :public_dir, Proc.new { File.join(root, "_site") }

post '/send_email' do
  content_type :json
  if validRecaptcha?(params["g-recaptcha-response"])
    begin
      sendEmails(params)
      return { :message => 'success' }.to_json
    rescue
      return { :message => 'failure_email' }.to_json
    end
  else
    return { :message => 'failure_recaptcha' }.to_json
  end
end

not_found do
  File.read('_site/404.html')
end

get '/*' do
  file_name = "_site#{request.path_info}/index.html".gsub(%r{\/+},'/')
  if File.exists?(file_name)
    File.read(file_name)
  else
    raise Sinatra::NotFound
  end
end

def makeMessage(sender, message)
  senderStr = "<p>message was sent from: " + sender.strip + "</p><hr>"
  return (senderStr + message)
end

def confirmationBody(message)
  genericResponse = "<p>Thank you for getting in touch.</p><p>We will get back to you as soon as possible.</p><strong>Cole & Lopez</strong>"
  return (genericResponse + "<hr>" + "<p>You sent:</p><blockquote>" + message + "</blockquote>")
end

def validRecaptcha?(recaptchaToken)
  data = {
    'secret' => "6LedD3oUAAAAAHWb0ZBu2LGnmPldrCakx78JNGp8",
    'response' => recaptchaToken
  }
  res = Net::HTTP.post_form(URI.parse('https://www.google.com/recaptcha/api/siteverify'), data)
  return JSON.parse(res.body)["success"]
end

def sendEmails(params)
  mg_client = Mailgun::Client.new '05f12f2fda355bb021dfd471b9df31c3-9525e19d-ee045040'

  msgToUser =  { from: 'info@coleandlopez.com',
                 to: params[:email].strip,
                 subject: "Thank you for your message.",
                 text: "Thank you for getting in touch.\n\nWe will get back to you as soon as possible.\n\nCole & Lopez\n\nYou sent:\n\n" + params[:message],
                 html: confirmationBody(params[:message])
               }

  msgToOwners =  { from: 'contact-form@coleandlopez.com',
                   to:   'info@coleandlopez.com',
                   subject: "from web form: " + params[:subject],
                   text: "message was sent from: " + params[:email].strip + "\n\n" + params[:message],
                   html: makeMessage(params[:email], params[:message])
                 }

  mg_client.send_message('mailgun.coleandlopez.com', msgToUser)
  mg_client.send_message('mailgun.coleandlopez.com', msgToOwners)
end
