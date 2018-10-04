import { NgModule, ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { MainComponent } from './main/main.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'recipes', component: RecipeListComponent },
    { path: 'recipes/new', component: RecipeEditComponent },
    // { path: 'recipes/:id/edit', component: RecipeEditComponent }, // instead edit partially
    { path: 'recipes/:id/view', component: RecipeViewComponent },
    { path: 'not-found', component: MainComponent },
    { path: '**', component: MainComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})

export class AppRoutesModule{}