import { Model, Types } from 'mongoose';
import { Comment } from '../schemas/comment.schema';
import { Lead } from '../schemas/lead.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsService {
    private commentModel;
    private leadModel;
    constructor(commentModel: Model<Comment>, leadModel: Model<Lead>);
    create(leadId: string, createCommentDto: CreateCommentDto): Promise<import("mongoose").Document<unknown, {}, Comment, {}, import("mongoose").DefaultSchemaOptions> & Comment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAllByLead(leadId: string): Promise<(import("mongoose").Document<unknown, {}, Comment, {}, import("mongoose").DefaultSchemaOptions> & Comment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
