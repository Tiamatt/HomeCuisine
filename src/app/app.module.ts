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
import { AngularFontAwesomeModule } from 'angular-font-awesome'; // npm package for icons
// services
import { ApisService } from './shared/services/apis.service';
// directives
import { NullOrWhiteSpaceValidatorDirective } from './shared/directives/null-or-white-space-validator.directive';
import { UniqueInDbValidatorDirective } from './shared/directives/unique-in-db-validator.directive';
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
import { IngredientsPanelComponent } from './routes/recipes/recipe-edit/ingredients-panel/ingredients-panel.component';
import { DirectionsPanelComponent } from './routes/recipes/recipe-edit/directions-panel/directions-panel.component';
import { IngredientListComponent } from './routes/recipes/ingredients/ingredient-list/ingredient-list.component';
import { IngredientEditComponent } from './routes/recipes/ingredients/ingredient-edit/ingredient-edit.component';
import { CategoryEditComponent } from './routes/recipes/categories/category-edit/category-edit.component';
import { PreparationTimePanelComponent } from './routes/recipes/recipe-edit/preparation-time-panel/preparation-time-panel.component';
import { MultiselectDropdownWithCreateComponent } from './shared/components/multiselect-dropdown-with-create/multiselect-dropdown-with-create.component';
import { HoursAndMinutesPipe } from './shared/pipes/hours-and-minutes.pipe';

@NgModule({
  declarations: [
    NullOrWhiteSpaceValidatorDirective,
    UniqueInDbValidatorDirective,
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
    IngredientsPanelComponent,
    DirectionsPanelComponent,
    ImageUploaderAndCropperComponent,
    IngredientListComponent,
    IngredientEditComponent,
    CategoryEditComponent,
    LoadingSpinnerComponent,
    NullOrWhiteSpaceValidatorDirective,
    PreparationTimePanelComponent,
    MultiselectDropdownWithCreateComponent,
    HoursAndMinutesPipe,
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
    AngularFontAwesomeModule,
  ],
  providers: [
    ApisService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
