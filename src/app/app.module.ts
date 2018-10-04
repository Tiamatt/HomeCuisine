import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutesModule } from './routes/routes.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { UserComponent } from './routes/user/user.component';
import { AdminComponent } from './routes/admin/admin.component';
import { ContentComponent } from './layout/content/content.component';
import { MainComponent } from './routes/main/main.component';
import { RecipeListComponent } from './routes/recipes/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './routes/recipes/recipe-edit/recipe-edit.component';
import { RecipeViewComponent } from './routes/recipes/recipe-view/recipe-view.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    UserComponent,
    AdminComponent,
    ContentComponent,
    MainComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
