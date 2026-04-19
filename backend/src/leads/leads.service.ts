import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Lead } from '../schemas/lead.schema';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { QueryLeadDto } from './dto/query-lead.dto';

@Injectable()
export class LeadsService {
  constructor(@InjectModel(Lead.name) private leadModel: Model<Lead>) {}

  async create(createLeadDto: CreateLeadDto) {
    try {
      const lead = new this.leadModel(createLeadDto);
      return await lead.save();
    } catch (error) {
      throw new BadRequestException('Invalid lead data: ' + error.message);
    }
  }

  async findAll(query: QueryLeadDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const { status, q, sort = 'createdAt', order = 'desc' } = query;

    // Build filter
    const filter: any = {};
    if (status) filter.status = status;

    // Search functionality
    if (q && q.trim()) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { company: { $regex: q, $options: 'i' } },
      ];
    }

    // Sorting
    const sortOrder = order === 'asc' ? 1 : -1;
    // const sortField = sort;
    const sortObject: any = {};
    sortObject[sort] = sortOrder;

    // Pagination
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
    } catch (error) {
      throw new BadRequestException('Error fetching leads: ' + error.message);
    }
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid lead ID format');
    }

    const lead = await this.leadModel.findById(id).populate('comments').exec();

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    return lead;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid lead ID format');
    }

    const lead = await this.leadModel
      .findByIdAndUpdate(id, updateLeadDto, { new: true, runValidators: true })
      .populate('comments')
      .exec();

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    return lead;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid lead ID format');
    }

    const result = await this.leadModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    return { message: 'Lead deleted successfully', id };
  }
}
