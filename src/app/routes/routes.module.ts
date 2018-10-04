import { NgModule, ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { MainComponent } from './main/main.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: 'new', component: RecipeEditComponent },
        // { path: ':id/edit', component: RecipeEditComponent }, // instead edit partially
        { path: ':id/view', component: RecipeViewComponent },
    ]},
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutesModule{}