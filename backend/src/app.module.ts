import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { LeadsModule } from './leads/leads.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  // imports: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    LeadsModule,
    CommentsModule,
    // LeadsModule,
    // CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
