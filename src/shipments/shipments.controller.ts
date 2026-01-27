import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Shipment } from '@prisma/client';

@Controller('api/shipments')
export class ShipmentsController {
    constructor(private readonly shipmentsService: ShipmentsService) { }

    /**
     * Register a new shipment.
     * POST /api/shipments
     * @param payload DTO containing shipment details
     * @returns The newly created Shipment
     */
    @Post()
    async registerShipment(
        @Body() payload: CreateShipmentDto,
    ): Promise<Shipment> {
        return this.shipmentsService.registerShipment(payload);
    }

    /**
     * Retrieve all shipments, newest first.
     * GET /api/shipments
     * @returns Array of Shipments
     */
    @Get()
    async listShipments(): Promise<Shipment[]> {
        return this.shipmentsService.listAllShipments();
    }

    /**
     * Retrieve a single shipment by its UUID.
     * GET /api/shipments/:id
     * @param shipmentId UUID of the shipment
     * @returns The Shipment
     */
    @Get(':id')
    async getShipment(
        @Param('id') shipmentId: string,
    ): Promise<Shipment> {
        return this.shipmentsService.getShipmentById(shipmentId);
    }

    /**
     * Update an existing shipment.
     * PUT /api/shipments/:id
     * @param shipmentId UUID of the shipment
     * @param updates DTO containing fields to update
     * @returns The updated Shipment
     */
    @Put(':id')
    async updateShipment(
        @Param('id') shipmentId: string,
        @Body() updates: UpdateShipmentDto,
    ): Promise<Shipment> {
        return this.shipmentsService.modifyShipment(shipmentId, updates);
    }

    /**
     * Cancel a shipment.
     * DELETE /api/shipments/:id
     * @param shipmentId UUID of the shipment
     * @returns The deleted Shipment
     */
    @Delete(':id')
    async cancelShipment(
        @Param('id') shipmentId: string,
    ): Promise<Shipment> {
        return this.shipmentsService.cancelShipment(shipmentId);
    }
}
