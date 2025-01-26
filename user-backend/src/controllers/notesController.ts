import { Request, Response } from 'express';
import Note from '../models/notesModel';

export const getNotes = async (req: any, res: Response) => {
    const notes = await Note.find({ userId: req.user.userId });
    res.json(notes);
};

export const createNote = async (req: any, res: Response) => {
    const { title, description } = req.body;
    const note = new Note({ title, description, userId: req.user.userId });
    await note.save();
    res.status(201).json(note);
};

export const updateNote = async (req: any, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(id, { title, description }, { new: true });
    res.json(updatedNote);
};

export const deleteNote = async (req: any, res: Response) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(204).send();
};
