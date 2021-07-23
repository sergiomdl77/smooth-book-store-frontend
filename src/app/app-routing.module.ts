import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookMainComponent } from './book-main/book-main.component';
import { AboutMainComponent } from './about-main/about-main.component';
import { CartMainComponent } from './cart-main/cart-main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';




const routes: Routes = [
  { path: 'books', component: BookMainComponent },
  { path: 'about', component: AboutMainComponent },
  { path: 'cart', component: CartMainComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

