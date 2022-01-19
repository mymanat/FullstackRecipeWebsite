const { dbService } = require('./database.service');
const defaultRecipes = require('../data/defaultRecipes.json');

const RECIPES_COLLECTION = 'recipes';

class RecipesService {
  constructor() {
    this.dbService = dbService;
  }

  /**
   * @returns la collection de recettes de la BD
   */
  get collection() {
    return this.dbService.db.collection(RECIPES_COLLECTION);
  }

  /**
   * TODO : Récupérer toutes les recettes de la collection
   * @returns les recettes de la collection
   */
  async getAllRecipes() {
    return this.collection.find().toArray();
  }

  /**
   * TODO : Récupérer une recette selon son id
   * @param {string} id : le id qui correspond à la recette que l'on cherche
   * @returns la recette correspondante
   */
  async getRecipeById(id) {
    return this.collection.findOne({id: Number(id) }); 
  }

  /**
   * TODO : Récupérer des recettes selon leur catégorie
   * @param {string} category : la catégorie qui correspond aux recettes que l'on cherche
   * @returns les recettes correspondantes
   */
  async getRecipesByCategory(category) {
    return this.collection.find({categorie: category}).toArray(); 
  }

  /**
   * TODO : Récupérer des recette par ingrédient
   * @param {string} ingredient : nom de l'ingrédient à rechercher
   * @param {boolean} matchExact : cherche le nom exact d'ingrédient si true, sinon cherche un nom partiel
   * @returns les recettes trouvées ou un tableau vide
   */
  async getRecipesByIngredient(ingredient, matchExact) {
    const recipes= await this.getAllRecipes();

    if(matchExact){
      return recipes.filter((recette) => recette.ingredients.find((ing) => ing.nom === ingredient) !== undefined);
    }
    else{
      return recipes.filter((recette) => recette.ingredients.find((ing) => ing.nom.indexOf(ingredient) !== -1));
    }
  }

  /**
   * TODO : Supprimer la recette de la collection en fonction de son id
   * @param {string} id : id de la recette à supprimer
   * @returns le résultat de la modification
   */
  async deleteRecipeById(id) {
    return this.collection.findOneAndDelete({id});
  }

  /**
   * TODO : Ajouter une recette à la liste des recettes
   * @param {*} recipe : la nouvelle recette à ajouter
   */
  async addNewRecipe(recipe) {
    return this.collection.insertOne(recipe);
  }

  /**
   * Réinitialiser les recettes en supprimant la collection puis en la repeuplant
   */
  async resetRecipes() {
    await this.collection.deleteMany({});
    this.populateDb();
  }

  /**
   * Remplir la collection avec les recettes par défaut
   */
  async populateDb() {
    await this.dbService.populateDb(RECIPES_COLLECTION, defaultRecipes.recettes);
  }
}

module.exports = { RecipesService };
