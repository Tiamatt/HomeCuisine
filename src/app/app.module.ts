import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // used by toaster
import { NgModule } from '@angular/core';
import { AppRoutesModule } from './routes/routes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper'; // npm package for image upload and crop
import { NgxSpinnerModule } from 'ngx-spinner'; // npm package for loading
import { ToastrModule } from 'ng6-toastr-notifications'; // npm package for toaster message
import { NgxSmartModalModule } from 'ngx-smart-modal'; // npm package for modal dialog
// services
import { ApisService } from './shared/services/apis.service';
// directives
import { NullOrWhiteSpaceValidatorDirective } from './shared/directives/null-or-white-space-validator.directive';
// components
import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ImageUploaderAndCropperComponent } from './shared/components/image-uploader-and-cropper/image-uploader-and-cropper.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { UserComponent } from './routes/user/user.component';
import { AdminComponent } from './routes/admin/admin.component';
import { ContentComponent } from './layout/content/content.component';
import { MainComponent } from './routes/main/main.component';
import { RecipeListComponent } from './routes/recipes/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './routes/recipes/recipe-edit/recipe-edit.component';
import { RecipeViewComponent } from './routes/recipes/recipe-view/recipe-view.component';
import { IngredientsAddComponent } from './routes/recipes/recipe-edit/recipe-edit-components/ingredients-add/ingredients-add.component';
import { IngredientListComponent } from './routes/recipes/ingredients/ingredient-list/ingredient-list.component';
import { IngredientEditComponent } from './routes/recipes/ingredients/ingredient-edit/ingredient-edit.component';

@NgModule({
  declarations: [
    NullOrWhiteSpaceValidatorDirective,
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
    IngredientsAddComponent,
    ImageUploaderAndCropperComponent,
    IngredientListComponent,
    IngredientEditComponent,
    LoadingSpinnerComponent,
    NullOrWhiteSpaceValidatorDirective,
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
    NgxSmartModalModule.forRoot(),
  ],
  providers: [
    ApisService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
