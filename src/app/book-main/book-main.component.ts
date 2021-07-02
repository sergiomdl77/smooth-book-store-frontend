import { BookListComponent } from './../book-list/book-list.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../models/book';
import { BookService } from '../service/book.service';


@Component({
  selector: 'book-main',
  templateUrl: './book-main.component.html',
  styleUrls: ['./book-main.component.css']
})
export class BookMainComponent{

  constructor(public bookService: BookService  ) { }


  public filterByCategory(selectedCategory: string, smallerBookTitleToSearch: boolean): void{
    if (selectedCategory === "")
      selectedCategory = "all categories";

    if(this.bookService.currentCategory != selectedCategory || smallerBookTitleToSearch)
    {
      this.bookService.currentCategory = selectedCategory;
      if (selectedCategory === 'all categories')
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
      else{
        this.bookService.getBooksByCategory(selectedCategory).subscribe(
          (response: Book[]) => {
            this.bookService.bookSearchResults = response;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );      
      }
    }
  }


  // If there was at least one letter in "search by name" text input, this method will modify the list of restaurant 
  // search results (which is a property of the restaurantService to be available to several components) to then be 
  // deliver the final result from filtering chain.
  public filterByName(bookTitle:string): void{
    let categoryFilterResults = this.bookService.bookSearchResults;

    if (bookTitle !== "")          // if there is at least one letter in filter by name (text input)
    {
      this.bookService.bookSearchResults = [];
      for (let book of categoryFilterResults)
      {
        if (book.title.toLowerCase().indexOf(bookTitle.toLowerCase()) !== -1)
          this.bookService.bookSearchResults.push(book);
      }
    }
  }

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


  public applyFilters(filters: NgForm): void {
    let smallerBookTitleToSearch = false;

    // If the user deleted a character from the Book Search text box, we enable a flag to signal it.
    // This will indicate the Filter logic to reload the bookSearchResults with all books of the 
    // current category searched
    if (filters.value.bookTitle.length < this.bookService.lastBookTitleSearched.length)
      smallerBookTitleToSearch = true;

    this.filterByCategory(filters.value.selectedCategory, smallerBookTitleToSearch);
    this.filterByName(filters.value.bookTitle);

    this.bookService.lastBookTitleSearched = filters.value.bookTitle;

    console.log(filters.value);
  }

}
