import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true, minlength: 1, maxlength: 500 })
  text: string;

  @Prop({ type: Types.ObjectId, ref: 'Lead', required: true })
  leadId: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
