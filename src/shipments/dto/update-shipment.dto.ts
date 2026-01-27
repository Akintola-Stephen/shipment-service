import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ShipmentStatus } from 'generated/prisma';

export class UpdateShipmentDto {
    @IsOptional()
    @IsString()
    senderName?: string;

    @IsOptional()
    @IsString()
    receiverName?: string;

    @IsOptional()
    @IsString()
    origin?: string;

    @IsOptional()
    @IsString()
    destination?: string;

    @IsOptional()
    @IsEnum(ShipmentStatus)
    status?: ShipmentStatus;
}
