import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { DonationsService } from './donations.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { CreateDonationDto } from './dto/create-donation.dto'
import { UpdateDonationDto } from './dto/update-donation.dto'
import { DonationQueryDto } from './dto/donation-query.dto'

@Controller('donations')
export class DonationsController {
  constructor(private donations: DonationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser('userId') donorId: string, @Body() body: CreateDonationDto) {
    return this.donations.create(donorId, body)
  }

  @Get()
  findAll(@Query() query: DonationQueryDto) {
    return this.donations.findAll(query)
  }

  @UseGuards(JwtAuthGuard)
  @Get('my/listings')
  myListings(@CurrentUser('userId') donorId: string) {
    return this.donations.myListings(donorId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donations.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateDonationDto) {
    return this.donations.update(id, body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donations.remove(id)
  }
}
