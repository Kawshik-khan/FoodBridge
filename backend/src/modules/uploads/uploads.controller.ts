import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { UploadsService } from './uploads.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { Roles } from '../../common/decorators/roles.decorator'
import { Role } from '../../common/enums/role.enum'
import { CreateUploadUrlDto } from './dto/create-upload-url.dto'

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.DONOR, Role.NGO, Role.RECEIVER, Role.MODERATOR)
@Controller('uploads')
export class UploadsController {
  constructor(private uploads: UploadsService) {}

  @Post('signed-url')
  signedUrl(@Body() body: CreateUploadUrlDto) {
    return this.uploads.createUploadTarget(body.provider, body.fileName, body.mimeType, body.folder)
  }
}
