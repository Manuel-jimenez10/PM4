import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesUploadRepository } from './file-upload-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor (private readonly filesRepository: FilesUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>
    ){}

    async uploadImage(file: Express.Multer.File, productId:string){
    const product = await this.productsRepository.findOneBy({id: productId})

    if(!product){
        throw new NotFoundException('Product not found')
    }
    const uploadedImage = await this.filesRepository.uploadImage(file);

    await this.productsRepository.update(product.id, {
        imgUrl: uploadedImage.secure_url,
    })
    return await this.productsRepository.findOneBy({
        id: productId,
    })
    }
}
