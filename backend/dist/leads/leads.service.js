"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lead_schema_1 = require("../schemas/lead.schema");
let LeadsService = class LeadsService {
    leadModel;
    constructor(leadModel) {
        this.leadModel = leadModel;
    }
    async create(createLeadDto) {
        try {
            const lead = new this.leadModel(createLeadDto);
            return await lead.save();
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid lead data: ' + error.message);
        }
    }
    async findAll(query) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const { status, q, sort = 'createdAt', order = 'desc' } = query;
        const filter = {};
        if (status)
            filter.status = status;
        if (q && q.trim()) {
            filter.$or = [
                { name: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } },
                { company: { $regex: q, $options: 'i' } },
            ];
        }
        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObject = {};
        sortObject[sort] = sortOrder;
        const skip = (page - 1) * limit;
        try {
            const [items, total] = await Promise.all([
                this.leadModel
                    .find(filter)
                    .sort(sortObject)
                    .skip(skip)
                    .limit(limit)
                    .populate('comments')
                    .exec(),
                this.leadModel.countDocuments(filter),
            ]);
            return {
                items,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Error fetching leads: ' + error.message);
        }
    }
    async findOne(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid lead ID format');
        }
        const lead = await this.leadModel.findById(id).populate('comments').exec();
        if (!lead) {
            throw new common_1.NotFoundException(`Lead with ID ${id} not found`);
        }
        return lead;
    }
    async update(id, updateLeadDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid lead ID format');
        }
        const lead = await this.leadModel
            .findByIdAndUpdate(id, updateLeadDto, { new: true, runValidators: true })
            .populate('comments')
            .exec();
        if (!lead) {
            throw new common_1.NotFoundException(`Lead with ID ${id} not found`);
        }
        return lead;
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid lead ID format');
        }
        const result = await this.leadModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Lead with ID ${id} not found`);
        }
        return { message: 'Lead deleted successfully', id };
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lead_schema_1.Lead.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LeadsService);
//# sourceMappingURL=leads.service.js.map