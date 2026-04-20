"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const frontendUrl = process.env.FRONTEND_URL;
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
        'http://localhost:3000',
        'https://lead-tracker-challenge.vercel.app',
    ];
    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Lead Tracker API')
        .setDescription('CRM API for managing leads and comments')
        .setVersion('1.0')
        .addTag('leads', 'Lead management endpoints')
        .addTag('comments', 'Comment management endpoints')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`Swagger documentation: http://localhost:${port}/api/docs`);
    console.log(`CORS enabled for: ${allowedOrigins.join(', ')}`);
}
bootstrap();
//# sourceMappingURL=main.js.map