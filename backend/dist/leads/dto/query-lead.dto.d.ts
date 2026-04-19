import { LeadStatus } from '../../schemas/lead.schema';
export declare class QueryLeadDto {
    page?: number;
    limit?: number;
    status?: LeadStatus;
    q?: string;
    sort?: string;
    order?: 'asc' | 'desc';
}
