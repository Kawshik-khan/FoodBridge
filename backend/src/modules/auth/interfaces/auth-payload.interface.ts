import { Role } from '../../../common/enums/role.enum'

export interface AuthPayload {
  sub: string
  role: Role
  sid: string
}
