import { BookService } from './service/book.service';
import { Component } from '@angular/core';
import { Book } from 'src/app/models/book';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public bookService: BookService) {}

  ngOnInit() {
    this.getBooks();
  }


  // Functions that is call upon creation of the root component of the app to make sure
  // that the homepage displays by default all of the available books.
  public getBooks(): void
  {
    this.bookService.getAllBooks().subscribe(
      (response: Book[]) => {
        this.bookService.bookSearchResults = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
