class CreateUserController < ApplicationController
  def create
    user = User.create(user_params)

    if user.save
      return render json: {
        msg: 'user created'
      }, status: 201
    end

    render json: { errors: user.errors.to_json }, status: 400
  end

  private

  def user_params
    params.require(:user).permit(
      :first_name,
      :second_name,
      :email,
      :document,
      :document_type
    )
  end
end
