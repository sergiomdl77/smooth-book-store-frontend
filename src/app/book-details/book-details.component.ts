import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  public bookOfInterest: Book = {} as Book;

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      () => {
        this.getBookOfInterest();
      }
    )
  }

  public getBookOfInterest():void {
    let bookId: number = Number(this.activatedRoute.snapshot.paramMap.get('book_id'));

    this.bookService.getBook(bookId).subscribe(
      (response: Book) => {
        this.bookOfInterest = response;
        console.log(this.bookOfInterest);
      }
    )
  }
}
