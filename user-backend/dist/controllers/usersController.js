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
exports.deleteUserById = exports.getUserById = exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel")); // Assuming you have a User model defined
// Fetch All User Profiles
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({}, '_id name email'); // Fetch specific fields only
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Failed to fetch users');
    }
});
exports.getAllUsers = getAllUsers;
// Fetch Details of a Specific User
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userModel_1.default.findById(id, '_id name email'); // Fetch specific fields only
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    }
    catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).send('Failed to fetch user details');
    }
});
exports.getUserById = getUserById;
// Delete a User Profile
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userModel_1.default.findByIdAndDelete(id); // Delete the user by ID
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(204).send(); // No content
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Failed to delete user');
    }
});
exports.deleteUserById = deleteUserById;
