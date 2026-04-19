import { LeadStatus } from '../../schemas/lead.schema';
export declare class CreateLeadDto {
    name: string;
    email?: string;
    company?: string;
    status?: LeadStatus;
    value?: number;
    notes?: string;
}
