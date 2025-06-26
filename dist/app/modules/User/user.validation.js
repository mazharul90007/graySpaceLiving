"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
const genders = ['male', 'female', 'non-binary'];
const beliefs = ['spiritual', 'religious', 'agnostic', 'atheist'];
const registerUser = zod_1.default.object({
    body: zod_1.default.object({
        nickname: zod_1.default.string({ required_error: 'Nickname is required!' }),
        email: zod_1.default
            .string({ required_error: 'Email is required!' })
            .email({ message: 'Invalid email format!' }),
        password: zod_1.default.string({ required_error: 'Password is required!' }),
        ageRange: zod_1.default.enum(ageRanges, { required_error: 'Age range is required!' }),
        gender: zod_1.default.enum(genders, { required_error: 'Gender is required!' }),
        coreValues: zod_1.default
            .array(zod_1.default.string())
            .min(1, 'At least one core value is required!'),
        belief: zod_1.default.enum(beliefs, { required_error: 'Belief is required!' }),
        intention: zod_1.default
            .array(zod_1.default.string())
            .min(1, 'At least one intention is required!'),
        interestedArea: zod_1.default
            .array(zod_1.default.string())
            .min(1, 'At least one interested area is required!'),
    }),
});
exports.userValidation = { registerUser };
