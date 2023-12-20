import { AppAbility } from '@auth/casl';
import { CheckPolicies } from '@auth/decorators';
import { Actions } from '@auth/entities';
import { AuthGuard, PolicyGuard } from '@auth/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard, PolicyGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, User))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, User))
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Create, User))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Update, User))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Delete, User))
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
