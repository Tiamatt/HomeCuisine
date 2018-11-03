import { NgModule, ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';

const routes: Routes = [
    { path: '', component: RecipeListComponent },
    { path: 'recipes', component: RecipeListComponent },
    { path: 'recipe/new', component: RecipeEditComponent },
    { path: 'recipe/:id/edit', component: RecipeEditComponent }, // instead edit partially
    { path: 'recipe/:id/view', component: RecipeViewComponent },
    { path: 'not-found', component: RecipeListComponent },
    { path: '**', component: RecipeListComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [],
})

export class AppRoutesModule{}