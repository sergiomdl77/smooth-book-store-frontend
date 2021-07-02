import { Component } from '@angular/core';
import { BookService } from '../service/book.service';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent{

  constructor(public bookService: BookService ) { }


}
