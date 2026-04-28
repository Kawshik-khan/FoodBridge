import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { UpdateMeDto } from './dto/update-me.dto'

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get('me')
  async me(@CurrentUser('userId') userId: string) {
    return this.users.me(userId)
  }

  @Patch('me')
  async updateMe(@CurrentUser('userId') userId: string, @Body() body: UpdateMeDto) {
    return this.users.updateMe(userId, body)
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.users.findById(id)
  }
}
