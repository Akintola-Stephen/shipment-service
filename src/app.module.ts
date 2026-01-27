import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ShipmentsModule } from './shipments/shipments.module';

@Module({
  imports: [PrismaModule, ShipmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
