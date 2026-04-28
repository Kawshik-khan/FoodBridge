import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common'
import { AdminService } from './admin.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { Roles } from '../../common/decorators/roles.decorator'
import { Role } from '../../common/enums/role.enum'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { BanUserDto } from './dto/ban-user.dto'

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MODERATOR)
@Controller('admin')
export class AdminController {
  constructor(private admin: AdminService) {}

  @Get('dashboard')
  dashboard() {
    return this.admin.dashboard()
  }

  @Get('users')
  users() {
    return this.admin.listUsers()
  }

  @Patch('users/:id/ban')
  ban(@Param('id') id: string, @Body() body: BanUserDto) {
    return this.admin.banUser(id, body.reason)
  }

  @Patch('users/:id/verify')
  verify(@Param('id') id: string) {
    return this.admin.verifyUser(id)
  }

  @Get('donations/reported')
  reportedDonations() {
    return this.admin.reportedDonations()
  }

  @Delete('donations/:id')
  deleteDonation(@Param('id') id: string) {
    return this.admin.deleteDonation(id)
  }

  @Get('reports')
  reports() {
    return this.admin.reports()
  }
}
