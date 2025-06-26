import * as bcrypt from 'bcrypt';
import prisma from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createUser = async (payload: {
  nickname: string;
  email: string;
  password: string;
  ageRange: string;
  gender: string;
  coreValues: string[];
  belief: string;
  intention: string[];
  interestedArea: string[];
}) => {
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already registered');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
      isEmailVerified: false,
    },
  });

  // Remove password from returned user object
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const resendUserVerificationEmail = async (email: string) => {
  // Placeholder: Implement email sending logic here if needed
  return true;
};

export const UserServices = { createUser, resendUserVerificationEmail };
