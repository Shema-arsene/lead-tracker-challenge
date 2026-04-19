import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(leadId: string, createCommentDto: CreateCommentDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/comment.schema").Comment, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/comment.schema").Comment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(leadId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/comment.schema").Comment, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/comment.schema").Comment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
