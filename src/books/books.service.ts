import { Injectable } from '@nestjs/common';
import { BookDto } from './book.dto';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async findBook(bookId: string): Promise<Book> {
    return await this.booksRepository.findOne({
      where: { id: parseInt(bookId) },
    });
  }

  async findAll(params): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  createBook(newBook: BookDto): Promise<Book> {
    return this.booksRepository.save(newBook);
  }

  async deleteBook(bookId: string): Promise<any> {
    return await this.booksRepository.delete({ id: parseInt(bookId) });
  }

  async updateBook(bookId: string, newBook: BookDto): Promise<Book> {
    const toUpdate = await this.booksRepository.findOne({
      where: { id: parseInt(bookId) },
    });

    const updated = Object.assign(toUpdate, newBook);

    return this.booksRepository.save(updated);
  }
}
