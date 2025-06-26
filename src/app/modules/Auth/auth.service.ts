import * as bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import { UserServices } from '../User/user.service';
import { generateToken } from '../../utils/generateToken';

const loginUserFromDB = async (payload: {
  email: string;
  password: string;
}) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword: Boolean = await bcrypt.compare(
    payload.password,
    userData.password,
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password incorrect');
  }
  if (!userData.isEmailVerified) {
    await UserServices.resendUserVerificationEmail(userData.email);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Email is not verified, Please check your email for the verification link.',
    );
  }

  const accessToken = await generateToken(
    {
      id: userData.id,
      name: userData.nickname,
      email: userData.email,
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_expires_in as string,
  );
  return {
    id: userData.id,
    name: userData.nickname,
    email: userData.email,
    accessToken: accessToken,
  };
};

export const AuthServices = { loginUserFromDB };
