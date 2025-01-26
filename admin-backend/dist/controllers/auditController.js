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
exports.fetchNotesFromUserBackend = void 0;
const auditLogModel_1 = __importDefault(require("../models/auditLogModel"));
const axios_1 = __importDefault(require("axios"));
const USER_BACKEND_URL = process.env.USER_BACKEND_URL || 'http://localhost:3001';
// Fetch Notes from User Backend
const fetchNotesFromUserBackend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const adminToken = req.headers.authorization;
        if (!adminToken) {
            return res.status(401).send('Unauthorized');
        }
        // Make a secure API call to the User Backend
        const response = yield axios_1.default.get(`${USER_BACKEND_URL}/notes`, {
            headers: { Authorization: adminToken },
        });
        // Log the action
        const log = new auditLogModel_1.default({
            action: 'Fetched user notes',
            adminId: (_a = req.admin) === null || _a === void 0 ? void 0 : _a.adminId, // Safe access with TypeScript
        });
        yield log.save();
        res.json(response.data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching notes:', error.message);
            res.status(500).send('Failed to fetch notes from User Backend');
        }
        else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
});
exports.fetchNotesFromUserBackend = fetchNotesFromUserBackend;
