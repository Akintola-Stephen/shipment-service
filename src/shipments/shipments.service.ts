import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Shipment } from '@prisma/client';

@Injectable()
export class ShipmentsService {
    constructor(private readonly prisma: PrismaService) { }

    /**
     * Create a new shipment.
     * Generates a tracking number and sets a default carrier if not provided.
     * @param payload DTO containing shipment data from the client
     * @returns Created Shipment record
     */
    async registerShipment(payload: CreateShipmentDto): Promise<Shipment> {
        const shipmentData = {
            senderName: payload.senderName,
            receiverName: payload.receiverName,
            origin: payload.origin,
            destination: payload.destination,
            status: payload.status || 'PENDING',
            carrier: payload.carrier ?? 'DHL',
            trackingNumber: payload.trackingNumber ?? this.generateTrackingNumber(),
            trackingCode: payload.trackingCode ?? this.generateTrackingNumber(),
        };

        return this.prisma.shipment.create({
            data: shipmentData,
        });
    }



    /**
     * Retrieve all shipments, ordered by creation date descending.
     * @returns Array of Shipment records
     */
    async listAllShipments(): Promise<Shipment[]> {
        return this.prisma.shipment.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    /**
     * Retrieve a single shipment by its UUID.
     * @param shipmentId UUID of the shipment
     * @throws NotFoundException if shipment does not exist
     * @returns Shipment record
     */
    async getShipmentById(shipmentId: string): Promise<Shipment> {
        const shipment = await this.prisma.shipment.findUnique({
            where: { id: shipmentId },
        });

        if (!shipment) {
            throw new NotFoundException(`Shipment with ID ${shipmentId} not found`);
        }

        return shipment;
    }

    /**
     * Update an existing shipment.
     * @param shipmentId UUID of the shipment
     * @param updates DTO containing fields to update
     * @returns Updated Shipment record
     */
    async modifyShipment(
        shipmentId: string,
        updates: UpdateShipmentDto,
    ): Promise<Shipment> {
        // Ensure shipment exists before updating
        await this.getShipmentById(shipmentId);

        return this.prisma.shipment.update({
            where: { id: shipmentId },
            data: updates,
        });
    }

    /**
     * Remove a shipment by its UUID.
     * @param shipmentId UUID of the shipment
     * @returns Deleted Shipment record
     */
    async cancelShipment(shipmentId: string): Promise<Shipment> {
        // Ensure shipment exists before deleting
        await this.getShipmentById(shipmentId);

        return this.prisma.shipment.delete({
            where: { id: shipmentId },
        });
    }

    /**
     * Generate a unique tracking number for a shipment.
     * @returns Tracking number string
     */
    private generateTrackingNumber(): string {
        return 'TRK' + Math.floor(Math.random() * 1_000_000)
            .toString()
            .padStart(6, '0');
    }
}
