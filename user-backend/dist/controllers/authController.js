"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_user_backend_secret@001';
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = new userModel_1.default({ name, email, password: hashedPassword });
    yield user.save();
    res.status(201).send('User registered successfully');
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});
exports.loginUser = loginUser;
