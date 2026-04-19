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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_schema_1 = require("../schemas/comment.schema");
const lead_schema_1 = require("../schemas/lead.schema");
let CommentsService = class CommentsService {
    commentModel;
    leadModel;
    constructor(commentModel, leadModel) {
        this.commentModel = commentModel;
        this.leadModel = leadModel;
    }
    async create(leadId, createCommentDto) {
        if (!mongoose_2.Types.ObjectId.isValid(leadId)) {
            throw new common_1.BadRequestException('Invalid lead ID format');
        }
        const lead = await this.leadModel.findById(leadId);
        if (!lead) {
            throw new common_1.NotFoundException(`Lead with ID ${leadId} not found`);
        }
        const comment = new this.commentModel({
            ...createCommentDto,
            leadId: new mongoose_2.Types.ObjectId(leadId),
        });
        await comment.save();
        await this.leadModel.findByIdAndUpdate(leadId, {
            $push: { comments: comment._id },
        });
        return comment;
    }
    async findAllByLead(leadId) {
        if (!mongoose_2.Types.ObjectId.isValid(leadId)) {
            throw new common_1.BadRequestException('Invalid lead ID format');
        }
        const comments = await this.commentModel
            .find({ leadId: new mongoose_2.Types.ObjectId(leadId) })
            .sort({ createdAt: -1 })
            .exec();
        return comments;
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __param(1, (0, mongoose_1.InjectModel)(lead_schema_1.Lead.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CommentsService);
//# sourceMappingURL=comments.service.js.map