import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { RequestsService } from './requests.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { CreateRequestDto } from './dto/create-request.dto'

@UseGuards(JwtAuthGuard)
@Controller('requests')
export class RequestsController {
  constructor(private requests: RequestsService) {}

  @Post()
  create(@CurrentUser('userId') userId: string, @Body() body: CreateRequestDto) {
    return this.requests.create(userId, body)
  }

  @Get('my')
  my(@CurrentUser('userId') userId: string) {
    return this.requests.myRequests(userId)
  }

  @Patch(':id/accept')
  accept(@Param('id') id: string, @CurrentUser('userId') userId: string) {
    return this.requests.accept(id, userId)
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string, @CurrentUser('userId') userId: string) {
    return this.requests.reject(id, userId)
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @CurrentUser('userId') userId: string) {
    return this.requests.cancel(id, userId)
  }
}
