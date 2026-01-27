import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ShipmentStatus } from 'generated/prisma';


export class CreateShipmentDto {
    @IsString()
    @IsNotEmpty()
    trackingCode: string;

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