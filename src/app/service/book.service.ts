import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/models/book';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiServerUrl = environment.baseUrl;
  public bookSearchResults: Book[] = [];
  public currentCategory: string = '';
  public lastBookTitleSearched: string = '';
  // public currentCategoryBooks: Book[] = [];

  // Injecting the built in HttpClient to make http requests to backend
  constructor(private http: HttpClient) {}

  public getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiServerUrl}/books`)
  }

  public getBook(bookId: number): Observable<Book> {
      return this.http.get<Book>(`${this.apiServerUrl}/book/${bookId}`)
  }

  public addBook(book: Book): Observable<Book> {
      return this.http.post<Book>(`${this.apiServerUrl}/book`, book)
  }    
      
  public updateBook(bookId: number, book: Book): Observable<Book> {
      return this.http.put<Book>(`${this.apiServerUrl}/book/${bookId}`, book)
  }  

  public deleteBook(bookId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/book/${bookId}`)
  }    

  public getBooksByCategory(catName: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiServerUrl}/books-by-category/${catName}`)
  }
}

