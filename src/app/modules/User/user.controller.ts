import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

export const UserControllers = { registerUser };
