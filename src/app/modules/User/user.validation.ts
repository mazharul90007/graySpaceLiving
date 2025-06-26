import z from 'zod';

const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'] as const;

const genders = ['male', 'female', 'non-binary'] as const;

const beliefs = ['spiritual', 'religious', 'agnostic', 'atheist'] as const;

const registerUser = z.object({
  body: z.object({
    nickname: z.string({ required_error: 'Nickname is required!' }),
    email: z
      .string({ required_error: 'Email is required!' })
      .email({ message: 'Invalid email format!' }),
    password: z.string({ required_error: 'Password is required!' }),
    ageRange: z.enum(ageRanges, { required_error: 'Age range is required!' }),
    gender: z.enum(genders, { required_error: 'Gender is required!' }),
    coreValues: z
      .array(z.string())
      .min(1, 'At least one core value is required!'),
    belief: z.enum(beliefs, { required_error: 'Belief is required!' }),
    intention: z
      .array(z.string())
      .min(1, 'At least one intention is required!'),
    interestedArea: z
      .array(z.string())
      .min(1, 'At least one interested area is required!'),
  }),
});

export const userValidation = { registerUser };
