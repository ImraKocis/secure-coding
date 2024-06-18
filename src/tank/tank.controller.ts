import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TankService } from './tank.service';
import { Tank } from '@prisma/client';
import { CreateTankDto, UpdateTankDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { tanks } from './mock';
// import { Public } from 'src/common/decorators/public.decorator';
import { TankEntity } from './entities';

@ApiTags('Tanks')
@Controller('tanks')
export class TankController {
  constructor(private readonly tankService: TankService) {}

  // @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all tanks',
    isArray: true,
    type: TankEntity,
  })
  async getAll(): Promise<Tank[]> {
    return this.tankService.getAll();
  }

  @Post()
  async create(@Body() data: CreateTankDto): Promise<Tank> {
    return this.tankService.create(data);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Tank> {
    return this.tankService.getById(id);
  }

  @Put(':id')
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

  // @Public()
  @Post('create-initial')
  async createInitial(): Promise<void> {
    await this.tankService.createMany(tanks);
  }

  @Get('name/:name')
  async getByName(@Param('name') name: string): Promise<Tank[]> {
    return this.tankService.getByName(name);
  }
}
