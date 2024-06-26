import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TankService } from './tank.service';
import { Tank } from '@prisma/client';
import { CreateTankDto, UpdateTankDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { tanks } from './mock';
import { Public } from 'src/common/decorators/public.decorator';
import { TankEntity } from './entities';
import { safeDeserialize, SerializationService } from '../common/sterilization';

@ApiTags('Tanks')
@Controller('tanks')
export class TankController {
  constructor(private readonly tankService: TankService) {}

  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all tanks',
    isArray: true,
    type: TankEntity,
  })
  async getAll(): Promise<object[]> {
    const tanks = await this.tankService.getAll();
    return tanks.map((tank) => SerializationService.serialize(tank));
  }

  @Public()
  @Post()
  async create(@Body() data: CreateTankDto): Promise<Tank> {
    const tank = safeDeserialize(TankEntity, data);
    return this.tankService.create(tank);
  }

  @Get('find/:id')
  async getById(@Param('id') id: string): Promise<Tank> {
    return this.tankService.getById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateTankDto,
  ): Promise<Tank> {
    return this.tankService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Tank> {
    return this.tankService.delete(id);
  }

  @Public()
  @Post('create-initial')
  async createInitial(): Promise<void> {
    await this.tankService.createMany(tanks);
  }
}
