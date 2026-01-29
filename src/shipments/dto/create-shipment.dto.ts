import { ShipmentStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateShipmentDto {
    @IsString()
    @IsNotEmpty()
    senderName: string;

    @IsString()
    @IsNotEmpty()
    receiverName: string;

    @IsString()
    @IsNotEmpty()
    origin: string;

    @IsString()
    @IsNotEmpty()
    destination: string;

    @IsEnum(ShipmentStatus)
    @IsOptional()
    status?: ShipmentStatus;

    @IsString()
    @IsOptional()
    trackingCode?: string;

    @IsString()
    @IsOptional()
    trackingNumber?: string;

    @IsString()
    @IsOptional()
    carrier?: string;
}
