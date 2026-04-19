import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { QueryLeadDto } from './dto/query-lead.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(createLeadDto: CreateLeadDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/lead.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/lead.schema").Lead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: QueryLeadDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("../schemas/lead.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/lead.schema").Lead & Required<{
            _id: import("mongoose").Types.ObjectId;
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
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/lead.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/lead.schema").Lead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateLeadDto: UpdateLeadDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/lead.schema").Lead, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/lead.schema").Lead & Required<{
        _id: import("mongoose").Types.ObjectId;
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
