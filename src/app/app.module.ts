import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // used by toaster
import { NgModule } from '@angular/core';
import { AppRoutesModule } from './routes/routes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper'; // npm package for image upload and crop
import { NgxSpinnerModule } from 'ngx-spinner'; // npm package for loading
import { ToastrModule } from 'ng6-toastr-notifications';
// services
import { FiltersService } from './shared/services/filters.service';
import { GeneralService } from './shared/services/general.service';
// components
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
import { IngredientsEditComponent } from './routes/recipes/recipe-edit/recipe-edit-components/ingredients-edit/ingredients-edit.component';
import { IngredientEditComponent } from './routes/recipes/recipe-edit/recipe-edit-components/ingredients-edit/ingredient-edit/ingredient-edit.component';
import { ImageUploaderAndCropperComponent } from './shared/components/image-uploader-and-cropper/image-uploader-and-cropper.component';

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
    IngredientsEditComponent,
    IngredientEditComponent,
    ImageUploaderAndCropperComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    FiltersService,
    GeneralService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
