import { Document, Types } from 'mongoose';
export declare class Comment extends Document {
    text: string;
    leadId: Types.ObjectId;
}
export declare const CommentSchema: import("mongoose").Schema<Comment, import("mongoose").Model<Comment, any, any, any, any, any, Comment>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Comment, Document<unknown, {}, Comment, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Comment & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Comment, Document<unknown, {}, Comment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Comment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    text?: import("mongoose").SchemaDefinitionProperty<string, Comment, Document<unknown, {}, Comment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Comment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    leadId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Comment, Document<unknown, {}, Comment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Comment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Comment>;
