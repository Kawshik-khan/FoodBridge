import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { RatingsService } from './ratings.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { CreateRatingDto } from './dto/create-rating.dto'

@UseGuards(JwtAuthGuard)
@Controller('ratings')
export class RatingsController {
  constructor(private ratings: RatingsService) {}

  @Post()
  create(@CurrentUser('userId') userId: string, @Body() body: CreateRatingDto) {
    return this.ratings.create(userId, body)
  }

  @Get('user/:id')
  getByUser(@Param('id') id: string) {
    return this.ratings.getByUser(id)
  }
}
