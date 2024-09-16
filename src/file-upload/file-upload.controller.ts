import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('FILES')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
  @Post('uploadImage/:id')
@UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@Param('id') productId: string, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 200000,
          message: 'File must be 200kb max'
        }),
        new FileTypeValidator({
          fileType: /(jpg|jpeg|png|webp)$/,
        })
      ]
    })
  ) file: Express.Multer.File){
    return this.fileUploadService.uploadImage(file, productId)
  }
}
