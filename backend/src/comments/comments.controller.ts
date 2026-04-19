import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comments')
@Controller('leads/:leadId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a comment to a lead' })
  @ApiResponse({ status: 201, description: 'Comment added successfully' })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  create(
    @Param('leadId') leadId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(leadId, createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments for a lead' })
  @ApiResponse({ status: 200, description: 'Returns comments list' })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  findAll(@Param('leadId') leadId: string) {
    return this.commentsService.findAllByLead(leadId);
  }
}
