import { Module } from '@nestjs/common';
import { UserMemoryRepository } from './repositories';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserMemoryRepository],
  exports: [UserMemoryRepository],
})
export class UsersModule {}
