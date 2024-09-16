import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "../entities/categories.entity";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Categories])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})

export class CategoriesModule{};