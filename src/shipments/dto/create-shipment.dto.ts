import { ShipmentStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';



export class CreateShipmentDto {
    @IsString()
    @IsNotEmpty()
    trackingCode: string;

    @IsString()
    @IsNotEmpty()
    trackingNumber: string;

    @IsString()
    @IsNotEmpty()
    carrier: string;

    @IsString()
    senderName: string;

    @IsString()
    receiverName: string;

    @IsString()
    origin: string;

    @IsString()
    destination: string;

    @IsEnum(ShipmentStatus)
    status?: ShipmentStatus;
}
