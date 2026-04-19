import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from '../schemas/comment.schema';
import { Lead } from '../schemas/lead.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Lead.name) private leadModel: Model<Lead>,
  ) {}

  async create(leadId: string, createCommentDto: CreateCommentDto) {
    // Validate the ID of the lead
    if (!Types.ObjectId.isValid(leadId)) {
      throw new BadRequestException('Invalid lead ID format');
    }

    // Check if the lead exists
    const lead = await this.leadModel.findById(leadId);
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${leadId} not found`);
    }

    // Create comment
    const comment = new this.commentModel({
      ...createCommentDto,
      leadId: new Types.ObjectId(leadId),
    });

    await comment.save();

    // Add comment reference to lead
    await this.leadModel.findByIdAndUpdate(leadId, {
      $push: { comments: comment._id },
    });

    return comment;
  }

  async findAllByLead(leadId: string) {
    if (!Types.ObjectId.isValid(leadId)) {
      throw new BadRequestException('Invalid lead ID format');
    }

    const comments = await this.commentModel
      .find({ leadId: new Types.ObjectId(leadId) })
      .sort({ createdAt: -1 })
      .exec();

    return comments;
  }
}
