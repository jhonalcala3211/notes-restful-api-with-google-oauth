import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './note.schema';

@Injectable()

// CRUD service for notes
export class NotesService {
    constructor(@InjectModel('Note') private noteModel: Model<Note>) { }

    async create(userId: string, data: any) {
        return this.noteModel.create({ ...data, userId });
    }

    async findAll(userId: string, page = 1, limit = 5) {
        const skip = (page - 1) * limit;
        const notes = await this.noteModel
            .find({ userId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await this.noteModel.countDocuments({ userId });

        return {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            notes,
        };
    }

    async findOne(userId: string, id: string) {
        const note = await this.noteModel.findById(id);
        if (!note || note.userId.toString() !== userId) throw new ForbiddenException();
        return note;
    }

    async update(userId: string, id: string, data: any) {
        const note = await this.findOne(userId, id);
        Object.assign(note, data);
        return note.save();
    }

    async remove(userId: string, id: string) {
        const note = await this.findOne(userId, id);
        return note.deleteOne();
    }
}
