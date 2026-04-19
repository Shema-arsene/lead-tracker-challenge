import { Document, Types } from 'mongoose';
export declare enum LeadStatus {
    NEW = "NEW",
    CONTACTED = "CONTACTED",
    IN_PROGRESS = "IN_PROGRESS",
    WON = "WON",
    LOST = "LOST"
}
export declare class Lead extends Document {
    name: string;
    email: string;
    company: string;
    status: LeadStatus;
    value: number;
    notes: string;
    comments: Types.ObjectId[];
}
export declare const LeadSchema: import("mongoose").Schema<Lead, import("mongoose").Model<Lead, any, any, any, any, any, Lead>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Lead, Document<unknown, {}, Lead, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Lead & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Lead, Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Lead, Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Lead, Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    company?: import("mongoose").SchemaDefinitionProperty<string, Lead, Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<LeadStatus, Lead, Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    value?: import("mongoose").SchemaDefinitionProperty<number, Lead, Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Lead, Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    comments?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Lead, Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Lead>;
