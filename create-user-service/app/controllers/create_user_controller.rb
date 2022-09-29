class CreateUserController < ApplicationController
  def create
    user = User.create(user_params)
    if user.save
      publish_confirm_email_service
      return render json: {
        msg: 'user created and email confirmation sended'
      }, status: :created
    end

    render json: { errors: user.errors }, status: :bad_request
  end

  private

  def user_params
    params.permit(
      :first_name,
      :second_name,
      :email,
      :document,
      :document_type
    )
  end

  def publish_confirm_email_service
    PublisherService.publish_direct(user_params, 'bank.direct.sendconfirmmail', 'sendconfirmmail.service')
  end
end
