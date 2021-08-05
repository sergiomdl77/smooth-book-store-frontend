import { BookListComponent } from './../book-list/book-list.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../models/book';
import { BookService } from '../service/book.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'book-main',
  templateUrl: './book-main.component.html',
  styleUrls: ['./book-main.component.css']
})
export class BookMainComponent{

  constructor(public bookService: BookService  ) { }


  public filterByCategory(selectedCategory: string, smallerBookTitleToSearch: boolean): void{
    if(this.bookService.currentCategory != selectedCategory)
    {
      this.bookService.currentCategory = selectedCategory;
      if (selectedCategory === 'all categories')
      {
        this.bookService.getAllBooks().subscribe(
          (response: Book[]) => {
            this.bookService.currentCategoryBooks = response;
            this.bookService.bookSearchResults = this.bookService.currentCategoryBooks;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );      
      }
      else{
        this.bookService.getBooksByCategory(selectedCategory).subscribe(
          (response: Book[]) => {
            this.bookService.currentCategoryBooks = response;
            this.bookService.bookSearchResults = this.bookService.currentCategoryBooks;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );      
      }
      this.bookService.bookSearchResults = this.bookService.currentCategoryBooks;
    }
  }

  // If there was at least one letter in "search by name" text input, this method will modify the list of restaurant 
  // search results (which is a property of the restaurantService to be available to several components) to then be 
  // deliver the final result from filtering chain.
  public filterByName(bookTitle:string): void{
  //  let categoryFilterResults = this.bookService.bookSearchResults;

    if (bookTitle !== "")          // if there is at least one letter in filter by name (text input)
    {
      this.bookService.bookSearchResults = [];
      for (let book of this.bookService.currentCategoryBooks)
      {
        if (book.title.toLowerCase().indexOf(bookTitle.toLowerCase()) !== -1)
          this.bookService.bookSearchResults.push(book);
      }
    }
    else 
      this.bookService.bookSearchResults = this.bookService.currentCategoryBooks;

  }

  public getBooks(): void
  {
    this.bookService.getAllBooks().subscribe(
      (response: Book[]) => {
        this.bookService.currentCategoryBooks = response;
        this.bookService.bookSearchResults = this.bookService.currentCategoryBooks;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getBooksOfCurrentCategory(selectedCategory: string){
    this.bookService.getBooksByCategory(selectedCategory).subscribe(
      (response: Book[]) => {
        this.bookService.bookSearchResults = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );      
  }

  public displayBookTitleIfAny(): string{
    let message = "";
    if (this.bookService.currentBookTitleSearched === "")
      return "Search Book by Name..."
    else
      return this.bookService.currentBookTitleSearched;
  }

  public getCurrentCategoryHeaderText(): string{
    let header = 'Book Selection from ';

    if (this.bookService.currentCategory === "all categories")
      header+= '"All Categories"';
    if (this.bookService.currentCategory === "scienceandtechnology")
      header+= '"Science and Technology"';
    if (this.bookService.currentCategory === "healthandfitness")
      header+= '"Health and Fitness"';
    if (this.bookService.currentCategory === "nature")
      header+= '"Nature"';
    if (this.bookService.currentCategory === "fiction")
      header+= '"Fiction"';

    return header;
  }

  public applyFilters(filters: NgForm): void {
    let smallerBookTitleToSearch = false;
    let newBookTitleSearched = filters.value.bookTitle;

    // If the user deleted a character from the Book Search text box, we enable a flag to signal it.
    // This will indicate the Filter logic to reload the bookSearchResults with all books of the 
    // current category searched

/*
    if (newBookTitleSearched.length < this.bookService.currentBookTitleSearched.length)
      smallerBookTitleToSearch = true;
*/

    this.filterByCategory(filters.value.selectedCategory, smallerBookTitleToSearch);
    this.filterByName(newBookTitleSearched);

    this.bookService.currentBookTitleSearched = newBookTitleSearched;

    console.log(filters.value);
  }

}