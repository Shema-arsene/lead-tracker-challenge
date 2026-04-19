import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  IN_PROGRESS = 'IN_PROGRESS',
  WON = 'WON',
  LOST = 'LOST',
}

@Schema({ timestamps: true })
export class Lead extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({
    required: false,
    lowercase: true,
    trim: true,
    match: /^\S+@\S+\.\S+$/,
  })
  email: string;

  @Prop({ required: false, trim: true })
  company: string;

  @Prop({
    type: String,
    enum: LeadStatus,
    default: LeadStatus.NEW,
  })
  status: LeadStatus;

  @Prop({ required: false, type: Number, min: 0 })
  value: number;

  @Prop({ required: false, trim: true })
  notes: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Comment' }],
    default: [],
  })
  comments: Types.ObjectId[];
}

export const LeadSchema = SchemaFactory.createForClass(Lead);

// Add text index for search functionality
LeadSchema.index({ name: 'text', email: 'text', company: 'text' });
