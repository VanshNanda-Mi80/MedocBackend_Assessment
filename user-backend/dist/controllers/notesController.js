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
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNotes = void 0;
const notesModel_1 = __importDefault(require("../models/notesModel"));
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notesModel_1.default.find({ userId: req.user.userId });
    res.json(notes);
});
exports.getNotes = getNotes;
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const note = new notesModel_1.default({ title, description, userId: req.user.userId });
    yield note.save();
    res.status(201).json(note);
});
exports.createNote = createNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedNote = yield notesModel_1.default.findByIdAndUpdate(id, { title, description }, { new: true });
    res.json(updatedNote);
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield notesModel_1.default.findByIdAndDelete(id);
    res.status(204).send();
});
exports.deleteNote = deleteNote;
