import { Model, Types } from 'mongoose';
import { Lead } from '../schemas/lead.schema';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { QueryLeadDto } from './dto/query-lead.dto';
export declare class LeadsService {
    private leadModel;
    constructor(leadModel: Model<Lead>);
    create(createLeadDto: CreateLeadDto): Promise<import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: QueryLeadDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateLeadDto: UpdateLeadDto): Promise<import("mongoose").Document<unknown, {}, Lead, {}, import("mongoose").DefaultSchemaOptions> & Lead & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
